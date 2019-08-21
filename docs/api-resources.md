---
id: resources
title: Resources
---

The IC Project uses `.ic` files for infrastructure configuration and
`.icp` files for [parameters](api-parameters.md#paramsicp).

## Tree

The infrastructure configuration is represented as a tree of resources
of arbitrary level:

```python
@resource
def parent():
    child("sub_resource", param1="foo", param2="bar")

@resource
def child(param1, param2): # <== implicit name parameter
    return aws.ec2.instance("aws_resource", ...)
```

```shell
brick
└── sub_resource
    └── aws_resource aws.ec2.instance
```

- `@resource` marks a function as a node inside the tree.
- A node requires an implicit name parameter as the first positional argument.
- Each node in the tree has a name, a type and belongs to a lineage of parents.

## Properties

Resource properties (the parameters given during instantiation) are
immutable. It means they cannot be altered on a case-by-case basis. To
update properties, you have to replace them as a whole by using the
`props` attribute:

```python
resc = child(param1="foo", param2="bar")
new_props = resc.props
new_props["param1"] = "baz"
resc.props = new_props
```

## Return

A resource can expose a value by returning it. Of course, it works like
any other functions, and you can consume it as usual:

```python
@resource
def parent():
    print(1 + child("child"))

@resource
def child():
    return 41
```

However, the return value of the topmost resource is a bit special. It
is also exposed as the output value of your deployment. Let's deploy a
simple Amazon S3 bucket right from the IC Standard Library:

```shell
ic aws up ic.aws.s3:bucket my_bucket
```

If you check the output value, you'll get all the attributes exposed by
the [raw AWS CloudFormation S3 bucket resource][cfn-s3]:

```shell
ic aws value my_bucket
```

```json
{
  "arn": "...",
  "domain_name": "...",
  "dual_stack_domain_name": "...",
  "ref": "...",
  "regional_domain_name": "...",
  "website_url": "..."
}
```

This powerful feature can be used to expose any value, whether it be
dynamic or scalar:

```python
from ic import aws

@resource
def brick():
    bucket = aws.s3.bucket("my_bucket")
    return dict(
        scalar=42,
        nested=dict(foo="bar"),
        bucket_arn=bucket["arn"],
    )
```

```json
{
  "bucket_arn": "arn:aws:s3:::...",
  "nested": {
    "foo": "bar"
  },
  "scalar": 42
}
```

You can also prevent a value to be exposed by prefixing its key with an
underscore:

```python
@resource
def brick():
    return dict(_private=42)
```

For advanced use cases, when a simple dictionary is not enough, you can
make use of the built-in `Resource`:

```python
@resource
def brick():
    foo = advanced("foo")
    foo.helper(...)
    return foo["resc"]

@resource
def advanced():
    return Resource(
        helper=_helper
        _state=[],
        resc=aws.s3.bucket("bucket"),
        scalar=42,
        nested=dict(foo="bar"),
    )

def _helper(self, ...):
    self["_state"].append("something")
    self["resc"].props = ...
```

The built-in `Resource` behaves like a regular dictionary, as seen in
previous examples, but can also expose helper functions as attributes
and be stateful. It can be viewed as a simple version of a _class_ with
helper functions being _class methods_. For real world examples take a
look at https://github.com/icdotdev/iclab.simple.

[cfn-s3]: https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-s3-bucket.html#aws-properties-s3-bucket-return-values
