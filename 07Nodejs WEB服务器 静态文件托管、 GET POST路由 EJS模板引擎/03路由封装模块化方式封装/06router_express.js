/**
 * Created by Administrator on 2017/7/8 0008.
 */
var http=require('http');

var url=require('url');
var G={};

//定义方法开始结束
var app=function(req,res){
    //console.log('app'+req);

    var pathname=url.parse(req.url).pathname;

    if(!pathname.endsWith('/')){

        pathname=pathname+'/';
    }

    if(G[pathname]){
        G[pathname](req,res);  /*执行注册的方法*/
    }else{

        res.end('no router');
    }
}

//定义一个get方法
app.get=function(string,callback){


    if(!string.endsWith('/')){
        string=string+'/';

    }
    if(!string.startsWith('/')){
        string='/'+string;

    }

    //    /login/
    G[string]=callback;

    //注册方法
    //G['login']=function(req,res){
    //
    //}
}



//只有有请求 就会触发app这个方法
http.createServer(app).listen(3000);

//注册login这个路由（方法）
app.get('login',function(req,res){

        console.log('login');
        res.end('login');
})

app.get('register',function(req,res){

    console.log('register');
    res.end('register');
})


