/*
* 1.安装  express-session

cnpm install express-session  --save
*
*
* 2.引入

 var session = require("express-session");

 3.设置官方文档提供的中间件

 app.use(session({
	 secret: 'keyboard cat',
	 resave: false,
	 saveUninitialized: true
 }))


4.使用

设置值
 req.session.username = "张三";

获取值 req.session.username

* */

var express = require("express");
var app = express();

var session = require("express-session");

//配置中间件
app.use(session({
	secret: 'keyboard cat',
	resave: false,
	saveUninitialized: true
	//cookie: { secure: true }   /*secure https这样的情况才可以访问cookie*/
}))


app.get("/",function(req,res){

	//获取sesssion


	if(req.session.userinfo){  /*获取*/
		res.send('你好'+req.session.userinfo+'欢迎回来');

	}else{

		res.send('未登录');
	}



});

app.get("/login",function(req,res){


	req.session.userinfo="zhangsan111"; /*设置session*/
	res.send('登录成功');
});

app.get("/news",function(req,res){

	//获取sesssion


	if(req.session.userinfo){  /*获取*/
		res.send('你好'+req.session.userinfo+'欢迎回来 news');

	}else{

		res.send('未登录 news');
	}



});

app.listen(3000);