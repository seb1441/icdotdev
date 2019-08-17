---
id: cleanup
title: Cleanup
---

Deleting deployed bricks is as easy as
[instantiating them](start-deploying.md#instantiating-resources):

```shell
ic aws up simple_demo --remove
```

For deletion, IC CLI also uses
[AWS CloudFormation Change Sets][aws-changesets] to allow you to preview
which resources will be impacted. Accept and proceed to delete the
`simple_demo` instance.

```shell
Plan review

✖ plan DELETE
└── simple_demo
    ├── api
    │   ├── ✖ deployment_v1_0_0 DELETE aws.api_gateway.deployment
    │   ├── ✖ rest_api DELETE aws.api_gateway.rest_api
    │   └── ✖ stage DELETE aws.api_gateway.stage
    └── func
        ├── ✖ api_invocation_role DELETE aws.iam.role
        ├── ✖ function DELETE aws.lambda_.function
        ├── ✖ log_group DELETE aws.logs.log_group
        └── ✖ role DELETE aws.iam.role

Do you want to continue? [y/N]: y
```

Do the same to delete the community brick
[we deployed earlier](start-community.md#leveraging-ic-public-index):

```shell
ic aws up community_demo --remove
```

---

We are all done. Hope you've enjoyed your tour!
[Now Go Build][aws-gobuild], and if you need any help, we are also on
[Slack][ic-slack].

[aws-changesets]: https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/using-cfn-updating-stacks-changesets.html
[aws-gobuild]: https://aws.amazon.com/startups/NowGoBuild/
[ic-slack]: https://slack.ic.dev
