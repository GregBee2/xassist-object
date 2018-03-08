const definition = require("./package.json");
var endOfLine = require('os').EOL;
var bannerText="// "+(definition.homepage||definition.name)+" Version "+definition.version+"."+
	endOfLine+"// Copyright "+(new Date).getFullYear()+" "+definition.author.name+"."+
	endOfLine+"// Created on "+(new Date).toUTCString()+".";
//var ignoreUMD=endOfLine+endOfLine+"/*istanbul ignore next*/"; //ignore umd definition
var _format="umd";
import resolve from "rollup-plugin-node-resolve";
var args=process.argv
var formatArgs=["-f","--output.format"];
console.log(args)
for (let i=0,len=args.length;i<len;i++){
	for(let j=0,len2=formatArgs.length;j<len2;j++){
		if(args[i]===formatArgs[j]){
			_format=args[++i];
			break;
		}
		else if(args[i].indexOf(formatArgs[j]+"=")===0){
			_format=args[i].split("=")[1];
		}
	}
}
console.log(_format);

export default {
	input: './index.js',
	plugins:[resolve({browser:true})],
	output:{
		extend: true,
		file: definition.main,
		format: _format,
		name:'xa',
		banner:bannerText
	}	
};