/*

cookie-parser可以设置和获取cookie

1.安装 cnpm install cookie-parser --save

2.引入var cookieParser = require('cookie-parser');

3.设置中间件
 app.use(cookieParser());

4.设置cookie
 res.cookie("name",'zhangsan',{maxAge: 900000, httpOnly: true});
 //HttpOnly 默认false不允许 客户端脚本访问

5.获取cookie
 req.cookies.name

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
  res.cookie('username','cookie的值',{maxAge:60000});
  res.send("设置cookie成功");
});

app.listen(3001,'127.0.0.1');
