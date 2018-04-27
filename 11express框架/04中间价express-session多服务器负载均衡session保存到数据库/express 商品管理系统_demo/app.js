//安装express

//安装ejs

//https://docs.mongodb.com/getting-started/node/query/

var express=require('express');
var app=new express();  /*实例化*/

//获取post
var bodyParser = require('body-parser');
// 设置body-parser中间件
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
//数据库操作

var MongoClient=require('mongodb').MongoClient;

var DbUrl='mongodb://localhost:27017/productmanage';  /*连接数据库*/

//保存用户信息
var session = require("express-session");
//配置中间件  固定格式
app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
    cookie: {
        maxAge:1000*60*30
    },
    rolling:true
}))

//使用ejs模板引擎   默认找views这个目录
app.set('view engine','ejs');

//配置public目录为我们的静态资源目录

app.use(express.static('public'));

//ejs中 设置全局数据   所有的页面都可以使用
//app.locals['userinfo']='1213'
//app.locals['userinfo']='111111';

//自定义中间件  判断登录状态

app.use(function(req,res,next){
    //console.log(req.url);
    //next();
    if(req.url=='/login' || req.url=='/doLogin'){
      next();
    }else{
      if(req.session.userinfo&&req.session.userinfo.username!=''){   /*判断有没有登录*/
          app.locals['userinfo']=req.session.userinfo;   /*配置全局变量  可以在任何模板里面使用*/
          next();
      }else{
          res.redirect('/login')
      }
    }
})

app.get('/',function(req,res){
    res.send('index');
})
//登录
app.get('/login',function(req,res){
    //res.send('login');
    res.render('login');
})
//获取登录提交的数据
app.post('/doLogin',function(req,res){
    //res.send('login');
    console.log(req.body);    /*获取post提交的数据*/
    //req.body ={ username: 'admin', password: '123456' }
    //1.获取数据
    //2.连接数据库查询数据
    MongoClient.connect(DbUrl,function(err,db){
        if(err){
            console.log(err);
            return;
        }
        //查询数据  {"username":req.body.username,"password":req.body.password}
        var result=db.collection('user').find(req.body);
        //另一种遍历数据的方法
        result.toArray(function(err,data){
            console.log(data);
            if(data.length>0){
              console.log('登录成功');
              //保存用户信息
              req.session.userinfo=data[0];
              res.redirect('/product');  /*登录成功跳转到商品列表*/
            }else{
              //console.log('登录失败');
              res.send("<script>alert('登录失败');location.href='/login'</script>");
            }
            db.close();
        })
    })
})

app.get('/product',function(req,res){
    res.render('product',{

    });
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

app.get('/loginOut',function(req,res){
    //销毁session
    req.session.destroy(function(err){
        if(err){
            console.log(err);
        }else{
            res.redirect('/login');
        }
    })
})
app.listen(3003,'127.0.0.1');
