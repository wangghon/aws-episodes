FUNCTION_FILE=build/lambda.zip
echo the first arg is $1
FOLDER=$(node ./scripts/getLambdaFolder.js $1)

echo the folder of lamba is $FOLDER

yarn

rm -Rf bin/
babel --presets=env ./lambdas/common --out-dir bin/common
babel --presets=env ./lambdas/$FOLDER --out-dir bin

rm -Rf build/
mkdir build
rm -Rf node_modules/
yarn --prod
zip -r $FUNCTION_FILE bin node_modules
