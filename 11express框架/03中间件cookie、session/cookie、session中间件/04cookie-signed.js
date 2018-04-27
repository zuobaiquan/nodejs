/*
  maxAge  过期时间
  domain:'.aaa.com' 多个二级域名共享cookie
  path  表示在哪个路由下面可以访问cookie
  httpOnly:true 设置为true,表示只有在nodejs服务端可以操作cookie ，没法用js脚本语言操作cookie
  signed属性设置成true 表示加密cookie信息

让用户看不到cookie明文信息

1.保存的时候加密
2.cookie-parser里面  signed属性设置成true

cookie的加密：

1.参数表示加密的随机字符串
 app.use(cookieParser('sign'));

2.设置
 res.cookie('userinfo','cookie222_info',{maxAge:600000,signed:true});

3.使用  获取
 req.signedCookies
*/

var express  = require('express');
var cookieParser = require('cookie-parser');
var app = express();
app.use(cookieParser('sign'));

app.get("/",function(req,res){
    //console.log(req.cookies);
    console.log(req.signedCookies);   /*获取加密的cookie信息*/
    res.send("你好nodejs");
});
app.get("/set",function(req,res){
    //参数1：名字
    //参数2:cookie的值
    //参数3：cookie的配置信息
    res.cookie('userinfo','cookie222_info',{maxAge:600000,signed:true});
    res.send("设置cookie成功");
});

app.listen(3001,'127.0.0.1');
