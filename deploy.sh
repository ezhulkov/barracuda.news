#!/usr/bin/env bash

cd ./conf/compass/
compass compile
cd -
sbt clean compile universal:package-zip-tarball
ansible-playbook -i bootstrap/ansible/prod bootstrap/ansible/playbook.yml