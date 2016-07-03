#!/usr/bin/env bash

activator clean compile universal:package-zip-tarball
ansible-playbook -i bootstrap/ansible/prod bootstrap/ansible/playbook.yml