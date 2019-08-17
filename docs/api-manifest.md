---
id: manifest
title: Manifest
---

Each IC brick is defined by one `brick.yaml` file, the manifest, one or
more `.ic` files and an optional `.icp` file. The manifest has the
following properties:

```yaml
name: jdoe.hello_world
version: v1.0.0-beta
license: MIT
private: false
description: My awesome brick
main: .foo.bar:my_func
require:
  baz.qux: v1.2.0
replace:
  usr.brk: ../repl
  rsu.krb: asm.brk v1.0.0
exclude:
  baz.qux: v1.1.0
assets:
  - handler.js
  - foo/bar/logo.png
  - "**/**.html"
```

#### name `required`

- The id of the brick composed by a username and a brick name, separated
  by a dot.
- The username is also the owner of the brick in the IC Public Index.
- If the major version is <= 1, then the
  name can end with neither letter `v` nor a digit.
- If the major version is > 1, then the name
  must end with `vMAJOR`:
  ```yaml
  name: jdoe.hello_worldv2
  version: v2.3.4
  ```

#### version `required`

- The [semantic version][semver-spec] of the brick.
- It must start with a lowercase `v` letter.
- It cannot contain [build metadata][semver-meta].

#### license `conditional`

- If `private: true`, then it can be anything or even omitted.
- Otherwise, it must be a valid [SPDX identifier][spdx-licenses].

#### private `optional`

- If `true`, then the brick cannot be published to the IC Public Index.
- Defaults to `false`.

#### description `optional`

- At most 140 characters
- Cannot contain line breaks

#### main `optional`

- It is the default function that is exposed when importing the brick.
- If provided, it must be `RELATIVE_IMPORT_PATH:FUNCTION_NAME`.
- Defaults to `index.ic`'s `brick` function.

#### require `optional`

- A list of required bricks along with their minimum required versions.
- References must come either from the IC Public Index or the `replace`
  property.
- See also the [Dependency Management guide](guide-dependencies.md) for
  more information.

#### replace `optional`

- A list of brick path replacements.
- References can come either from the IC Public Index or the local
  filesystem.
- See also the [Dependency Management guide](guide-dependencies.md) for
  more information.

#### exclude `optional`

- A list of brick versions to exclude during upgrade or downgrade
  operations.
- See also the [Dependency Management guide](guide-dependencies.md) for
  more information.

#### assets `optional`

- A list of assets required by the brick to operate correctly.
- These assets are uploaded to your AWS account upon brick deployment.
- These assets are part of your brick package upon publishing to the IC
  Public Index.

[semver-spec]: https://semver.org/
[semver-meta]: https://semver.org/#spec-item-10
[spdx-licenses]: https://spdx.org/licenses/
