FROM ubuntu:20.04

# update apt
RUN apt-get -qq update

# RUN rm /bin/sh && ls -s /bin/bash /bin/sh

# install nvm
RUN curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.1/install.sh | bash

