#!/bin/zsh
set -e

cp .env.production .env
bitrise run Release
cp .env.development .env
