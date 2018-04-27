/*
baidu.com  域名

news.baidu.com
www.baidu.com

aaa.com

news.aaa.com

www.aaa.com

//domain:'.aaa.com' 多个二级域名共享cookie

*/
var express  = require('express');
var cookieParser = require('cookie-parser');
var app = express();
app.use(cookieParser());

app.get("/",function(req,res){
    console.log(req.cookies);
    res.send("你好nodejs");
});

app.get("/news",function(req,res){
    console.log(req.cookies);
    res.send("你好nodejs  news");
});

app.get("/set",function(req,res){
    //参数1：名字
    //参数2:cookie的值
    //参数3：cookie的配置信息
    res.cookie('username','cookie的值111',{maxAge:600000,domain:'.aaa.com'});
    res.send("设置cookie成功");
});
app.listen(3001,'127.0.0.1');
