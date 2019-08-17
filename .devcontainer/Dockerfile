FROM node:12.7.0-stretch-slim

RUN set -ex; \
  apt update; \
  apt install -y --no-install-recommends \
    curl \
    jq \
    locales \
    silversearcher-ag \
    tree \
    yarn; \
  \
  sed -i -e 's/# \(en_US\.UTF-8 .*\)/\1/' /etc/locale.gen; \
  locale-gen en_US.UTF-8; \
  \
  echo 'export PS1="\\w\\$ "' >> /root/.bashrc

ENV SHELL /bin/bash
ENV LANG en_US.UTF-8
ENV LANGUAGE en_US:en
ENV LC_ALL en_US.UTF-8
