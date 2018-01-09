//package 安装包地址 ：https://www.npmjs.com/package/silly-datetime
//1.npm i silly-datetime

//2.引入模块
//
var sd = require('silly-datetime');
var http=require('http');
var app=http.createServer(function(req,res){
    res.writeHead(200,{"Content-Type":"text/html;charset=utf-8"});
    //var d=sd.format(new Date(), 'YYYY-MM-DD HH:mm');
    var d=sd.format(new Date(), 'YYYY-MM-DD');
    console.log(new Date());//2018-01-09T14:26:45.794Z
    res.write('你好 nodejs'+d);
    res.end();
})
app.listen(8002,'127.0.0.1');
