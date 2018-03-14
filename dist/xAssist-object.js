/**
* @preserve
* https://github.com/GregBee2/xassist-object#readme Version 0.1.3.
*  Copyright 2018 Gregory Beirens.
*  Created on Wed, 14 Mar 2018 11:51:56 GMT.
*/
(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@xassist/xassist-eventdispatcher')) :
	typeof define === 'function' && define.amd ? define(['exports', '@xassist/xassist-eventdispatcher'], factory) :
	(factory((global.xa = global.xa || {}),global.xa));
}(this, (function (exports,xassistEventdispatcher) { 'use strict';

function object (obj) {
	return new XaObject(obj);
}
function XaObject(obj) {
	this.object = obj;
	xassistEventdispatcher.EventDispatcher.call(this, this); //containerElm=modal
	this.currentValues = {};
}
XaObject.prototype = Object.create(xassistEventdispatcher.EventDispatcher.prototype); // Here's where the inheritance occurs
XaObject.prototype.constructor = XaObject;
function _getType(value) {
	return typeof value;
}
function _transformType(type, value) {
	if (type === "boolean") {
		return !!value;
	}
	if (type === "number") {
		return Number(value);
	}
	if (type === "string") {
		return String(value);
	}
	return value;
}
XaObject.prototype.onChange = function (key, fn, thisArg) {

	var me = this,
	newWatch = false;
	if (!key || !this.object.hasOwnProperty(key)) {
		throw new ReferenceError('key does not exist in Object');
	}
	if (!this.hasEvent("changeKey" + key)) {
		this.registerEvent("changeKey" + key, this.object);
		this.currentValues[key] = this.object[key];
		newWatch = true;
	}
	xassistEventdispatcher.EventDispatcher.prototype.on.call(this, "changeKey" + key, fn, thisArg);
	if (newWatch) {
		Object.defineProperty(this.object, key, {
			set: function (value) {
				var oldValue = me.currentValues[key];
				me.currentValues[key] = value;
				if (value !== oldValue) {
					me.fire("changeKey" + key, value, oldValue, key, me.object);
				}
			},
			get: function () {
				return me.currentValues[key];
			}
		});
	}
};
XaObject.prototype.assign = function (/*varArgs*/) { // .length of function is 2
	if (typeof Object.assign === 'function') {
		return Object.assign.apply(null, [this.object].concat(Array.prototype.slice.call(arguments)));
	}
	if (this.object == null) { // TypeError if undefined or null
		throw new TypeError('Cannot convert undefined or null to object');
	}
	var to = Object(this.object);
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
};
XaObject.prototype.clone = function () {
	return JSON.parse(JSON.stringify(this.object));
};
XaObject.prototype.mergeUnique = function (source) {
	var me = this;
	//copies only existing key in obj from source to obj
	//problems may arise with objects, dates, arrays, ... for now Strings, numbers,
	if (source != null) { // Skip over if undefined or null
		Object.keys(this.object).forEach(function (targetKey) {
			if (source.hasOwnProperty(targetKey)) {
				me.object[targetKey] = _transformType(_getType(me.object[targetKey]), source[targetKey]);
			}
		});
	}
	return this.object;
};
XaObject.prototype.toArray = function () {
	var me = this;
	return Object.keys(this.object).map(function (property_name) {
		return me.object[property_name];
	});
};
XaObject.prototype.toMapArray = function () {
	var me = this;
	return Object.keys(this.object).map(function (property_name) {
		return [property_name, me.object[property_name]];
	});
};
XaObject.prototype.forEach = function (fn, thisArg) {
	var me = this;
	if (!thisArg) {
		thisArg = this.object;
	}
	return Object.keys(this.object).forEach(function (property_name) {
		fn.call(thisArg, me.object[property_name], property_name, me.object);
	}, thisArg);
};
XaObject.prototype.map = function (fn, thisArg) {
	var me = this;
	if (!thisArg) {
		thisArg = this.object;
	}
	var newObject = {};
	Object.keys(this.object).forEach(function (property_name) {
		newObject[property_name] = fn.call(thisArg, me.object[property_name], property_name, me.object);
	}, thisArg);
	return newObject;
};

exports.object = object;

Object.defineProperty(exports, '__esModule', { value: true });

})));
