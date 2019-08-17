---
id: interacting
title: Interacting
---

You should now have a brick instance [up and running](start-deploying.md).
It's time to see what it has to offer.

The IC project aims to get infrastructure development as close as
possible to traditional software development. We are used to seeing
regular functions that expose their API by returning a more or less
complex value. It's the same with bricks. **To make something available
for interaction, just return it!**

## Updating Resources

Let's update our brick by exposing the route of our HTTP API:

```python
from iclab import simple
from . import assets

@resource
def brick():
    api = simple.api("api", "demo", "1.0.0")
    func = simple.function("func", "nodejs8.10", assets["handler.js"])
    func.http(api, "get", "/hello")
    return func["routes"][0] # <======
```

You can [proceed as usual](start-deploying.md#instantiating-resources)
to update your already deployed instance:

```shell
ic aws up simple_demo
```

As there are no changes in the actual resources, the update plan is
pretty simple. Accept and proceed:

```shell
Plan review

⬆ plan UPDATE

Do you want to continue? [y/N]: y
```

## Retrieving Outputs

Once the deployment finished, we can query the instance to access its
public value:

```shell
ic aws value simple_demo
```

```shell
"https://xxxxxxxxxx.execute-api.us-east-1.amazonaws.com/demo/hello"
```

Copy and paste the URL into your browser... Congratulations! You have
successfully deployed your very first brick.

[**You can literally return any value**](api-resources.md#return). Feel
free to experiment, for example, by updating your brick to return an
array of routes.
