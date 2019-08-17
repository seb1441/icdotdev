---
id: parser
title: Parser
---

The IC project comes with a smart purpose-built parser and a type system
around AWS CloudFormation resource attributes. It allows manipulating
resource attributes as if they were regular values and getting rid of
[AWS CloudFormation intrinsic functions][cfn-intrinsic].

## Strings

You can use resource string attributes as usual strings, and the IC
compiler generates, under the hood, the adequate AWS CloudFormation
specific instructions:

```python
from ic import aws, awsenv

@resource
def brick():
    rst = aws.api_gateway.rest_api(...)
    stg = aws.api_gateway.stage(...)

    return f"https://{rst['ref']}.execute-api.{awsenv.region}.amazonaws.com/{stg['ref']}"
```

```json
{
  "Fn::Sub": [
    "\"${A0}\"",
    {
      "A0": {
        "Fn::Sub": [
          "https://${A0}.execute-api.${A1}.amazonaws.com/${A2}",
          {
            "A0": { "Ref": "nju67qct" },
            "A1": { "Ref": "AWS::Region" },
            "A2": { "Ref": "mkg2vdoj" }
          }
        ]
      }
    }
  ]
}
```

### Formatted String Literals

```python
f"https://{rst['ref']}.execute-api.{awsenv.region}.amazonaws.com/{stg['ref']}"
```

### Format

```python
"https://{0}.execute-api.{1}.amazonaws.com/{2}".format(rst["ref"], awsenv.region, stg["ref"])
```

### Concat

```python
"https://"+rst["ref"]+".execute-api."+awsenv.region+".amazonaws.com/"+stg["ref"]
```

### Join

```python
"".join(["https://",rst["ref"],".execute-api.",awsenv.region,".amazonaws.com/",stg["ref"]])
```

### Split

```python
aws.s3.bucket("bucket")["arn"].split(":")
```

### Replace

```python
aws.s3.bucket("bucket")["arn"].replace(":", "/")
```

## Lists

As with dynamic strings, you can use dynamic lists as usual and the IC
compiler generates, under the hood, the adequate AWS CloudFormation
instructions:

```python
from ic import aws

@resource
def brick():
    return aws.s3.bucket("bucket")["arn"].split(":")[2]
```

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
                "Fn::GetAtt": ["mzaarfms", "Arn"]
              }
            ]
          }
        ]
      }
    }
  ]
}
```

[cfn-intrinsic]: https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/intrinsic-function-reference.html
