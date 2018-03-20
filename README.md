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

## Dependencies
- [@xassist/xassist-eventdispatcher](https://github.com/GregBee2/xassist-eventdispatcher#readme): general eventdispatcher class 
## DevDependencies
- [csv2readme](https://github.com/GregBee2/csv2readme#readme): read csv file with fixed format and parse a readme markdown file
- [rimraf](https://github.com/isaacs/rimraf#readme): A deep deletion module for node (like `rm -rf`)
- [rollup](https://github.com/rollup/rollup): Next-generation ES6 module bundler
- [tape](https://github.com/substack/tape): tap-producing test harness for node and browsers
## License

This module is licensed under the terms of [GPL-3.0](https://choosealicense.com/licenses/gpl-3.0).
