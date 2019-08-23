---
id: imports
title: Imports
---

## IC Standard Library

`ic` is a reserved keyword and the entry-point to the IC Standard
Library which comes with IC CLI.

```python
from ic import util
```

See also the [IC Standard Library](api-stdlib.md) for more information.

## Local

Any `.ic` file inside the current brick folder (where the `brick.yaml`
file is located) and sub-folders can be imported by any other local
`.ic` files. However, you cannot escape from the folder containing the
`brick.yaml` file and go up in the file system.

```python
from . import foo
```

- If an `index.ic` file exists in the current folder, then it is
  imported and the `foo` symbol is loaded.
- Otherwise, a `foo.ic` file is imported and the `foo` variable refers
  to all symbols inside `foo.ic`.

```python
from .bar import baz
```

- If a `bar.ic` file exists in the current folder, then it is imported
  and the `baz` symbol is loaded.
- If a `bar` folder exists in the current folder, then the `bar/index.ic`
  file is imported.
- If both a `bar.ic` file and a `bar` folder exist, then the `bar` folder
  prevails.

## IC Public Index

Anything that is not `ic` nor local is imported from the IC Public
Index.

If you don't specify any version inside the `brick.yaml` file, then the
latest version is automatically requested and downloaded from the
IC Public Index. The `brick.yaml` file is also updated accordingly.

```python
from jdoe import hello_world
```

See also the [Dependency Management guide](guide-dependencies.md) for
more information.
