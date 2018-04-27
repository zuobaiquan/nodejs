/*
1.需要安装 express-session 和 connect-mongo 模块
 cnpm install express-session  --save
 cnpm install connect-mongo  --save

2.引入
 var session = require("express-session");
 var  MongoStore  = require("connect-mongo")(session);

3.设置官方文档提供的中间件
 app.use(session({
 	secret: 'keyboard cat',
	 resave: false,
	 saveUninitialized: true,
	 store:new MongoStore({
		 url: 'mongodb://127.0.0.1:27017/student',数据库的地址
	 	 touchAfter: 24 * 3600   time period in seconds
	 })
 }))

4.使用
 设置值
 req.session.username = "张三";
 获取值 req.session.username
*/

var express = require("express");
var app = express();
var session = require("express-session");
var  MongoStore  = require("connect-mongo")(session);

//配置中间件
app.use(session({
	secret: 'this is string key',   // 可以随便写。 一个 String 类型的字符串，作为服务器端生成 session 的签名
	name:'session_id',/*保存在本地cookie的一个名字 默认connect.sid  可以不设置*/
	resave: false,   /*强制保存 session 即使它并没有变化,。默认为 true。建议设置成 false。*/
	saveUninitialized: true,   //强制将未初始化的 session 存储。  默认值是true  建议设置成true
	cookie: {
		maxAge:1000*30*60    /*过期时间*/
	},   /*secure https这样的情况才可以访问cookie*/
	rolling:true,//在每次请求时强行设置 cookie，这将重置 cookie 过期时间（默认：false）
	store:new MongoStore({
		url: 'mongodb://127.0.0.1:27017/shop',  //数据库的地址
		touchAfter: 24 * 3600   //time period in seconds  通过这样做，设置touchAfter:24 * 3600，您在24小时内只更新一次会话，不管有多少请求(除了在会话数据上更改某些内容的除外)
	})
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
	req.session.userinfo='张三222';
	res.send('登录成功');
});

app.get("/loginOut",function(req,res){
	//req.session.cookie.maxAge=0;  /*改变cookie的过期时间*/
  //销毁
	req.session.destroy(function(err){
		console.log(err);
	})
	res.send('退出登录成功');
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
