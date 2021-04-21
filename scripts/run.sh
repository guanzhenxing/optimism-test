#!/bin/bash
set -x
set -e

START=`date +%s`

print_progress () {
  printf "\e[0;33m$1\e[0m\n"
}

print_success () {
  printf "\e[4;32m$1\e[0m\n"
}

NETWORK=kovan

yarn compile --network $NETWORK

npx hardhat run --network $NETWORK ./scripts/run.js

END=`date +%s`

print_success "\nDone. Runtime: $((END-START)) seconds."

exit 1