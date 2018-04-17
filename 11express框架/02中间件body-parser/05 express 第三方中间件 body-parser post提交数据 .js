/*

 body-parser 中间件 第三方的 获取 post 提交的数据   (模块)
 1.cnpm install body-parser --save
 2.var bodyParser = require('body-parser')
 3.设置中间件

//parse application/x-www-form-urlencoded
  app.use(bodyParser.urlencoded({ extended: false }))

//parse application/json
  app.use(bodyParser.json())

 4.req.body 获取数据

*/

var express=require('express');
var bodyParser = require('body-parser');
var app=new express();

//配置body-parser中间件
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json());

//ejs
app.set('view engine','ejs');

app.get('/',function(req,res){
  res.send('你好express');
})

app.get('/login',function(req,res){
  res.render('login');
})

app.post('/doLogin',function(req,res){
  console.log(req.body);   /*获取post提交的数据*/
})

app.listen(3002,'127.0.0.1');
