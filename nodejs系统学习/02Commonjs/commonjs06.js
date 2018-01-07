
//var bar=require('bar/bar.js');
var nav=require('nav');

//nav 在根目录不存在，去node_modules ，找到了nav文件夹。 
//nav文件夹下面有package.json ，

//找 package.json 入口文件 "main": "nav.js",

console.log(nav.str);

//npm 安装的模块就是这样引入的。

//package.json      npm init  --yse       进入这个目录运行这个命令



