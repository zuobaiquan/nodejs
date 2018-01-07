
//var bar=require('bar/bar.js');
var bar=require('bar/bar');

/*bar默认在目录下面没有，没有的话nodejs会在node_modules里面找这个模块 */

console.log(bar.str);

//想实现  直接通过  var bar=require('bar');