/*
cookie-parser可以设置和获取cookie

1.安装 cnpm instlal cookie-parser --save

2.引入var cookieParser = require('cookie-parser');

3.设置中间件
 app.use(cookieParser());

4.设置cookie
 res.cookie("name",'zhangsan',{maxAge: 900000, httpOnly: true});
 //HttpOnly 默认false不允许 客户端脚本访问

5.获取cookie
 req.cookies.name


cookie保存在浏览器本地   如果没有过期的话关闭浏览器在打开cookie还是存在的

baidu.com  域名

news.baidu.com
www.baidu.com

aaa.com

news.aaa.com

www.aaa.com

 domain:'.aaa.com' 多个二级域名共享cookie

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
