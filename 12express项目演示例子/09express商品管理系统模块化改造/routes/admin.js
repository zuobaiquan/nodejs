/**
 * Created by Administrator on 2017/8/18 0018.
 */
var express=require('express');

var router = express.Router();   /*可使用 express.Router 类创建模块化、可挂载的路由句柄*/
//后台的路由  所有的后台处理都要经过这里

var login=require('./admin/login.js');
var product=require('./admin/product.js');
var user=require('./admin/user.js');

/*权限判断*/
router.use(function(req,res,next){
    console.log(req.url);
    //next();
    if(req.url=='/login' || req.url=='/login/doLogin'){
        next();

    }else{

        if(req.session.userinfo&&req.session.userinfo.username!=''){   /*判断有没有登录*/

            //app.locals  全局
            //
            //req.app.locals  /*请求的全局*/


            req.app.locals['userinfo']=req.session.userinfo;   /*配置全局变量  可以在任何模板里面使用*/
            next();
        }else{
            res.redirect('/admin/login')
        }
    }

})

//配置路由

router.use('/login',login);
router.use('/product',product);
router.use('/user',user);




module.exports = router;   /*暴露这个 router模块*/