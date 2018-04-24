var express=require('express');
var app=new express();

//内置中间件  托管静态页面
//http://127.0.0.1:3000/css/style.css

//css/style.css

app.use(express.static('public'));

//http://127.0.0.1:3000/static/css/style.css

app.use('/static',express.static('public'));

app.get('/',function(req,res){
  res.send('你好express');
})

app.listen(3000,'127.0.0.1');
