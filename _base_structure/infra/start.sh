#!/bin/sh

tsc || ./node_modules/.bin/tsc
tsc-alias || ./node_modules/.bin/tsc-alias
node ./dist/main.js