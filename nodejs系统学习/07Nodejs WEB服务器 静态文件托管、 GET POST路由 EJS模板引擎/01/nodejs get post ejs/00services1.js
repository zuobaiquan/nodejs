
//引入http模块
var http=require('http');

//引入扩展名的方法是在文件里面获取到的。

var router=require('./model/router.js');

//console.log(mimeModel.getMime('.css'));   //获取文件类型

http.createServer(function(req,res){

	//router.statics(req,res,'static');
	console.log(req.url);


}).listen(8001);




