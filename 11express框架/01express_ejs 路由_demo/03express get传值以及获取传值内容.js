var express=require('express');
var app=new express();
app.get('/',function(req,res){
    res.send('你好express');
})

//动态路由  http://localhost:3000/newsdetail/213
app.get('/newsdetail/:newid',function(req,res){
    //req.params 获取动态路由的传值
    var newid=req.params.newid;
    res.send('返回的参数'+JSON.stringify(req.params)+'<br /> newsdetail模块--'+newid);
})

//get传值
// http://localhost:3000/product?aid=123
// http://localhost:3000/product?aid=123&cid=222
app.get('/product',function(req,res){
    //req.query获取get传值
    res.send('返回的参数'+JSON.stringify(req.query)+'<br /> product'+req.query.aid+'---'+req.query.cid);
})
app.listen(3000,'127.0.0.1');
