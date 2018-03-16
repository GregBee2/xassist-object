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

## Usage

### object()

The base function object() creates a new `Class` instance which gives access to some helper Object-functions
```js
object(/*obj:Object*/)
```

note that the `new`- keyword should not be used to create the class-instance.

#### parameters for object() 
`object()` takes one (non-optional) parameters:
- **obj**: an Object on which we will execute the underlying methods.

example usage:
```js
object({a:157})
object({hello:"world", ok:true})
```

#### result for object()
`object()` returns following methods:
- `onChange` [function]: adds a listener to the current object for changes in values
- `assign()` [function]: a polyfill for `Object.assign`
- `clone()` [function]: very basic cloner for simple objects
- `mergeUnique()` [function]: changes keys for this.object with given values, kinda similar to assign
- `toArray()` [function]: returns all values for all keys in this.object
- `toMapArray()` [function]: returns all `key,value`-pairs in this.object
- `forEach()` [function]: similar to forEach for Arrays, but iterates over the keys of an object
- `map()` [function]: similar to map for Arrays, but iterates over the keys of an object
- `map()` [function]: similar to map for Arrays, but iterates over the keys of an object

the classInstance name is XaObject and is a child-class of EventDispatcher.
It's own attributes are:
- `object` [Object]: the current object, provided via the simple factory-function `object()`
- `currentvalues` [Object]: an intermediate object with the currentvalues of the base object, used for events

### object().onChange()

The first method `object().onChange()` sets a listener that will be executed if a value for a given key gets changed

```js
object(obj).onChange(keyName, callBack::function [thisArg])
```

This method accepts 3 parameters. the last one `thisArg` is optional, and defaults to the object (not the classInstance).

#### parameters for object().onChange()

the method `onChange(keyName,callback,thisArg)` accepts 3 parameters.
- **keyName** [String] is an existing key for which the listener should gets executed, if the key does not exists, an Error is thrown
- **callback** [Function]: a listnerfunction which takes 4 parameter
	- the new value assigned to the object key
	- the old value
	- the keyName
	- the object
- **thisArg** [optional]:the execution-context of the listener

**** example for object().onChange()

Suppose following initialization:
```js
var b={yes:true}, res=false;
fn=function(value,oldValue,key,Object){ res=(Array.prototype.slice.call(arguments))};
var bObj=object(b);
```

Let's try to add a listener to a change on the key yes for the object b
```js
bObj.onChange("yes",fn)						
b.yes=true //nothing get's changed so the listener is not fired
b.yes="finally" //onChange is fired
```
the result being
```js
res===["finally",true,"yes",b]
```


## Tests

```sh
npm install
npm test
```

## Dependencies

- [@xassist/xassist-eventdispatcher](https://ghub.io/@xassist/xassist-eventdispatcher):  general eventdispatcher class

## Dev Dependencies

- [rimraf](https://ghub.io/rimraf): A deep deletion module for node (like `rm -rf`)
- [rollup](https://ghub.io/rollup): Next-generation ES6 module bundler
- [tape](https://ghub.io/tape): tap-producing test harness for node and browsers

## License

GPL-3.0
