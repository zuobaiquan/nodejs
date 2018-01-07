/**
 如果我们使用PHP来编写后端的代码时，需要Apache 或者 Nginx 的HTTP 服务器，并配上 mod_php5 模块和php-cgi，来处理客户端的请求相应。
 不过对 Node.js 来说，概念完全不一样了。使用 Node.js 时，我们不仅仅 在实现一个应用，同时还实现了整个 HTTP 服务器。
* */

//1.引入http模块
var http=require('http');

//2.用http模块创建服务
/*
 req获取url信息   （request）
 res 浏览器返回响应信息 （response）
*/

http.createServer(function(req,res){
//发送 HTTP 头部
//HTTP 状态值: 200 : OK
//设置 HTTP 头部，状态码是 200，文件类型是 html，字符集是 utf-8
    res.writeHead(200,{"Content-Type":"text/html;charset='utf-8'"});
    res.write('你好 nodejs');
    res.write('我是第一个nodejs程序');
    res.end(); /*结束响应*/
}).listen(8080);
console.log("open in browser http://localhost:8080");

//执行 node http.js
//supervisor改代码自动重启web服务
//执行 supervisor http.js  支持调试
