#!/bin/sh
. "$(dirname "$0")/_/husky.sh"

npm run lint:ts
npm run test:unit