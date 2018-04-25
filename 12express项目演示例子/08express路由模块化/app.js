
var express=require('express');

//引入模块
var admin =require('./routes/admin.js');

var index =require('./routes/index.js')

var app=new express();  /*实例化*/



//admin
//admin/user

app.use('/',index);

/*
/admin/login

 /admin/user

* */

app.use('/admin',admin);

app.listen(3004,'127.0.0.1');

