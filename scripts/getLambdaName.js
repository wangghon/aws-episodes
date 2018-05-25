#!/usr/bin/env node

const config = require('./config.json');
const stdout = process.stdout;
const functionName = config.functions[process.argv[2]].functionName;

stdout.write(functionName);
