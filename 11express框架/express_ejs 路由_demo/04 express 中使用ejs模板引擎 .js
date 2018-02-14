/*
1.安装ejs   npm install ejs

2.配置express的模板引擎
   app.set("view engine","ejs");
   express 里面使用ejs 安装以后就可以用，不需要引入。

3.在express中使用ejs
  1.渲染的模板引擎
  2.数据
   res.render("news",{
      "news" : ["我是小新闻啊","我也是啊","哈哈哈哈"]
   });
*/
var express=require('express');
var app=express();
/*配置ejs模板引擎*/
app.set('view engine','ejs');
//views默认会在这个文件里面找模板
//设置模板的位置
app.set('views', __dirname + '/views');
//中间件app.use
//express.static('public')给  public目录下面的文件提供静态web服务
// http://localhost:3001/images/baidu.png
app.use(express.static('public'));
//配置虚拟目录 的静态web服务
//http://localhost:3001/static/images/baidu.png
//  images/baidu.png去public目录找这个文件，如果有就返回
app.use('/static',express.static('public'));
app.get('/',function(req,res){
    //res.send('ejs的演示');
    res.render('index');  /*ejs渲染模板*/
})
app.get('/news',function(req,res){
    //res.send('ejs的演示');
    var arr=['1111','222','3333'];
    res.render('news',{  /*数据*/
        list:arr
    });
     /*ejs渲染模板*/
})
app.listen('3001','127.0.0.1');
