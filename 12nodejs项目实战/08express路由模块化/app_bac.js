//安装express

//安装ejs


//https://docs.mongodb.com/getting-started/node/query/

//图片上传插件的使用

/*
 1.npm install multiparty


 2.var multiparty = require('multiparty');



 3.上传图片的地方

 var form = new multiparty.Form();

 form.uploadDir='upload'   上传图片保存的地址

 form.parse(req, function(err, fields, files) {

 //获取提交的数据以及图片上传成功返回的图片信息

 });

 4.html页面form 表单要加入 enctype="multipart/form-data"



 * */

var express=require('express');

var app=new express();  /*实例化*/
var md5=require('md5-node'); /*md5加密*/
//获取post

var multiparty = require('multiparty');  /*图片上传模块  即可以获取form表单的数据 也可以实现上传图片*/


var  fs=require('fs');
//数据库操作
var DB=require('./modules/db.js');

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

//   upload/Aj8HIYV_EqbkNdCNwkYJiL33.jpg

//  Aj8HIYV_EqbkNdCNwkYJiL33.jpg
app.use('/upload',express.static('upload'));


//ejs中 设置全局数据   所有的页面都可以使用
//app.locals['userinfo']='1213'
//app.locals['userinfo']='111111';
//自定义中间件  判断登录状态

//app.use(function(req,res,next){
//    //console.log(req.url);
//    //next();
//    if(req.url=='/login' || req.url=='/doLogin'){
//        next();
//
//    }else{
//
//        if(req.session.userinfo&&req.session.userinfo.username!=''){   /*判断有没有登录*/
//
//            app.locals['userinfo']=req.session.userinfo;   /*配置全局变量  可以在任何模板里面使用*/
//            next();
//        }else{
//            res.redirect('/login')
//        }
//    }
//
//})

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
    //console.log(req.body);    /*获取post提交的数据*/

    //req.body ={ username: 'admin', password: '123456' }


    var username=req.body.username;
    var password=md5(req.body.password);  /*要对用户输入的密码加密*/

    //1.获取数据
    //2.连接数据库查询数据
    DB.find('user',{
        username:username,
        password:password
    },function(err,data){
        if(data.length>0){
            console.log('登录成功');
            //保存用户信息
            req.session.userinfo=data[0];
            res.redirect('/product');  /*登录成功跳转到商品列表*/
        }else{
            //console.log('登录失败');
            res.send("<script>alert('登录失败');location.href='/login'</script>");
        }
    })



})


//商品列表
app.get('/product',function(req,res){

    DB.find('product',{},function(err,data){

        res.render('product',{

            list:data
        });
    })

})
//显示增加商品的页面
app.get('/productadd',function(req,res){
    res.render('productadd');

})

//获取表单提交的数据 以及post过来的图片


app.post('/doProductAdd',function(req,res){

    //获取表单的数据 以及post过来的图片

    var form = new multiparty.Form();

    form.uploadDir='upload'   //上传图片保存的地址     目录必须存在

    form.parse(req, function(err, fields, files) {

        //获取提交的数据以及图片上传成功返回的图片信息
        //
        //console.log(fields);  /*获取表单的数据*/
        //
        //console.log(files);  /*图片上传成功返回的信息*/
        var title=fields.title[0];
        var price=fields.price[0];
        var fee=fields.fee[0];
        var description=fields.description[0];
        var pic=files.pic[0].path;
        //console.log(pic);

        DB.insert('product',{
            title:title,
            price:price,
            fee,
            description,
            pic

        },function(err,data){
            if(!err){
                res.redirect('/product'); /*上传成功跳转到首页*/
            }

        })




    });


})

app.get('/productedit',function(req,res){


    //获取get传值 id

    var id=req.query.id;

    console.log(id);

    //去数据库查询这个id对应的数据     自增长的id 要用{"_id":new DB.ObjectID(id)

    DB.find('product',{"_id":new DB.ObjectID(id)},function(err,data){

        //console.log(data);

        res.render('productedit',{
            list:data[0]
        });
    });


})

//执行修改的路由
app.post('/doProductEdit',function(req,res){
    var form = new multiparty.Form();

    form.uploadDir='upload'  // 上传图片保存的地址

    form.parse(req, function(err, fields, files) {

        //获取提交的数据以及图片上传成功返回的图片信息

        //console.log(fields);
        console.log(files);

        var _id=fields._id[0];   /*修改的条件*/
        var title=fields.title[0];
        var price=fields.price[0];
        var fee=fields.fee[0];
        var description=fields.description[0];


        var originalFilename=files.pic[0].originalFilename;
        var pic=files.pic[0].path;

        if(originalFilename){  /*修改了图片*/
            var setData={
                title,
                price,
                fee,
                description,
                pic
            };
        }else{ /*没有修改图片*/
            var setData={
                title,
                price,
                fee,
                description
            };
            //删除生成的临时文件
            fs.unlink(pic);

        }

        DB.update('product',{"_id":new DB.ObjectID(_id)},setData,function(err,data){

            if(!err){
                res.redirect('/product');
            }

        })



    });



})
//删除商品
app.get('/productdelete',function(req,res){

    //获取id

    var  id=req.query.id;

    DB.deleteOne('product',{"_id":new DB.ObjectID(id)},function(err){

        if(!err){

            res.redirect('/product');
        }

    })
    //res.send('productdelete');



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


//删除数据
app.get('/delete',function(req,res){

    DB.deleteOne('product',{"title":"iphone4"},function(error,data){
        if(!error){

            res.send('删除数据成功');
        }
    })
})

app.listen(3004,'127.0.0.1');

