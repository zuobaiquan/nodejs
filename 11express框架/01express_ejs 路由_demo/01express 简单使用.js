/*
1.cd 到项目里面

2.npm init --yes   /   npm init  创建package.json

3.安装express
 npm install express --save

4.引入express使用
  var express=require('express');
  var app=new express()
  app.get('',function(req,res){

  })
*/

var express=require('express');/*引入*/
var app=new express();/*实例化*/
app.get('/',function(req,res){
    res.send('你好express');
})
app.get('/news',function(req,res){
    res.send('news模块');
})
app.listen(3000,'127.0.0.1');
