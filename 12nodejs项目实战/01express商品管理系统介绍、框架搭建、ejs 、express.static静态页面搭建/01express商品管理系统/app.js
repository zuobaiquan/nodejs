//安装express

//安装ejs


var express=require('express');

var app=new express();  /*实例化*/

//使用ejs模板引擎   默认找views这个目录
app.set('view engine','ejs');


//配置public目录为我们的静态资源目录

app.use(express.static('public'));


app.get('/',function(req,res){
    res.send('index');
})

//登录
app.get('/login',function(req,res){
    //res.send('login');

    res.render('login');

})

app.get('/product',function(req,res){
    res.render('product');
})


app.get('/productadd',function(req,res){
    res.render('productadd');
})

app.get('/productedit',function(req,res){
    res.render('productedit');
})

app.get('/productdelete',function(req,res){
    res.send('productdelete');
})


app.listen(3003,'127.0.0.1');

