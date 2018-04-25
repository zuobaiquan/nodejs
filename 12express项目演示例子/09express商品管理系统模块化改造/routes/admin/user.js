
var express=require('express');

var router = express.Router();   /*可使用 express.Router 类创建模块化、可挂载的路由句柄*/

var DB=require('../../modules/db.js');  /*引入DB数据库*/

router.get('/',function(req,res){
    //res.send('显示用户首页');
    DB.find('user',{},function(err,data){

        res.render('admin/user/index',{
            list:data
        });
    })



})
//处理登录的业务逻辑
router.get('/add',function(req,res){
    res.send('显示增加用户');

})


module.exports = router;   /*暴露这个 router模块*/