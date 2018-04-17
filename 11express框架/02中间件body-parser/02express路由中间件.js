/*
  路由中间件
*/

var express=require('express');
var app=new express();

app.get('/',function(req,res){
    res.send('你好express');
})

app.get('/news',function(req,res,next){
  console.log('这是路由中间件');
  next();
})

app.get('/news',function(req,res){
  res.send('这是路由中间件news');
})

app.listen(3000,'127.0.0.1');
