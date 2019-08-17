---
id: configuration
title: Configuration
---

IC CLI uses the AWS SDK to interact with your AWS account and needs the
following settings:

- `aws_profile`: an [AWS credentials profile][aws-profile] to use when
  interacting with your account
- `aws_region`: an AWS region where to deploy your infrastructure
  bricks
- `aws_s3_bucket`: an Amazon S3 bucket where to upload your deployment
  artifacts
- `aws_s3_prefix`: an _optional_ Amazon S3 prefix inside the bucket

By default, IC CLI stores its settings in the `config.ini` file inside
the `~/.ic` directory and supports named profiles. Here is an example:

```ini
[default]
aws_region = us-east-1

[production]
aws_profile = production
aws_region = eu-west-1
```

Feel free to create as many named profiles as needed to access your
different AWS accounts or to satisfy you custom permissions policies.

To customize these settings you either can edit the `config.ini` file
directly or use the following command:

```shell
ic config
```

It interactively asks for the different settings of the **default**
IC CLI profile:

```shell
aws profile []:
aws region []:
aws s3 bucket []:
aws s3 prefix []:
```

> **DO NOT** set `aws_profile` to default. If you want to use your default
> AWS credentials profile, just **omit** the `aws_profile` option.

Instead, if you want to update a named profile `production`:

```shell
ic --profile production config
```

Anytime, if you want IC CLI to use your named profile settings:

```shell
ic --profile PROFILE COMMAND
```

[aws-profile]: https://docs.aws.amazon.com/cli/latest/userguide/cli-configure-profiles.html
