---
id: installation
title: Installation
---

## Installing IC CLI

1. Ensure you have a version of [Python][python-download] **>=
   3.7** and [`pip`][pip-install] installed.

2. Install the [IC CLI package][iccli-pypi]:
   ```shell
   python3 -m pip install iccli
   ```

## Connecting AWS

1. Ensure you have [created and activated][aws-activate] your
   [free AWS account][aws-free].

   > Most of our examples use the AWS Free Tier, and please follow
   > cleanup steps at the end of each tutorial to avoid paying for stale
   > resources.

2. Ensure you have the right permissions to access your AWS account.
   Refer to the [official AWS instructions][aws-cli] for how to
   configure your AWS credentials.

## Configuring IC CLI

IC CLI uses the AWS SDK to interact with your AWS account and needs
somewhere to upload deployment artifacts. Proceed with your **default
AWS configuration** and create or retrieve the required Amazon S3
bucket:

```shell
ic aws setup
```

If this is the first time you use IC CLI with your AWS account, then
accept the resources creation plan:

```shell
Plan review

✚ plan CREATE
└── ic_setup_default
    └── ✚ artifacts_bucket CREATE aws.s3.bucket

Do you want to continue? [y/N]: y
```

Otherwise, let IC CLI retrieve the previously created Amazon S3
bucket.

> Refer to the [Configuration guide](guide-configuration.md) for more
> advanced configuration scenarios.

## Updating IC CLI

At any time after IC CLI is installed, you can check your current
version:

```shell
ic --version
```

You will see somthing like this:

```shell
{
  "ic": "0.2.0",
  "python": "3.7.4",
  "darwin": "18.7.0",
  "boto3": "1.9.206"
}
```

You can update to the [latest version][iccli-releases] of IC CLI:

```shell
python3 -m pip install --upgrade iccli
```

[python-download]: https://www.python.org/downloads/
[pip-install]: https://pip.pypa.io/en/stable/installing/
[iccli-pypi]: https://pypi.org/project/iccli/
[iccli-releases]: https://pypi.org/project/iccli/#history
[aws-activate]: https://aws.amazon.com/premiumsupport/knowledge-center/create-and-activate-aws-account
[aws-free]: http://aws.amazon.com/free/
[aws-cli]: https://docs.aws.amazon.com/cli/latest/userguide/cli-chap-configure.html
