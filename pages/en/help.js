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
const { Container } = require("../../core/CompLibrary.js");

const Help = ({ config: { baseUrl, docsUrl }, language }) => (
  <div className="docMainWrapper wrapper">
    <Container className="mainContainer documentContainer postContainer">
      <div className="post">
        <header className="postHeader">
          <h1>Need help?</h1>
        </header>
        <p>
          If you need help with the IC project, there are several possibilities
          for you:
        </p>
        <ul>
          <li>
            Browser the{" "}
            <a href={`${docUrl(baseUrl, docsUrl) + language}/installation`}>
              documentation
            </a>
            .
          </li>
          <li>
            Join the conversation on <a href="https://slack.ic.dev">Slack</a>.
          </li>
          <li>
            Follow and contact us on{" "}
            <a href="https://twitter.com/icdotdev">Twitter</a>.
          </li>
          <li>
            Submit issues and pull requests on{" "}
            <a href="https://github.com/icdotdev/cli">GitHub</a>.
          </li>
        </ul>
      </div>
    </Container>
  </div>
);

const docUrl = (baseUrl, docsUrl) =>
  `${baseUrl}${docsUrl ? `${docsUrl}/` : ""}`;

module.exports = Help;
