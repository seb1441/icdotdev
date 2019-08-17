---
id: authoring
title: Authoring
---

The IC project aims to make it as easy as possible for you to author
your cloud infrastructure bricks.

After [installation](start-installation.md), you have your IC CLI
configured to interact with your AWS account.

## Creating Scaffold

An IC brick requires at least two files:

- `brick.yaml`: a [manifest](api-manifest.md) that contains metadata about your brick
- `index.ic`: a source file that contains your infrastructure resources

> Refer to the [Editors guide](guide-editors.md) for enabling syntax
> highlighting for `.ic` and `.icp` files.

Use IC CLI to create a new brick scaffold:

```shell
ic new USERNAME.hello_world
```

**A brick identifier is composed by a username and a brick name,
separated by a dot**. Replace `USERNAME` by yours. The `USERNAME` is
also the owner of the brick and becomes of interest if you eventually
publish your brick into the IC Public Index.

IC CLI asks for general information about your new brick:

```shell
name [USERNAME.hello_world]:
version [v0.1.0]:
private [false]:
license [MIT]:
```

> Public bricks (`private: false`) must have an open source license
> covered by the [SPDX license list][spdx-licenses].

You have now a `hello_world` brick with an initial scaffold:

```shell
.
`-- hello_world
    |-- brick.yaml
    `-- index.ic

1 directory, 2 files
```

```shell
cd hello_world
```

## Editing Resources

We will create a brick exposing a public HTTP API and backed by a
serverless function written in Node.js which echoes a hello world
message.

We can proceed with raw AWS resources and wire them together to achieve
our goal. However, it is a pretty tedious process. The IC project comes
with an experimental framework [`iclab.simple`][iclabsimple-github] to
ease serverless cloud infrastructure development.

Start by creating a simple `handler.js` file for our serverless function
to output a hello world message:

```js
exports.handle = async () => ({
  statusCode: 200,
  body: "Hello, World!\n"
});
```

This file is required by our brick to operate correctly, and we must,
therefore, reference it as an [asset](api-assets.md). Edit your
`brick.yaml` as follows:

```yaml
name: USERNAME.hello_world
version: v0.1.0
license: MIT
main: :brick
assets:
  - handler.js
```

It's time to describe the actual resources and their wirings by editing
the `index.ic` file:

```python
from iclab import simple # import the simple framework
from . import assets     # import our assets

@resource
def brick():
    # create a public HTTP API
    api = simple.api("api", "demo", "1.0.0")
    # create a serverless function
    func = simple.function("func", "nodejs8.10", assets["handler.js"])
    # wire them together
    func.http(api, "get", "/hello")
```

[spdx-licenses]: https://spdx.org/licenses/
[iclabsimple-github]: https://github.com/icdotdev/lab/tree/master/src/simple
