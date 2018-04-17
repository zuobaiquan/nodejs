var express=require('express');
var app=new express();
app.get('/',function(req,res){
    res.send('你好express');
})
app.get('/news',function(req,res){
    res.send('news模块');
})
app.get('/login',function(req,res){
    res.send('登录模块');
})
app.get('/register',function(req,res){
    res.send('注册模块');
})
//post
//app.post('/dologin',function(req,res){
//
//})

//动态路由
app.get('/newscontent/:aid',function(req,res){
    //req.params 获取动态路由的传值
    console.log(req.params);
    var aid=req.params.aid;
    res.send('newscontent模块--'+aid);
})
app.listen(3000,'127.0.0.1');
