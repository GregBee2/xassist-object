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
### object().assign()

The method `object().assign()` works the same as the function [`Object.assign()`](https
```js
object(obj).assign(/*list of source objects*/)
```
This method copiesall own property-values of all objects inside the `arguments-list` to the baseObject.
`object().assign()` returns nothing.
#### Parameters for object().assign()
`object().assign()` takes 1 parameters:
- **obj_1,obj_2,?,obj_n** [`one or more source objects`]:All enumerable properties of these source-objects will be copied to the baseObject
#### Example for object().assign()
```js
object(obj).assign(c,null,{e:4})===Object.assign(obj,c,null,{e:4})
```
### object().mergeUnique()

`object().mergeUnique()` does the same as assign it copies all own property values to a target object (ie this.object, the baseObject of `object()`), with this restriction. it only copies the values for properties allready existant in the base (target object).
```js
object(obj).mergeUnique(sourceObj)
```
MergeUnique takes into account the type of the propertyvalue. if the baseobject has `Strings`,`Boolean` or `Numbers` as propertyvalue, the corresponding value in the sourceobject (passed on as argument to `mergeUnique`) will be transformed to this type.
#### Parameters for object().mergeUnique()
`object().mergeUnique()` takes 1 parameters:
- **sourceObject** [`Object`]:another object from which the values of the properies existent in the targetObject will be copied.
#### Result for object().mergeUnique()
the method returns the base object (ie `this.object`). the object that is changed.
#### Example for object().mergeUnique()
Suppose following initialization:
```js
var testObject={
  number1:1,
  number2:2,
  number3:3,
  number4:4,
  number5:5,
  number6:6,
  txt1:"1",
  txt2:"2",
  txt3:"3",
  txt4:"4",
  bool1:true,
  bool2:true,
  bool3:true,
  bool4:false,
  bool5:true,
  array1:[1,2],
  array2:[true]
 },
  sourceObj={
   number1:1.57,
   number2:"3",
   number3:"r",
   number4:false,
   number5:true,
   number7:-157,
   txt1:"ok",
   txt2:4,
   txt3:true,
   bool1:false,
   bool2:0,
   bool3:"",
   bool4:"false",
   array1:[1,3]
  }
```
```js
object(testObject).mergeUnique(sourceObj);
```
This will result in:
```js
console.log(testObject)
/*{
   number1:1.57,
   number2:3,
   number3:NaN,
   number4:0,
   number5:1,
   number6:6,
   txt1:"ok",
   txt2:"4",
   txt3:"true",
   txt4:"4",
   bool1:false,
   bool2:false,
   bool3:false,
   bool4:true,
   bool5:true,
   array1:[1,3],
   array2:[true]
  };*/
```
### object().toArray()

`toArray` returns an array of all values for the own properties of the object.
```js
object(obj).toArray()
```
`object().toArray()` requires no parameters.
#### Result for object().toArray()
`toArray()` returns an array with all values for each own property of the baseobject.
#### Example for object().toArray()
Suppose following initialization:
```js
var testObject={key1:157,key2:"txt",key3:false}
```
```js
var result=object(testObject).toArray();
```
This will result in:
```js
console.log(result)
// [157,"txt",false]
```
### object().toMapArray()

`toMapArray` returns an array with `[key,value]` arrays as its elements.
```js
object(obj).toMapArray()
```
`object().toMapArray()` requires no parameters.
#### Result for object().toMapArray()
the result of `toMapArray()` is an Array with all key,value pairs.
#### Example for object().toMapArray()
Suppose following initialization:
```js
var testObject={key1:157,key2:"txt",key3:false}
```
```js
var result=object(testObject).toMapArray();
```
This will result in:
```js
console.log(result)
// [[key1,157],[key2,"txt"],[key3,false]]
```
### object().forEach()

`forEach` is similar to the native `Array.prototype.forEach`, it executes a function for each own property of the function.
```js
object(obj).forEach(fn::function [,thisArg])
```
#### Parameters for object().forEach()
`object().forEach()` takes 2 parameters:
- **fn** [`Function`]:he function that should be executed on each property of the object. this function accepts 3 parameters (value of the current property, the name of the property and the object itself)
- *thisArg* [*any datatype*,defaults to: `XaObject.object`]:the execution-context of the function
#### Result for object().forEach()
forEach returns nothing, it executes a function for each property. If you think it should return anything, look at `map()`
#### Example for object().forEach()
Suppose following initialization:
```js
var count=0,
 testObject={key1:true,key2:false:key3:true,key4:false},
 fn=function(value,keyName,obj){count+= (value&&keyName!="key3")}
```
```js
object(testObject).forEach(fn);
```
This will result in:
```js
count===1
```
### object().map()

`map()` is comparable to the native map on arrays, it returns a new object constructed from the mapped key, value pairs of the baseObject.
```js
object(obj).forEach(fn::function [,thisArg])
```
#### Parameters for object().map()
`object().map()` takes 2 parameters:
- **fn** [`Function`]:he function that should be executed on each property of the object. this function accepts 3 parameters (value of the current property, the name of the property and the object itself)
- *thisArg* [*any datatype*,defaults to: `XaObject.object`]:the execution-context of the function
#### Result for object().map()
`map()` returns a new object, it executes a function for each property and those return values are the values for the corresponding properties.
#### Example for object().map()
Suppose following initialization:
```js
var testObject={key1:157,key2:"text":key3:true,key4:false},
 fn=function(value,keyName,obj){return  (typeof value!=='number' && keyName!="key3")}
```
```js
var result=object(testObject).map(fn);
```
This will result in:
```js
console.log(result)
/*{
 key1:false,
 key2:true,
 key3:false,
 key4:true
}*/
```
## Dependencies
- [@xassist/xassist-eventdispatcher](https://github.com/GregBee2/xassist-eventdispatcher#readme): general eventdispatcher class 
## DevDependencies
- [csv2readme](https://github.com/GregBee2/csv2readme#readme): read csv file with fixed format and parse a readme markdown file
- [rimraf](https://github.com/isaacs/rimraf#readme): A deep deletion module for node (like `rm -rf`)
- [rollup](https://github.com/rollup/rollup): Next-generation ES6 module bundler
- [tape](https://github.com/substack/tape): tap-producing test harness for node and browsers
## License

This module is licensed under the terms of [GPL-3.0](https://choosealicense.com/licenses/gpl-3.0).
