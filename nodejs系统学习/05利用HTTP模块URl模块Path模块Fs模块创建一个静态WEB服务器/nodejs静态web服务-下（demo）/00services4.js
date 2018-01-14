
//引入http模块
var http=require('http');

//fs模块

var fs=require('fs');

//path模块
var path=require('path');  /*nodejs自带的模块*/

//url模块

var url=require('url');


var mimeModel=require('./model/getmimefromfile.js');



//console.log();   //获取文件类型

console.log(mimeModel.getMime(fs, '.css'));
