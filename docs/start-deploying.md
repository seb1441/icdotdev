---
id: deploying
title: Deploying
---

You should now have a [valid and functional brick](start-authoring.md).
It's time to deploy it into your AWS account according to your [default
configuration](start-installation.md).

IC CLI uses [AWS CloudFormation Change Sets][aws-changesets] to allow
you to preview how proposed changes might impact your running resources.

## Instantiating Resources

Let's deploy our brick by instantiating it under the name `simple_demo`:

```shell
ic aws up simple_demo
```

As this is the first time we deploy this brick, IC CLI proposes the
resources creation plan. Accept and proceed:

```
downloading iclab.simple v0.2.0 artifact
bucket s3://ic-xxxxxxxx-yyyyyyyy-zzzzzzzzzzzz
upload brick:handler.js -> abbefe026b9b3d52f4eac50f574caf26ddb9e9fd
Plan review

✚ plan CREATE
└── simple_demo
    ├── api
    │   ├── ✚ deployment_v1_0_0 CREATE aws.api_gateway.deployment
    │   ├── ✚ rest_api CREATE aws.api_gateway.rest_api
    │   └── ✚ stage CREATE aws.api_gateway.stage
    └── func
        ├── ✚ api_invocation_role CREATE aws.iam.role
        ├── ✚ function CREATE aws.lambda_.function
        ├── ✚ log_group CREATE aws.logs.log_group
        └── ✚ role CREATE aws.iam.role

Do you want to continue? [y/N]: y
```

You may have also noticed that IC CLI has uploaded your assets to your
[AWS account's artifacts bucket](start-installation.md#configuring-ic-cli),
has automatically figured out the missing dependencies, downloaded them,
and updated the `brick.yaml` file accordingly:

```yaml
name: USERNAME.hello_world
version: v0.1.0
license: MIT
main: :brick
require:
  iclab.simple: v0.2.0
assets:
  - handler.js
```

> Metadata about remote dependencies in the IC Public Index are cached
> inside the `~/.ic/cache` directory. You can find downloaded artifacts
> inside the `~/.ic/index` directory.

See also the [Dependency Management guide](guide-dependencies.md) for
more information.

## Verifying Deployment

Once the deployment finished, IC CLI shows a summary of actually created
resources:

```shell
Plan summary

✚ plan CREATE_COMPLETE
└── simple_demo
    ├── api
    │   ├── ✚ deployment_v1_0_0 CREATE_COMPLETE aws.api_gateway.deployment
    │   ├── ✚ rest_api CREATE_COMPLETE aws.api_gateway.rest_api
    │   └── ✚ stage CREATE_COMPLETE aws.api_gateway.stage
    └── func
        ├── ✚ api_invocation_role CREATE_COMPLETE aws.iam.role
        ├── ✚ function CREATE_COMPLETE aws.lambda_.function
        ├── ✚ log_group CREATE_COMPLETE aws.logs.log_group
        └── ✚ role CREATE_COMPLETE aws.iam.role
```

Anytime, you can also view the tree of resources for a particular
deployed instance:

```shell
ic aws tree simple_demo
```

```shell
simple_demo
├── api
│   ├── deployment_v1_0_0 aws.api_gateway.deployment
│   ├── rest_api aws.api_gateway.rest_api
│   └── stage aws.api_gateway.stage
└── func
    ├── api_invocation_role aws.iam.role
    ├── function aws.lambda_.function
    ├── log_group aws.logs.log_group
    └── role aws.iam.role
```

[aws-changesets]: https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/using-cfn-updating-stacks-changesets.html
