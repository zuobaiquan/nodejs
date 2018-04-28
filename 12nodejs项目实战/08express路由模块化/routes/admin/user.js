
var express=require('express');

var router = express.Router();   /*可使用 express.Router 类创建模块化、可挂载的路由句柄*/

router.get('/',function(req,res){
    res.send('显示用户首页');

})
//处理登录的业务逻辑
router.get('/add',function(req,res){
    res.send('显示增加用户');

})


module.exports = router;   /*暴露这个 router模块*/