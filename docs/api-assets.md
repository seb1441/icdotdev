---
id: assets
title: Assets
---

Assets are auxiliary files, other than regular `.ic` and `.icp` files,
required by your brick to operate correctly. They are uploaded to your
AWS account upon brick deployment and are part of your brick package
upon publishing to the IC Public Index.

`assets` is a built-in module which exposes all files in a given
directory. For example to access the files in the current folder:

```python
from . import assets
```

To access all files in the `foo/bar` sub-folder:

```python
from .foo.bar import assets
```

> You cannot escape from the folder containing the `brick.yaml` file go
> up in the file system.

Each asset exposes the following properties depending on your Amazon S3 bucket
configured for the deployment:

- `name` : the file name
- `text` : the file content as text
- `url` : the Amazon S3 URL, i.e., `https://bucket.s3.amazonaws.com/key`
- `uri` : the Amazon S3 URI, i.e., `s3://bucket/key`
- `bucket` : the Amazon S3 bucket
- `key` : the Amazon S3 key inside the bucket

These properties can be used for example to provide the source code of
an AWS Lambda function:

```python
from ic import aws
from . import assets

@resource
def brick():
    inline = assets["handler.js"].text
    aws.lambda_.function("fn", code=dict(zip_file=inline), ...)
```

All imported assets need to be referenced in the assets section of the
`brick.yaml` file. You either can reference them by an explicit path
relative to the directory where the `brick.yaml` file is located or by
using a [glob pattern][python-glob] as follows:

```yaml
# ...
assets:
  - handler.js
  - foo/bar/logo.png
  - "**/**.html"
```

[python-glob]: https://docs.python.org/3/library/glob.html
