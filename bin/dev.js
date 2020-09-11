#!/usr/bin/env node
const shell = require('shelljs');
const path = require('path');

const parentPath = process.cwd();
const pkgPath = path.join(__dirname, '../');
console.log(parentPath);
console.log(pkgPath);

shell.cd(pkgPath);
shell.exec(`npm run dev --path=${parentPath}`);
