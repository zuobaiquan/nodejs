var express = require("express");
var app = express();
var session = require("express-session");

//配置中间件
app.use(session({
	secret: 'this is string key',   // 可以随便写。 一个 String 类型的字符串，作为服务器端生成 session 的签名
	name:'session_id',/*保存在本地cookie的一个名字 默认connect.sid  可以不设置*/
  resave: false,   /*强制保存 session 即使它并没有变化,。默认为 true。建议设置成 false。*/
	saveUninitialized: true,   //强制将未初始化的 session 存储。  默认值是true  建议设置成true
	cookie: {
		maxAge:5000    /*过期时间*/
	}, /*secure https这样的情况才可以访问cookie*/
	//设置过期时间比如是30分钟，只要游览页面，30分钟没有操作的话在过期
	rolling:true //在每次请求时强行设置 cookie，这将重置 cookie 过期时间（默认：false）
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

app.get("/news",function(req,res){
	//获取sesssion
	if(req.session.userinfo){  /*获取*/
		res.send('你好'+req.session.userinfo+'欢迎回来 news');
	}else{
		res.send('未登录 news');
	}
});
app.listen(3000);
