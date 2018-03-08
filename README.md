# @xassist/xassist-object

general helper functions for JavaScript objects 

## Installation

This is a [Node.js](https://nodejs.org/) module available through the 
[npm registry](https://www.npmjs.com/). It can be installed using the 
[`npm`](https://docs.npmjs.com/getting-started/installing-npm-packages-locally)
or 
[`yarn`](https://yarnpkg.com/en/)
command line tools.

```sh
npm install @xassist/xassist-object --save
```

## Tests

```sh
npm install
npm test
```
```

> @xassist/xassist-object@0.0.12 pretest C:\Applic\Server\DBNode-4.0.0-beta-3\htdocs\__Projects\utilities\submodules\xassist-object
> rimraf dist  && rollup -c
[ 'C:\\Windows\\SBOINSTALL\\NodeJS\\node.exe',
  'C:\\Applic\\Server\\DBNode-4.0.0-beta-3\\htdocs\\__Projects\\utilities\\submodules\\xassist-object\\node_modules\\rollup\\bin\\rollup',
  '-c' ]
umd
> @xassist/xassist-object@0.0.12 test C:\Applic\Server\DBNode-4.0.0-beta-3\htdocs\__Projects\utilities\submodules\xassist-object
> istanbul cover node_modules/tape/bin/tape test/**/*-test.js
TAP version 13
# toArray() returns array with all objectKey-Values
ok 1 toArray() returns an array with all values for each enumerable key
# MapArray() returns array with as elements each [objectKey,objectValue]
ok 2 toArray() returns an array with all values for each enumerable key
# forEach() executes function for each key value pair
ok 3 forEach(fn) executes function with default this corresponding to original object
ok 4 forEach(fn,thisArg) set correct execution context to thisArg
# map() maps key,value pairs to new object
ok 5 map(fn) returns new object with the correct keys, and calulated values
ok 6 map(fn,thisArg) set correct execution context to thisArg
# clone() returns object clone
ok 7 clone() returns object clone
ok 8 clone() is new object
# mergeUnique(source) copies existing keys in targetobj from source
ok 9 mergeUnique() doe snothing and return original object
ok 10 should be truthy
ok 11 mergeUnique(source) changes existing keys in target based upon sourceKeys
# assign() works the same ways as Object.assign
ok 12 assign() when Object.assign is defined works
ok 13 assign() without Object.assign uses correct polyfill even with shadowed hasOwnProperty and enumerable prototype keys
ok 14 assign() gives an error when source-object is null or undefined
=============================== Coverage summary ===============================
Statements   : 100% ( 55/55 )
Branches     : 78.13% ( 25/32 )
Functions    : 100% ( 17/17 )
Lines        : 100% ( 54/54 )
================================================================================
1..14
# tests 14
# pass  14
# ok

```

## Dependencies

None

## Dev Dependencies

- [jsdom](https://ghub.io/jsdom): A JavaScript implementation of many web standards
- [rimraf](https://ghub.io/rimraf): A deep deletion module for node (like `rm -rf`)
- [rollup](https://ghub.io/rollup): Next-generation ES6 module bundler
- [rollup-plugin-json](https://ghub.io/rollup-plugin-json): Convert .json files to ES6 modules:
- [rollup-plugin-node-resolve](https://ghub.io/rollup-plugin-node-resolve): Bundle third-party dependencies in node_modules
- [tape](https://ghub.io/tape): tap-producing test harness for node and browsers

## License

GPL-3.0
