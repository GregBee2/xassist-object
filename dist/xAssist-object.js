// https://github.com/GregBee2/xassist-object#readme Version 0.0.18.
// Copyright 2018 undefined.
// Created on Sat, 10 Mar 2018 19:13:32 GMT.
(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
	typeof define === 'function' && define.amd ? define(['exports'], factory) :
	(factory((global.xa = global.xa || {})));
}(this, (function (exports) { 'use strict';

function object(obj){
	var eventHelper={};
	function _getType(value){
		return typeof value;
	}	function _transformType(type,value){
		if(type==="boolean"){
			return !!value;
		}
		if(type==="number"){
			return Number(value);
		}
		if(type==="string"){
			return String(value);
		}
		return value;
	}	function onChange(key,fn,thisArg){
		var newWatch=false;		if(!key || !obj.hasOwnProperty(key)){
			throw new ReferenceError('key does not exist in Object');
		}
		if(!eventHelper.hasOwnProperty(key)){
			eventHelper[key]={
				currentValue:obj[key],
				callback:[],
				thisArg:[]
			};
			newWatch=true;
		}
		eventHelper[key].callback.push(fn);
		eventHelper[key].thisArg.push(thisArg);
		if (newWatch){
			Object.defineProperty(obj,key,{
				set:function(value){
					var oldValue=eventHelper[key].currentValue;
					eventHelper[key].currentValue=value;
					if(value!==oldValue){
						for (var i=0,len=eventHelper[key].callback.length;i<len;i++){
							eventHelper[key].callback[i].call(eventHelper[key].thisArg[i]||obj, value, oldValue,key, obj); 
						}
					}
				},
				get:function(){
					return eventHelper[key].currentValue;
				}
			});
		}
	}	function assign(varArgs) { // .length of function is 2
		if(typeof Object.assign === 'function'){
			return Object.assign.apply(null,[obj].concat(Array.prototype.slice.call(arguments)));
		}
		if (obj == null) { // TypeError if undefined or null
			throw new TypeError('Cannot convert undefined or null to object');
		}
		var to = Object(obj);
		for (var index = 0; index < arguments.length; index++) {
			var nextSource = arguments[index];
			if (nextSource != null) { // Skip over if undefined or null
				for (var nextKey in nextSource) {
					// Avoid bugs when hasOwnProperty is shadowed
					if (Object.prototype.hasOwnProperty.call(nextSource, nextKey)) {
						to[nextKey] = nextSource[nextKey];
					}
				}
			}
		}
		return to;
	}
	function clone(){return JSON.parse(JSON.stringify( obj ));}
	function mergeUnique(source){
		//copies only existing key in obj from source to obj
		//problems may arise with objects, dates, arrays, ... for now Strings, numbers, 
		if (source != null) { // Skip over if undefined or null
			Object.keys(obj).forEach(function(targetKey){
				if(source.hasOwnProperty(targetKey)){
					obj[targetKey] = _transformType(_getType(obj[targetKey]),source[targetKey]);
				}
			});
		}
		return obj;
	}
	function toArray(){
		return Object.keys(obj).map(function(property_name){ 
			return obj[property_name]; 
		});
	}
	function toMapArray(){
		return Object.keys(obj).map(function(property_name){ 
			return [property_name,obj[property_name]]; 
		});
	}
	function forEach(fn,thisArg){
		if(!thisArg){
			thisArg=obj;
		}
		return Object.keys(obj).forEach(function(property_name){ 
			fn.call(thisArg, obj[property_name], property_name, obj); 
		},thisArg);
	}
	function map(fn,thisArg){
		if(!thisArg){
			thisArg=obj;
		}
		var newObject={};
		Object.keys(obj).forEach(function(property_name){ 
			newObject[property_name]=fn.call(thisArg, obj[property_name], property_name, obj); 
		},thisArg);
		return newObject;
	}
	return {
		clone:clone,
		mergeUnique:mergeUnique,
		toArray:toArray,
		toMapArray:toMapArray,
		forEach:forEach,
		map:map,
		assign:assign,
		onChange:onChange
	}
}

exports.object = object;

Object.defineProperty(exports, '__esModule', { value: true });

})));
