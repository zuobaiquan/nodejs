
var http=require('http');
var url=require('url');

//2.用http模块创建服务
/*
 req获取url信息   （request）
 res 浏览器返回响应信息 （response）
*/

http.createServer(function(req,res){
    //输入http://localhost:8003?name=zuobaiquan   拿到 name
    //输入http://localhost:8003?name=zuobaiquan&age=23   拿到 name 和 age
    //req.url  获取浏览器url输入的信息
    var query=url.parse(req.url,true);
    console.log("======",req.url,query);

    res.writeHead(200, {"Content-Type": "text/html;charset=utf-8"}); 

    if(req.url!='/favicon.ico'){
        //http://localhost:8003?name=zuobaiquan
        //console.log(req.url);  //返回  ?name=zuobaiquan
        //第一个参数是地址 ,第二个参数是true的话表示把get传值转换成对象
        var result=url.parse(req.url,true); //url.parse()   解析URL 
        console.log(1111,result); 
        console.log('name='+result.query.name);  /*获取url的get传值*/
        console.log('age='+result.query.age);
    }
    res.write('你好，nodejs');
    res.end(); /*结束响应*/
}).listen(8003);
console.log("open in browser http://localhost:8003");

//执行 node url.js
//supervisor改代码自动重启web服务
//执行 supervisor url.js  支持调试
