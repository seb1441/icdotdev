---
title: Introducing ic.dev
---

_Posted by [Farzad Senart](https://twitter.com/fsenart) and [Lionel Suss](https://twitter.com/lionelsuss)_

We're excited to introduce [ic.dev](https://ic.dev), an open source
project you can use to describe all your infrastructure resources on AWS
using Python and high-level abstractions. We also ship with a free and
public registry to allow authors and contributors to make their
infrastructure resources available for the community. In this post,
we'll go through some remarkable aspects of the project, and an overview
of its possibilities.

![Deploy a sample brick from the IC Public Index](assets/introducing-icdotdev.gif)

<!--truncate-->

## AWS CloudFormation as an assembly language

With over [400 programmatic resources][cfn-rescs] and [thousands of new
features per year][aws-new], AWS CloudFormation templates are no more
for humans.

The IC project uses the [AWS CloudFormation Resource Specification][cfn-spec]
to provide you 100% of AWS resources supported by AWS CloudFormation. It
also enables you to write your infrastructure logic in Python. Under the
hood, it compiles your code to native AWS CloudFormation instructions so
that you continue to benefit from the AWS CloudFormation deployment
toolchain.

However, the IC project is neither yet another template generator nor
really a framework. It comes with a smart and purpose-built parser which
understands a subset of Python tuned for infrastructure configuration.
This new approach brings some developer-friendly benefits like getting
rid of [AWS CloudFormation intrinsic functions][cfn-intrinsics].

For example, let's try to create a string representation of the URL of
an Amazon API Gateway resource in raw AWS CloudFormation:

```json
{
  "Fn::Sub": [
    "\"${A0}\"",
    {
      "A0": {
        "Fn::Sub": [
          "https://${A0}.execute-api.${A1}.amazonaws.com/${A2}",
          {
            "A0": { "Ref": "api" },
            "A1": { "Ref": "AWS::Region" },
            "A2": { "Ref": "stage" }
          }
        ]
      }
    }
  ]
}
```

With IC, we can intuitively use Python f-strings, and the compiler
generates the above AWS CloudFormation counterpart:

```python
f"https://{api['ref']}.execute-api.{awsenv.region}.amazonaws.com/{stage['ref']}"
```

Thanks to a type system designed explicitly for AWS CloudFormation, we
can go even further. Let's try to split an Amazon S3 bucket ARN and take
the third part of it, in raw AWS CloudFormation:

```json
{
  "Fn::Sub": [
    "\"${A0}\"",
    {
      "A0": {
        "Fn::Select": [
          2,
          {
            "Fn::Split": [
              ":",
              {
                "Fn::GetAtt": ["bucket", "Arn"]
              }
            ]
          }
        ]
      }
    }
  ]
}
```

With IC, we can manipulate resource attributes as if they were regular
values:

```python
bucket["arn"].split(":")[2]
```

## AWS CloudFormation resources, generalized

We're all used to AWS CloudFormation resources. Take for instance an
[`AWS::Lambda::Function`][cfn-lambda]:

- It has a namespace: a vendor (AWS) and a service (Lambda).
- It requires a bunch of properties: a runtime, a memory size, etc.
- It returns a set of values: its reference and its ARN.
- It needs an asset to operate correctly: a source code or a binary

AWS CloudFormation resources have well-defined input and output APIs
and encapsulate a domain logic. But what happens when we instantiate our
`AWS::Lambda::Function`? Does it use an `AWS::S3::Bucket`? Does it use
an `AWS::Logs::LogGroup`? We don't know, and it's ok. What really
matters is understanding its interface and letting it do its job.

With IC, we generalized AWS CloudFormation resources and brought them to
the userland. An IC resource is a particular function that requires a
name and a bunch of user-defined properties, encapsulates other
resources, embeds assets, and optionally returns a user-defined value.

Let's create a custom AWS Lambda function backed by an EC2. It requires
a `code` parameter and returns a fictional reference and ARN:

```python
from ic import aws, awsenv, awsutil

@resource
def custom_lambda(code):
    security_group = aws.ec2.security_group(
        "security_group",
        group_description="Enable HTTP access via port 80",
        security_group_ingress=[
            dict(cidr_ip="0.0.0.0/0", from_port=80, to_port=80, ip_protocol="tcp")
        ],
    )
    instance = aws.ec2.instance(
        "instance",
        instance_type="t2.micro",
        image_id="ami-0cc96feef8c6bbff3",
        security_groups=[security_group["ref"]],
        user_data=awsutil.b64encode(code),
    )
    return dict(
        ref=f"http://{instance['public_ip']}",
        arn=f"arn:aws:custom_lambda:{awsenv.region}:{awsenv.account_id}:function:{instance['ref']}",
    )
```

As you can see, it has all the characteristics of an AWS CloudFormation
resource. It has properties, encompasses other low-level resources,
returns values, etc.

Let's now make use of this user-defined resource in the same way one
would do with a native AWS CloudFormation resource:

```python
@resource
def hello_world():
    code = """#!/usr/bin/env bash
echo "Hello, World!" > index.html
nohup python -m SimpleHTTPServer 80 &"""

    return custom_lambda("custom_lambda", code)
```

With IC, a resource is defined in terms of other resources and is
inherently recursive. The whole infrastructure configuration becomes a
nested tree of arbitrary level, revealing new insights about involved
resources. It enables composability at any level, whether it be a simple
Amazon S3 bucket or a custom serverless function backed by a server ;)

```shell
> ic aws tree

brick
└── hello_world
    └── custom_lambda
        ├── instance aws.ec2.instance
        └── security_group aws.ec2.security_group
```

Moreover, with IC, there is no more a concept of AWS CloudFormation
template or AWS CloudFormation stack. A template becomes only a format
of exchange between the IC compiler and the AWS CloudFormation
toolchain, and a stack is nothing else than the instantiation of a
resource. Everything is a resource, and you can literally deploy any
resource, whether it be native or custom:

```shell
> ic aws up ic.aws.s3:bucket demo_native
> ic aws up fsenart.hello_world demo_custom
```

By the way, if an AWS CloudFormation stack is only a resource instance,
it should also be able to return values:

```shell
> ic aws value demo_native | jq
```

```json
{
  "arn": "arn:aws:s3:::ic-xxxxxxxx-yyyyyyyy-zzzzzzzzzzzzz",
  "domain_name": "ic-xxxxxxxx-yyyyyyyy-zzzzzzzzzzzzz.s3.amazonaws.com",
  "dual_stack_domain_name": "ic-xxxxxxxx-yyyyyyyy-zzzzzzzzzzzzz.s3.dualstack.us-east-1.amazonaws.com",
  "ref": "ic-xxxxxxxx-yyyyyyyy-zzzzzzzzzzzzz",
  "regional_domain_name": "ic-xxxxxxxx-yyyyyyyy-zzzzzzzzzzzzz.s3.us-east-1.amazonaws.com",
  "website_url": "http://ic-xxxxxxxx-yyyyyyyy-zzzzzzzzzzzzz.s3-website-us-east-1.amazonaws.com"
}
```

Indeed, IC comes with a purpose-built JSON serializer that automatically
translates the return value of the topmost resource to an
[AWS CloudFormation Outputs][cfn-out] instruction. For example, when
deploying an [Amazon S3 bucket][cfn-s3], IC automatically serializes all
its attributes (`Ref` and `Fn::GetAtt`):

```json
{
  "Outputs": {
    "value": {
      "Value": {
        "Fn::Sub": [
          "{\"arn\":\"${A0}\",\"domain_name\":\"${A1}\",\"dual_stack_domain_name\":\"${A2}\",\"ref\":\"${A5}\",\"regional_domain_name\":\"${A3}\",\"website_url\":\"${A4}\"}",
          {
            "A0": {
              "Fn::GetAtt": ["bucket", "Arn"]
            },
            "A1": {
              "Fn::GetAtt": ["bucket", "DomainName"]
            },
            "A2": {
              "Fn::GetAtt": ["bucket", "DualStackDomainName"]
            },
            "A3": {
              "Fn::GetAtt": ["bucket", "RegionalDomainName"]
            },
            "A4": {
              "Fn::GetAtt": ["bucket", "WebsiteURL"]
            },
            "A5": {
              "Ref": "bucket"
            }
          }
        ]
      }
    }
  }
}
```

## AWS CloudFormation extended, by the community

We saw that the IC project has a generalized and uniform model of
infrastructure resources that enables encapsulation and composition. It
also comes with a free and public index to allow authors and
contributors to make their resources available for the community.

The IC Public Index is specifically designed to ease discoverability.
Backed by a powerful search engine, you can benefit directly from the
broader community of cloud enthusiasts, by searching the index:

```shell
> ic search hello world

──────────────────────────────────────────────────────────────────────
seb1441.hello_world


MIT • v0.1.0 • 2 days ago
──────────────────────────────────────────────────────────────────────
lsuss.hello_world


MIT • v0.1.0 • 23 days ago
──────────────────────────────────────────────────────────────────────
```

The infrastructure bricks available via the IC Public Index are so easy
to deploy that you don't even need to write a single line of code. You
can deploy them right from the IC Command-Line Interface:

```shell
> ic aws up fsenart.hello_world demo_community \
    --params message='Hello from ic.dev blog'
```

You can also compose and customize them into more high-level bricks:

```python
from fsenart import hello_world

@resource
def brick():
  return hello_world.brick("greeting", message="Hello from ic.dev blog")
```

The IC project ships with a full-featured dependency management system
inspired by [Go's new dependency management system][go-vers]. It
implements the [Minimal Version Selection algorithm][mvs] and follows
the [Semantic Versioning scheme][semver]. You can depend on a specific
version of a brick, easily upgrade and downgrade your dependencies, and
more:

```yaml
name: fsenart.hello_world
version: v0.2.0
license: MIT
description: My first IC brick
main: :brick
require:
  iclab.simple: v0.1.0
assets:
  - handler.js
```

And, if you consider your brick useful to the community, just publish
it!

```shell
> ic login
> ic publish
```

---

Thanks for reading, and we're excited to see what you'll create with the
IC project. You can learn more about the project by visiting
https://ic.dev. Feel free to reach out to us directly via
[Slack][ic-slack] or [Twitter][ic-twitter] with your thoughts, feedback,
and insights.

[cfn-rescs]: https://d1uauaxba7bl26.cloudfront.net/latest/gzip/CloudFormationResourceSpecification.json
[cfn-spec]: https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/cfn-resource-specification.html
[cfn-intrinsics]: https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/intrinsic-function-reference.html
[cfn-lambda]: https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-lambda-function.html
[cfn-out]: https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/outputs-section-structure.html
[cfn-s3]: https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-s3-bucket.html
[aws-new]: https://aws.amazon.com/new/
[go-vers]: https://blog.golang.org/versioning-proposal
[mvs]: https://research.swtch.com/vgo-mvs
[semver]: https://semver.org/
[ic-slack]: https://slack.ic.dev
[ic-twitter]: https://twitter.com/icdotdev
