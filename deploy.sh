#!/usr/bin/env sh

# abort on errors
set -e

env PUBLIC_URL=https://khanhvinhnguyen.github.io/CS105-solar-system/ npm run build

cd dist

git init
git add -A
git commit -m 'deploy'

# deploying to https://{USERNAME}.github.io (see https://pages.github.com for instructions)
# git push -f git@github.com:{USERNAME}/{USERNAME}.github.io.git main

# deploying to https://{USERNAME}.github.io/{REPO}
git push -f git@github.com:khanhvinhnguyen/CS105-solar-system.git main:gh-pages
