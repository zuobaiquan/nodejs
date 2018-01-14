var http=require('http');
var fs=require('fs');
var path=require('path');
var url=require('url');

var mimeModel=require('./model/getmimefromfile.js');
//获取文件类型
console.log(mimeModel.getMime(fs, '.css'));
