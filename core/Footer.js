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

const Footer = props => {
  return (
    <footer className="nav-footer">
      <section className="sitemap">
        <Docs {...props} />
        <Channels />
        <More {...props} />
      </section>
      <section className="copyright">
        Copyright 2019 Farzad Senart and Lionel Suss. All rights reserved.
      </section>
    </footer>
  );
};

const docUrl = (baseUrl, docsUrl) =>
  `${baseUrl}${docsUrl ? `${docsUrl}/` : ""}`;

const Docs = ({ config: { baseUrl, docsUrl }, language }) => (
  <div>
    <h5>Docs</h5>
    <a href={`${docUrl(baseUrl, docsUrl) + language}/installation`}>
      Getting Started
    </a>
    <a href={`${docUrl(baseUrl, docsUrl) + language}/resources`}>Resources</a>
    <a href={`${docUrl(baseUrl, docsUrl) + language}/assets`}>Assets</a>
    <a href={`${docUrl(baseUrl, docsUrl) + language}/parser`}>Parser</a>
    <a href={`${docUrl(baseUrl, docsUrl) + language}/dependencies`}>
      Dependencies
    </a>
    <a href={`${docUrl(baseUrl, docsUrl) + language}/stdlib`}>
      Standard Library
    </a>
  </div>
);

const Channels = () => (
  <div>
    <h5>Channels</h5>
    <a href="https://github.com/icdotdev/cli">GitHub</a>
    <a href="https://twitter.com/icdotdev">Twitter</a>
    <a href="https://slack.ic.dev/">Slack</a>
  </div>
);

const More = ({ config: { baseUrl, docsUrl }, language = "en" }) => (
  <div>
    <h5>More</h5>
    <a href={`${baseUrl}blog`}>Blog</a>
    <a href={`${baseUrl + language}/help`}>Help</a>
  </div>
);

module.exports = Footer;
