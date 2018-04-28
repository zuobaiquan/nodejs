/**
 * Created by Administrator on 2017/8/18 0018.
 */
var express=require('express');

var router = express.Router();   /*可使用 express.Router 类创建模块化、可挂载的路由句柄*/
//后台的路由  所有的后台处理都要经过这里

var login=require('./admin/login.js');
var product=require('./admin/product.js');
var user=require('./admin/user.js');

//配置路由

router.use('/login',login);
router.use('/product',product);
router.use('/user',user);




module.exports = router;   /*暴露这个 router模块*/