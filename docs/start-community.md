---
id: community
title: Community
---

The IC project comes with a free and public index so that you can
benefit directly from the broader community of cloud enthusiasts.

## Leveraging IC Public Index

Before writing a line of code, search in the index! A powerful search
engine backs the IC Public Index and allows you to find bricks of
interest by providing keywords:

```shell
ic search hello world
```

```shell
──────────────────────────────────────────────────────────────────────
lsuss.hello_world


MIT • v0.1.0 • 20 days ago
──────────────────────────────────────────────────────────────────────
fsenart.hello_world
My first IC brick

MIT • v0.2.0 • 20 days ago
──────────────────────────────────────────────────────────────────────
```

> IC CLI shows only the first 20 results. If you don't find a particular
> brick, refine your search.

IC Public Index bricks are available for the community to use under
open source license terms covered by the [SPDX license list][spdx-licenses].
Refer to each brick for specific details.

These bricks can be
[deployed as usual](start-deploying.md#instantiating-resources) into
your AWS account, with **no need for a single line of code**:

```shell
ic aws up fsenart.hello_world community_demo \
  --params message='Hello from ic.dev Getting Started'
```

And once deployed, you can
[interact with them](start-interacting.md#retrieving-outputs) like with
any other brick:

```shell
ic aws value community_demo | xargs curl
```

See also the [parameters API](api-parameters.md) for more information
about how to customize your deployments.

## Contributing to IC Public Index

If you consider your brick useful to the community, just publish it!

Let's publish [the brick we've created earlier](start-authoring.md).
First, you have to sign in to your ic.dev account:

```shell
ic login
```

> - If a browser tab does not open, copy and paste the URL into your
>   browser.
> - If your OS complains about incoming connections, accept and proceed.
> - If you haven't an account, follow the sign-up link at the bottom of
>   the form.

Double-check that the username you chose during your sign-up does not
differ from the one
[you used earlier in this tutorial](start-authoring.md#creating-scaffold).
Otherwise, update your `brick.yaml` file accordingly.

```shell
ic publish
```

Congratulations! You have successfully published your very first brick
and have now an entry in the IC Public Index:

```shell
ic search USERANME
```

[spdx-licenses]: https://spdx.org/licenses/
