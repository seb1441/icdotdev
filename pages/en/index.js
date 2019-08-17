// Copyright 2019 Farzad Senart and Lionel Suss. All rights reserved.
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//     http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

const React = require("react");
const { Container, GridBlock } = require("../../core/CompLibrary.js");

const Index = props => (
  <div>
    <Hero {...props} />
    <div className="mainContainer">
      <Features {...props} />
      <Productivity {...props} />
      <Repeatability {...props} />
      <Extensibility {...props} />
      <Start {...props} />
    </div>
  </div>
);

const Hero = ({
  config: {
    baseUrl,
    colors: { secondaryColor },
    docsUrl,
    title
  },
  language
}) => {
  const urls = {
    installation: `${docUrl(baseUrl, docsUrl) + language}/installation`
  };
  return (
    <div className="homeContainer">
      <div className="wrapper homeWrapper">
        <div className="inner">
          <h1 className="projectTitle">
            {title}
            <small>
              An <strong style={{ color: secondaryColor }}>open source</strong>{" "}
              project that makes it easy to <br /> <strong>compose</strong>,{" "}
              <strong>share</strong>, and <strong>deploy</strong> cloud
              infrastructure bricks
            </small>
          </h1>
          <div className="promoSection">
            <div className="promoRow">
              <img
                src={baseUrl + "img/hero.gif"}
                alt="Deploy a sample brick from the IC Public Index"
              />
            </div>
            <div className="promoRow">
              <div className="pluginRowBlock">
                <div className="pluginWrapper">
                  <a className="button action" href={urls["installation"]}>
                    <strong>Get Started</strong>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
const docUrl = (baseUrl, docsUrl) =>
  `${baseUrl}${docsUrl ? `${docsUrl}/` : ""}`;

const Features = ({ config: { baseUrl, docsUrl }, language }) => {
  const urls = {
    spec:
      "https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/cfn-resource-specification.html",
    intrinsic:
      "https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/intrinsic-function-reference.html",
    slack: "https://slack.ic.dev",
    github: "https://github.com/icdotdev",
    issues: "https://github.com/icdotdev/cli/issues",
    pulls: "https://github.com/icdotdev/cli/pulls",
    parser: `${docUrl(baseUrl, docsUrl) + language}/parser`,
    resources: `${docUrl(baseUrl, docsUrl) + language}/resources`,
    community: `${docUrl(baseUrl, docsUrl) + language}/community`
  };
  return (
    <Container padding={["bottom", "top"]} background="light">
      <GridBlock
        layout="threeColumn"
        align="center"
        contents={[
          {
            title: "Native",
            content: `As we rely on the official
          [AWS CloudFormation Resource Specification](${urls["spec"]}),
          you have access to **100% of AWS resources**. We also compile
          your code to **native AWS CloudFormation**, so that you can
          always access the raw templates and benefit from **state
          management by AWS CloudFormation**.`,
            image: `${baseUrl}img/undraw_confirmation_2uy0.svg`,
            imageAlign: "top"
          },
          {
            title: "Familiar",
            content: `**Write your infrastructure logic in Python**, the
          well-known easy-to-use, powerful, and versatile language. Use
          modern software development techniques and forget about all
          [AWS CloudFormation quirks and weirdness](${urls["intrinsic"]})
          thanks to our [**smart purpose-built parser**](${urls["parser"]}).`,
            image: `${baseUrl}img/undraw_joyride_hnno.svg`,
            imageAlign: "top"
          },
          {
            title: "Open",
            content: `Get involved and **be part of the adventure**.
          Join our [Slack channel](${urls["slack"]}), browse our
          [GitHub repositories](${urls["github"]}),
          [submit issues](${urls["issues"]}) or
          [pull requests](${urls["pulls"]}) for
          bugs you find, and **ask for any new features** you may want
          to be implemented.`,
            image: `${baseUrl}img/undraw_open_source_1qxw.svg`,
            imageAlign: "top"
          }
        ]}
      />
      <br />
      <br />
      <GridBlock
        layout="twoColumn"
        align="center"
        contents={[
          {
            title: "Modular",
            content: `[**Everything is a resource**](${urls["resources"]}).
          Whether it be a simple Amazon S3 bucket or a serverless
          e-commerce app, **combine any resources** into more high-level
          bricks. View **your whole infrastructure as a nested tree** of
          arbitrary level and gain unprecedented insights about your
          configuration.`,
            image: `${baseUrl}img/undraw_building_blocks_n0nc.svg`,
            imageAlign: "top"
          },
          {
            title: "Community",
            content: `Need a particular service or even a whole
          application? **Don't reinvent the wheel**. We ship with a
          [**free and public index**](${urls["community"]})
          to allow authors and contributors to make their **bricks
          available for the community** to use under **open source
          license** terms. Before writing a line of code, search in the
          index!`,
            image: `${baseUrl}img/undraw_elements_cipa.svg`,
            imageAlign: "top"
          }
        ]}
      />
    </Container>
  );
};

const Productivity = ({ config: { baseUrl, docsUrl }, language }) => {
  const urls = {
    parser: `${docUrl(baseUrl, docsUrl) + language}/parser`,
    resc: `${docUrl(baseUrl, docsUrl) + language}/resources#return`
  };
  return (
    <Container padding={["bottom", "top"]}>
      <GridBlock
        className="detail"
        contents={[
          {
            title: "Standardization and Productivity",
            content: `**Focus on your application** and get up and running
          quickly without having to worry about the undifferentiated
          heavy lifting. **Use snake case** for all resources,
          attributes, and properties. Forget entirely about AWS
          CloudFormation intrinsic functions and [**use the regular
          string and list operations**](${urls["parser"]})
          instead. Whether it be a simple resource attribute or a nested
          dictionary, [**export anything**](${urls["resc"]})
          from your AWS CloudFormation stacks, and reference the values
          from other stacks.`,
            image: `${baseUrl}img/undraw_going_up_ttm5.svg`,
            imageAlign: "right"
          }
        ]}
      />
    </Container>
  );
};

const Repeatability = ({ config: { baseUrl, docsUrl }, language }) => {
  const urls = {
    assets: `${docUrl(baseUrl, docsUrl) + language}/assets`
  };
  return (
    <Container padding={["bottom", "top"]} background="light">
      <GridBlock
        className="detail"
        contents={[
          {
            title: "Isolation and Repeatability",
            content: `You can assimilate bricks to **containerized
          infrastructure units**, just like Docker images but for
          infrastructure configuration.
          [**Bundle any artifact**](${urls["assets"]}) needed by your
          infrastructure inside your bricks, and share them seamlessly
          with the community. Manage your infrastructure in an
          **auditable**, **repeatable**, and **dependable** way. Bricks
          are **deterministic** and have no access to the network,
          filesystem, and other random interferences.`,
            image: `${baseUrl}img/undraw_collecting_fjjl.svg`,
            imageAlign: "left"
          }
        ]}
      />
    </Container>
  );
};

const Extensibility = ({ config: { baseUrl, docsUrl }, language }) => {
  const urls = {
    parser: `${docUrl(baseUrl, docsUrl) + language}/parser`,
    assets: `${docUrl(baseUrl, docsUrl) + language}/assets`,
    deps: `${docUrl(baseUrl, docsUrl) + language}/dependencies`,
    stdlib: `${docUrl(baseUrl, docsUrl) + language}/stdlib`,
    github: "https://github.com/icdotdev/cli"
  };
  return (
    <Container padding={["bottom", "top"]}>
      <GridBlock
        className="detail"
        contents={[
          {
            title: "Features and Extensibility",
            content: `We currently **support 100% of AWS resources** and
          enable you with features like [**smart parsing**](${urls["parser"]}),
          [**assets**](${urls["assets"]}), and
          [**dependency management**](${urls["deps"]}) along with a
          [standard library](${urls["stdlib"]}) to access environment
          variables or **manage sensitive data** and **cross brick
          references**. If you have ideas for useful features, feel free
          to contribute on [GitHub](${urls["github"]}). But that's not
          all. The **free and public index** grows day after day to
          provide you with more high-level bricks. **You're only one
          brick away your next awesome app** and if you think it can be
          useful to the community, **just publish it**!`,
            image: `${baseUrl}img/undraw_blooming_jtv6.svg`,
            imageAlign: "right"
          }
        ]}
      />
    </Container>
  );
};

const Start = ({ config: { baseUrl, docsUrl }, language }) => {
  const urls = {
    installation: `${docUrl(baseUrl, docsUrl) + language}/installation`
  };

  return (
    <Container className="start">
      <a className="button action" href={urls["installation"]}>
        <strong>Get Started</strong>
      </a>
    </Container>
  );
};

module.exports = Index;
