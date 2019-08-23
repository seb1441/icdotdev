---
id: stdlib
title: Standard Library
---

The IC Standard Library offers features such as access to environment
variables, sensitive data management, or cross brick references. It also
exposes APIs that would otherwise be inaccessible to IC users such as
AWS CloudFormation [native resources][cfn-resc] and
[pseudo-parameters][cfn-params].

## `ic.util`

```python
from ic import util
```

### Sensitive Data

> Only available in `params.icp` file.

To hide some deployment parameters and prevent them from being exposed
in the AWS CloudFormation toolchain, use `util.sensitive`:

```python
# params.icp
from ic import util
my_param_name = util.sensitive("my_param_value")
```

```python
# index.ic
@resource
def brick(my_param_name):
    ...
```

### Instance Value

> Only available in `params.icp` file.

To access the return value of a deployed brick, use `util.brick`:

```python
from ic import util
instance_value = util.brick("instance_name")
```

### Environment Variables

> Only available in `params.icp` file.

To access your host's environment variables, use `util.environ`:

```python
from ic import util
my_env_value = util.environ("MY_ENV_KEY")
```

## `ic.aws`

> Only available in `.ic` files.

The IC project uses the [AWS CloudFormation Resource Specification][cfn-spec]
to provide the exact same resources and properties that supported
officially by Amazon Web Services. To instantiate an AWS resource and
access its attributes, proceed as follows:

```python
from ic import aws

@resource
def brick():
    aws.lambda_.function("func", memory_size=512, runtime="go1.x", ...)
    instance = aws.ec2.instance("inst", instance_type="t2.micro", ...)
    return {
        "instance_id": inst["ref"],
        "private_ip": inst["private_ip"]
    }
```

For the sake of consistency, all resource, property and attribute names
are `snake_cased`.

> The AWS Lambda resource has a trailing underscore: `aws.lambda_.function`.

### Dependency

To specify that the creation of a specific resource `r2` must follow
another `r1`, use the `require` method of the `r2` resource:

```python
r1 = aws.ec2.vpc_cidr_block(...)
r2 = aws.ec2.subnet(...)
r2.require(r1)
```

See also the [AWS DependsOn attribute documentation][cfn-deps] for more
information.

### Deletion

To preserve or backup a resource when its deleted, use the `deletion`
property of the resource:

```python
r1 = aws.s3.bucket(...)
r1.deletion = "retain"
```

The possible values of a deletion policy are `delete`, `retain` or
`snapshot`. See also the [AWS DeletionPolicy attribute documentation][cfn-del]
for more information.

## `ic.awsutil`

### Base64 Encoding

To get the Base64 representation of an input string, use
`ic.awsutil.b64encode`. This function is typically used to pass encoded
data to Amazon EC2 instances `ic.aws.ec2.instance` by way of the
[`user_data` property][cfn-userdata]:

```python
from ic import aws, awsutil

USER_DATA = """#!/usr/bin/env bash
echo "Hello, World!" > index.html
nohup python -m SimpleHTTPServer 80 &"""

@resource
def brick():
    aws.ec2.instance("my_instance", user_data=awsutil.b64encode(USER_DATA), ...)
```

### Stack Output

> Only available in `params.icp` file.

To interface your brick deployments with legacy AWS CloudFormation
Stacks and access their raw output values, use `awsutil.outputs`:

```python
from ic import awsutil
output_value = awsutil.outputs("stack_name")
```

### CIDR Address Blocks

To get an array of CIDR address blocks, use `awsutil.cidr` with the
following parameters:

- `block`: the user-specified CIDR address block to be split into
  smaller CIDR blocks.
- `count`: the number of CIDRs to generate. Valid range is between `1`
  and `256`.
- `bits`: the number of subnet bits for the CIDR. For example, specifying
  a value `8` for this parameter will create a CIDR with a mask of `/24`.

> Subnet bits is the inverse of subnet mask. To calculate the required
> host bits for a given subnet bits, subtract the subnet bits from `32`
> for IPv4 or `128` for IPv6.

```python
from ic import aws, awsutil

@resource
def brick():
    vpc = aws.ec2.vpc("example_vpc", cidr_block="10.0.0.0/16")
    block = aws.ec2.vpc_cidr_block(
        "ipv6_cidr_block", amazon_provided_ipv6_cidr_block=True, vpc_id=vpc["ref"]
    )
    subnet = aws.ec2.subnet(
        "example_subnet",
        assign_ipv6_address_on_creation=True,
        cidr_block=awsutil.cidr(vpc["cidr_block"], 1, 8)[0],
        ipv6_cidr_block=awsutil.cidr(vpc["ipv6_cidr_blocks"], 1, 64)[0],
        vpc_id=vpc["ref"],
    )
    subnet.require(block)
```

## `ic.awsenv`

To access to the pseudo parameters that are
[predefined by AWS CloudFormation][cfn-params], use `awsenv`:

- `account_id`
- `availability_zones`
- `notification_arns`
- `partition`
- `region`
- `stack_id`
- `url_suffix`

```python
from ic import aws, awsenv

@resource
def brick():
    rst = aws.api_gateway.rest_api(...)
    stg = aws.api_gateway.stage(...)

    return f"https://{rst['ref']}.execute-api.{awsenv.region}.amazonaws.com/{stg['ref']}"
```

[cfn-resc]: https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-template-resource-type-ref.html
[cfn-params]: https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/pseudo-parameter-reference.html
[cfn-spec]: https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/cfn-resource-specification.html
[cfn-deps]: https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-attribute-dependson.html
[cfn-del]: https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-attribute-deletionpolicy.html
[cfn-userdata]: https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-ec2-instance.html#cfn-ec2-instance-userdata
