---
id: parameters
title: Parameters
---

The IC project uses the concept of parameters to isolate the _variable_
part of the infrastructure configuration.

Let's say that we have a reusable greeting brick that takes a `user` and
a `message` parameter:

```python
@resource
def brick(user, message):
    ...
```

## Instantiation

To create a new instance of the above brick, you must **always give it a
name as the first positional argument**, followed by any other required
parameters:

```python
brick("greeting", user="John" message="Hello World")
```

## `--params`

To deploy the above brick, you can provide the required parameters
directly via the CLI in the form of `key1=value1,key2=value2`:

```shell
ic aws up my_name --params user=John,message='Hello World'
```

> This option should be used for simple use cases. Prefer
> `params.icp` option.

## `params.icp`

Upon deployment, IC CLI automatically looks for a `params.icp` file
next to the `brick.yaml` file to fill missing parameters:

```python
user = "John"
message = "Hello World"
extra = 42
```

> Extra arguments are silently ignored.

See also the [IC Standard Library](api-stdlib.md) to learn more about
how to [access environment variables](api-stdlib.md#environment-variables),
[make cross brick references](api-stdlib.md#instance-value),
[manage sensitive data](api-stdlib.md#sensitive-data), etc.
