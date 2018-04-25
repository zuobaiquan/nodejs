/**
 * Created by Administrator on 2017/8/18 0018.
 */
var express=require('express');

var router = express.Router();   /*可使用 express.Router 类创建模块化、可挂载的路由句柄*/

router.get('/',function(req,res){
    res.send('显示商品首页');

})
//处理登录的业务逻辑
router.get('/add',function(req,res){
    res.send('显示商品 增加111');

})
router.get('/edit',function(req,res){
    res.send('显示商品 修改');

})
router.get('/delete',function(req,res){
    res.send('显示商品 删除');

})

module.exports = router;   /*暴露这个 router模块*/