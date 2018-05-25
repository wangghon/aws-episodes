#!/bin/sh

yarn
yarn build $1

FUNCTION_JS=index.js
FUNCTION_FILE=build/lambda.zip
echo The new arg is $1
FUNCTION_NAME=$(node ./scripts/getLambdaName.js $1)

REGION=ap-southeast-2
EXEC_ROLE='arn:aws:iam::967027571182:role/lambda_basic_execution'
echo The new functionanme is $FUNCTION_NAME

aws lambda create-function \
  --function-name $FUNCTION_NAME \
  --runtime 'nodejs8.10' \
  --role $EXEC_ROLE \
  --handler bin/index.handler \
  --zip-file fileb://$FUNCTION_FILE \
  --timeout 20
