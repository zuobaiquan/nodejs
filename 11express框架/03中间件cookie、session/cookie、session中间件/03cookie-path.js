/*
 path  表示在哪个路由下面可以访问cookie
 httpOnly:true 设置为true,表示只有在nodejs服务端可以操作cookie ，没法用js脚本语言操作cookie
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
    res.cookie('userinfo','cookie111',{maxAge:600000,path:'/news',httpOnly:true});
    res.send("设置cookie成功");
});

app.listen(3001,'127.0.0.1');
