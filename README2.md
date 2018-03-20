# @xassist/xassist-object
This module adds different methods to the generic javascript `Object`.
It does not extend the javascript `Object` itself, but defines a subClass.
## Installation

If you use [NPM](https://www.npmjs.com/), you can install the module via `npm install xassist-object`. Otherwise, you can download the latest [minified file](https://raw.githubusercontent.com/GregBee2/xassist-object/master/dist/xAssist-object.min.js). Be aware any dependencies are not installed by default; you should consider downloading them yourself.
If you want, you can install the complete library from github [xassist](https://github.com/GregBee2/xassist), this includes all dependencies you may need.

The module uses [UMD](https://github.com/umdjs/umd) and supports [AMD](https://github.com/amdjs/amdjs-api/wiki/AMD), [CommonJS](http://wiki.commonjs.org/wiki/CommonJS) and vanilla environments. Using vanilla: the `xa`global is exported:

```html
<script>
xa.object()
</script>
```



## API
### object()

The base function object() creates a new Class instance which gives access to some helper Object-functions
```js
object(/*baseObject::object*/)
```
note that the new- keyword should not be used to create the class-instance.
#### Parameters for object()
`object()` takes 1 parameters:
- **baseObject** [`Object`]:an Object on which we will execute the underlying methods
#### Result for object()
`object()` returns a new class instance of the Class `XaObject`
```js
object(a).constructor.name===XaObject
```
`XaObject` returns 8 method:
- `clone()`: very basic cloner for simple objects
- `onChange`: adds a listener to the current object for changes in values
- `assign()`: a polyfill for Object.assign
- `mergeUnique()`: changes keys for this.object with given values, kinda similar to assign
- `toArray()`: returns all values for all keys in this.object
- `toMapArray()`: returns all key,value-pairs in this.object
- `forEach()`: similar to forEach for Arrays, but iterates over the keys of an object
- `map()`: similar to map for Arrays, but iterates over the keys of an object

`XaObject` has 2 own attributes:
- `object`[`Object`]:the current baseObject, provided via the simple factory-function object()
- `currentValues`[`Object`]:an intermediate object with the current values of the base object, used for events
#### Example for object()
```js
object({a:157})
object({hello:"world", ok:true})
```
### object().onChange()

sets a listener that will be executed if a value for a given key gets changed
```js
object(baseObject).onChange(keyName, callBack::function [thisArg])
```
`object().onChange()` returns nothing.
#### Parameters for object().onChange()
`object().onChange()` takes 3 parameters:
- **keyName** [`String`]:is an existing key for which the listener should gets executed, if the key does not exists, an Error is thrown
- **callBack** [`Function`]:a listenerfunction which takes 4 parameter (newValue,oldValue,keyName,object)
- *thisArg* [*any datatype*,defaults to: `XaObject.object`]:the execution-context of the listener
#### Example for object().onChange()
Suppose following initialization:
```js
var b={yes:true}, res=false;
fn=function(value,oldValue,key,Object){ res=(Array.prototype.slice.call(arguments))};
var bObj=object(b);
```
```js
bObj.onChange("yes",fn)      
b.yes=true //nothing get's changed so the listener is not fired
b.yes="finally" //onChange is fired
```
This will result in:
```js
res===["finally",true,"yes",b]
```
### object().clone()

clone() is a very basic cloner of objects it uses JSON.parse(JSON.stringify(baseObject)) for cloning. Even with the different limitations JSON parse/stringify entails, the cloner works fairly well and reasonable fast.
```js
object(baseObject).clone()
```
`object().clone()` requires no parameters.
#### Result for object().clone()
clone() returns a clone of the current baseObject.
## Dependencies
- [@xassist/xassist-eventdispatcher](https://github.com/GregBee2/xassist-eventdispatcher#readme): general eventdispatcher class 
## DevDependencies
- [csv2readme](https://github.com/GregBee2/csv2readme#readme): read csv file with fixed format and parse a readme markdown file
- [rimraf](https://github.com/isaacs/rimraf#readme): A deep deletion module for node (like `rm -rf`)
- [rollup](https://github.com/rollup/rollup): Next-generation ES6 module bundler
- [tape](https://github.com/substack/tape): tap-producing test harness for node and browsers
## License

This module is licensed under the terms of [GPL-3.0](https://choosealicense.com/licenses/gpl-3.0).
