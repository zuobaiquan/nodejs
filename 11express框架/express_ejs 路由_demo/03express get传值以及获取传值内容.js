var express=require('express');
var app=new express();
app.get('/',function(req,res){
    res.send('你好express');
})

//动态路由  http://localhost:3000/newscontent/213
app.get('/newscontent/:aid',function(req,res){
    //req.params 获取动态路由的传值
    console.log(req.params);
    var aid=req.params.aid;
    res.send('newscontent模块--'+aid);
})

//get传值
// http://localhost:3000/product?aid=123
// http://localhost:3000/product?aid=123&cid=222
app.get('/product',function(req,res){
    //req.query获取get传值
    console.log(req.query);
    res.send('product'+req.query.aid+'---'+req.query.cid);
})
app.listen(3000,'127.0.0.1');
