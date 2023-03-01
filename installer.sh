#!/bin/bash

docker build -t test-server -f ./Dockerfiles/DockerfileTest .

docker run test-server