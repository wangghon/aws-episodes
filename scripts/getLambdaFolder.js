#!/usr/bin/env node

const config = require('./config.json');
const stdout = process.stdout;
const folder = config.functions[process.argv[2]].folder;
stdout.write(folder);
