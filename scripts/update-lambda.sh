#!/bin/sh

yarn build $1

FUNCTION_FILE=build/lambda.zip
echo The new arg is $1
FUNCTION_NAME=$(node ./scripts/getLambdaName.js $1)

REGION=ap-southeast-2
EXEC_ROLE='arn:aws:iam::967027571182:role/lambda_basic_execution'
echo The new functionanme is $FUNCTION_NAME

aws lambda update-function-code \
  --function-name $FUNCTION_NAME \
  --zip-file fileb://$FUNCTION_FILE
