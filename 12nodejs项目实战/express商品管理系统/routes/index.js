var express=require('express');
/*可使用 express.Router 类创建模块化、可挂载的路由句柄*/
var router = express.Router();

router.get('/',function(req,res){
    res.send('index');
})

router.get('/product',function(req,res){
    res.send('product页面');
})

module.exports = router;   /*暴露这个 router模块*/
