#!/bin/bash

if [ -z "$1" ]
then
    node node_modules/eslint/bin/eslint.js lambdas/$FOLDER *.js
else
    FOLDER=$(node ./scripts/getLambdaFolder.js $1)
    echo the folder of lamba is $FOLDER

    node node_modules/eslint/bin/eslint.js lambdas/$FOLDER *.js
fi
