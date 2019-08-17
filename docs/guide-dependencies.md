---
id: dependencies
title: Dependencies
---

The IC project comes with a full-featured dependency management system
inspired by [Go's new dependency management system][go-vers]. It
implements the [Minimal Version Selection algorithm][mvs] and follows
the [Semantic Versioning scheme][semver].

## Add

To add the latest version of a brick from the IC Public Index:

```shell
ic update iclab.simple
```

To add a specific version of a brick from the IC Public Index:

```shell
ic update iclab.simple v0.1.0
```

You can also edit your
[`brick.yaml` file `require` section](api-manifest.md#require-optional)
directly:

```yaml
# ...
require:
  iclab.simple: v0.1.0
```

To add a local brick as a requirement:

```yaml
require:
  my.brick: v0.0.0
replace:
  my.brick: ../../my/brick # <== where the brick.yaml file is located
```

## Remove

To remove a brick from your requirements:

```shell
ic update iclab.simple --remove
```

## Upgrade

To upgrade all your requirements to their latest versions:

```shell
ic update
```

To upgrade a single brick to a specific version:

```shell
ic update iclab.simple v0.2.0
```

## Downgrade

To downgrade a single brick to a specific version:

```shell
ic update iclab.simple v0.1.0
```

## Exclusion

To prevent a specific version of a brick in the IC Public Index from
being used while upgrading or downgrading:

```yaml
exclude:
  iclab.simple: v0.2.0
```

[go-vers]: https://blog.golang.org/versioning-proposal
[mvs]: https://research.swtch.com/vgo-mvs
[semver]: https://semver.org/
