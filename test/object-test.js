var definition = require("../package.json");
var { object }=require("../"+definition.main);
var tape=require("tape");
var testObject={
	a:1,
	b:2,
	c:"txt",
	d:false
}
var t=object(testObject);

tape("onChange(key,fn,thisArg) executes the function when the value for the key is set",function(test){
	var res=false,res2=false;
	var fn=function(value,oldValue,key,Object){ res=(Array.prototype.slice.call(arguments))};
	var fn2=function(value,oldValue,key,Object){ res2=(res[0]==value)};
	var t2=object(testObject).clone();
	var t1=object(t2);
	//t.onChange("keyDoesNotExists",fn);
	var err=false;
	try{
		t1.onChange("keyDoesNotExists",fn);
		
	}catch(error){
		err=error;
	}
	test.ok(!!err&&err.constructor.name==="ReferenceError"&&err.message==='key does not exist in Object',
		"onChange() gives an error when key does not exist"
	);
	t1.onChange("a",fn);
	t2.a=1; //nochange
	t2.b=157;
	test.ok(res===false,
		"does not fire when no changes are detected (oldValue = newValue) or when other values are changed"
	);
	t2.a=2; //change
	test.deepEqual([res,res2],[[2,1,"a",t2],false],
		"onchange fires when value changes"
	);
	t1.onChange("a",fn2);
	t2.a=3;
	console.log(res2,res)
	test.ok(t2.a===3&&res2===true,
		"after Onchange value gets set to correct value, multiple onchange's get executed in correct order"
	);
	test.end();
});


tape("toArray() returns array with all objectKey-Values", function(test) {
	var a=t.toArray();
	test.deepEqual([1,2,"txt",false],a,
		"toArray() returns an array with all values for each enumerable key"
	);
	test.end();
});
tape("MapArray() returns array with as elements each [objectKey,objectValue]", function(test) {
	var a=t.toMapArray();
	test.deepEqual([["a",1],["b",2],["c","txt"],["d",false]],a,
		"toArray() returns an array with all values for each enumerable key"
	);
	test.end();
})
tape("forEach() executes function for each key value pair", function(test) {
	var me=false,res="";
	var fn=function(val,key,obj){me=this;res=(res===""?"":res+",")+key+":"+val;};
	var thisArg={test:true};
	t.forEach(fn);
	test.ok("a:1,b:2,c:txt,d:false"===res&&me===testObject,
		"forEach(fn) executes function with default this corresponding to original object"
	);
	res="2";
	t.forEach(fn,thisArg);
	test.ok("2,a:1,b:2,c:txt,d:false"==res&&me===thisArg,
		"forEach(fn,thisArg) set correct execution context to thisArg"
	);
	test.end();
})
tape("map() maps key,value pairs to new object", function(test) {
	var me=false,me2=false;
	var fn=function(val,key,obj){me=this;if(key=="a"||val=="txt"){return true}else{return false;}};
	var fn2=function(val,key,obj){me2=this;if(key=="a"||val=="txt"){return true}else{return false;}};
	var thisArg={test:true};
	var a=t.map(fn);
	test.deepEqual({a:true,b:false,c:true,d:false},a,
		"map(fn) returns new object with the correct keys, and calulated values"
	);
	var a=t.map(fn2,thisArg);
	test.ok(me===testObject&&me2===thisArg,
		"map(fn,thisArg) set correct execution context to thisArg"
	);
	test.end();
})
tape("clone() returns object clone", function(test) {
	var a=t.clone();
	test.deepEqual(a,testObject,
		"clone() returns object clone"
	);
	test.ok(a!==testObject,
		"clone() is new object"
	);
	test.end();
});
tape("mergeUnique(source) copies existing keys in targetobj from source", function(test) {
	var testObject2={
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
		
	var a=t.mergeUnique();
	test.ok(a==testObject,
		"mergeUnique() doe snothing and return original object");
	var a=object(testObject2).mergeUnique(sourceObj);
	test.ok(isNaN(a.number3),"isNaN is used when converting between real String and Number"); //deepEqual and NaN does not match!
	delete a.number3;
	delete expectedResult.number3;
	test.deepEqual(a,expectedResult,
		"mergeUnique(source) changes existing keys in target based upon sourceKeys");
	test.end();
})
tape("assign() works the same ways as Object.assign", function(test) {
	var t1=object(testObject).clone();
	var t2=object(testObject).clone();
	var objWithProto=function(){this.b=false};
	objWithProto.prototype={falsePos:true}
	var c=new objWithProto();
	c.hasOwnProperty=function(){return false;}; //shadowed hasOwnProperty
	Object.assign(t1,c,null,{e:4});
	object(t2).assign(c,null,{e:4});
	test.deepEqual(t1,t2,
		"assign() when Object.assign is defined works"
	);
	t2=object(testObject).clone();
	Object.assign=false;
	object(t2).assign(c,null,{e:4});
	test.deepEqual(t1,t2,
		"assign() without  Object.assign uses correct polyfill even with shadowed hasOwnProperty and enumerable prototype keys"
	);
	var err=false;
	try{
		object().assign(null,{e:4});
		
	}catch(error){
		err=error;
	}
	test.ok(!!err&&err.constructor.name==="TypeError"&&err.message==='Cannot convert undefined or null to object',
		"assign() gives an error when source-object is null or undefined"
	);
	test.end();
});
