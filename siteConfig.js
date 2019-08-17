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

const siteConfig = {
  title: "ic.dev",
  tagline: "compose, share, and deploy cloud infrastructure bricks",

  url: "https://ic.dev",
  baseUrl: "/",
  cname: "ic.dev",
  editUrl: "https://github.com/icdotdev/icdotdev/edit/master/docs/",

  headerLinks: [
    { label: "Docs", doc: "installation" },
    { label: "Blog", blog: true },
    { label: "Help", page: "help" },
    { label: "GitHub", href: "https://github.com/icdotdev/cli" }
  ],

  colors: {
    primaryColor: "#1a3b3f",
    secondaryColor: "#8ee000"
  },

  favicon: "favicon.ico",
  headerIcon: "img/favicon-32x32.png",
  ogImage: "img/favicon-32x32.png",
  twitterImage: "img/favicon-32x32.png",

  organizationName: "icdotdev",
  projectName: "icdotdev",

  gaTrackingId: "UA-145891133-1",
  twitter: true,

  highlight: {
    defaultLang: "python",
    theme: "atom-one-dark",
    version: "9.15.9"
  },

  scripts: [
    "https://cdnjs.cloudflare.com/ajax/libs/clipboard.js/2.0.0/clipboard.min.js",
    "/js/code-block-buttons.js"
  ],

  cleanUrl: true,
  customDocsPath: "icdotdev/docs",
  docsSideNavCollapsible: true,
  onPageNav: "separate",
  scrollToTop: true
};

module.exports = siteConfig;
