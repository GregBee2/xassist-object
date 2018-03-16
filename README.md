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
- `clone()` [function]: very basic cloner for simple objects
- `onChange` [function]: adds a listener to the current object for changes in values
- `assign()` [function]: a polyfill for `Object.assign`
- `mergeUnique()` [function]: changes keys for this.object with given values, kinda similar to assign
- `toArray()` [function]: returns all values for all keys in this.object
- `toMapArray()` [function]: returns all `key,value`-pairs in this.object
- `forEach()` [function]: similar to forEach for Arrays, but iterates over the keys of an object
- `map()` [function]: similar to map for Arrays, but iterates over the keys of an object

the classInstance name is XaObject and is a child-class of EventDispatcher.
It's own attributes are:
- `object` [Object]: the current object, provided via the simple factory-function `object()`
- `currentvalues` [Object]: an intermediate object with the currentvalues of the base object, used for events

### object().clone()

`clone()`is a very basic cloner of objects. It uses `JSON.parse(JSON.stringify(object))` for cloning.
But respecting the limitations this gives us (functions, dates, cyclic references) the cloning of the object will work fairly good and fast.

`clone()`accepts no arguments, and returns a clone of the baseObject.

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

### object().assign()

The method `object().assign()` works the same as the function [`Object.assign()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/assign) in fact it even uses it if this function is available.

This method copiesall own property-values of all objects inside the `arguments-list` to the baseObject.

```js
object(obj).assign(c,null,{e:4})===Object.assign(obj,c,null,{e:4})

```
### object().mergeUnique()

`object().mergeUnique()` does the same as assign it copies all own property values to a target object (ie this.object, the baseObject of `object()`), with this restriction. it only copies the values for properties allready existant in the base (target object).
MergeUnique takes into account the type of the propertyvalue. if the baseobject has `Strings`,`Boolean` or `Numbers` as propertyvalue, the corresponding value in the sourceobject (passed on as argument to `mergeUnique`) will be transformed to this type.


#### parameters for object().mergeUnique()

the method `mergeUnique(sourceObject)` accepts 3 parameters. This is different from assign, cause assign has no limit to the number of parameters
- **sourceObject** [Object] another object from which the values of the properies existent in the targetObject will be copied.

**** result for object().mergeUnique()

the method returns the target object (ie `this.object`). the object that is changed.

**** example for object().mergeUnique()

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
		expectedResult={
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
		};
```

Let's use mergeUnique
```js
object(testObject).mergeUnique(sourceObj);
```
the result being
```js
testObject===expectedResult
```

### object().toArray()

`toArray` returns an array of all values for the own properties of the object.

#### parameters for object().toArray()
`toArray()` takes no parameters.

#### result for object().toArray()
`toArray()` returns an array with all values for each own property of the baseobject.
#### example for object().toArray()

Lets initialize some variables::

```js
var testObject={key1:157,key2:"txt",key3:false}
```

and if we execute `toArray`:
```js
var result=object(testObject).toArray();
```

we will get:
```js
console.log(result)
// [157,"txt",false]
```

### object().toMapArray()

`toMapArray` returns an array with `[key,value]` arrays as its elements.

#### parameters for object().toMapArray()
`toMapArray()` takes no parameters.

#### result for object().toMapArray()
the result of `toMapArray()` is an Array with all key,value pairs.
#### example for object().toMapArray()

lets initialize some variables:
```js
var testObject={key1:157,key2:"txt",key3:false}
```

and if we execute `toMapArray`:
```js
var result=object(testObject).toMapArray();
```

we will get:
```js
console.log(result)
// [[key1,157],[key2,"txt"],[key3,false]]
```
### object().forEach()
`forEach` is similar to the native `Array.prototype.forEach`, it executes a function for each own property of the function.

```js
object(obj).forEach(fn::function [,thisArg])
```

the method accepts 2 parameters, from which the last one (thisArg) is Optional.
#### parameters for object().forEach()
- **fn** [Function]: the function that should be executed on each property of the object. this function accepts following parameters
	- the value of the current property
	- the name of the property
	- the object it self
- **thisArg**: the context in which the function should run, this defaults to the baseObject self

#### result for object().forEach()
forEach returns nothing, it executes a function for each property. If you think it should return anything, look at `map()`

#### example for object().forEach()

Suppose following initialization:
```js
var count=0,
	testObject={key1:true,key2:false:key3:true,key4:false},
	fn=function(value,keyName,obj){count+= (value&&keyName!="key3")}
```

Let's use forEach
```js
object(testObject).forEach(fn);
```
the result being
```js
count===1
```

### object().map()

`map()` is comparable to the native map on arrays, it returns a new object constructed from the mapped key, value pairs of the baseObject.
```js
object(obj).forEach(fn::function [,thisArg])
```

the method accepts 2 parameters, from which the last one (thisArg) is Optional.
#### parameters for object().map()
- **fn** [Function]: the function that should be executed on each property of the object, it returns the new value for the corresponding key. This function accepts following parameters
	- the value of the current property
	- the name of the property
	- the object it self
- **thisArg**: the context in which the function should run, this defaults to the baseObject self

#### result for object().map()
`map()` returns a new object, it executes a function for each property and those return values are the values for the corresponding properties.

#### example for object().map()

Suppose following initialization:
```js
var testObject={key1:157,key2:"text":key3:true,key4:false},
	fn=function(value,keyName,obj){return  (typeof value!=='number' && keyName!="key3")}
```

Let's use map
```js
var result=object(testObject).map(fn);
```
the result being
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

- [@xassist/xassist-eventdispatcher](https://ghub.io/@xassist/xassist-eventdispatcher):  general eventdispatcher class

## Dev Dependencies

- [rimraf](https://ghub.io/rimraf): A deep deletion module for node (like `rm -rf`)
- [rollup](https://ghub.io/rollup): Next-generation ES6 module bundler
- [tape](https://ghub.io/tape): tap-producing test harness for node and browsers

## License

GPL-3.0
