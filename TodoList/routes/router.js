/**
 * Created by lenovo on 2017/7/26.
 */

var binLogic=require('../business_logic/business_logic.js');

var router= require('express').Router();

///////////////////////////////// 登录注册  //////////////////////////////////////////////////
router.get('/',binLogic.checkedLogined);
router.get('/',binLogic.redirectLogin);

//登录
router.get('/login',binLogic.checkedLogined);
//登录重定向
router.get('/login',binLogic.redirectLogin);
//post请求的 登录
router.post('/login',binLogic.postLogin);

//注册
router.get('/register',binLogic.checkedLogined);
router.get('/register',binLogic.registerLogin);
router.post('/register',binLogic.postRegister);

//登出
router.get('/logout',binLogic.logout);

////////////////////////////////  待办事宜列表  /////////////////////////////////////////////////////
//添加
router.post('/add_item',binLogic.addItemInfo);
//修改状态
router.get('/finish/:id',binLogic.updateItemInfo);
//删除
router.get('/delete/:id',binLogic.deleteItemInfo);
//获得修改页面
router.get('/edit/:id',binLogic.editItemInfo);
//提交修改post
router.post('/edit/:id',binLogic.editItemPost);


//////////////////////////////////// 上传头像 //////////////////////////////////////////////////////
router.get('/upload_avatar',binLogic.uploadAvatar);
//利用multer中间件
var multer  = require('multer');
var path = require('path');
var pathDir = path.join(__dirname, '../public/avatars');
//var upload = multer({ dest: pathDir});

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, pathDir);
    },
    filename: function (req, file, cb) {
        var userName = req.session.user.userName;
        cb(null, userName);
    }
});

var upload = multer({ storage: storage })

router.post('/upload_avatar', upload.single('avatar'), binLogic.uploadAvatarPost);

module.exports = router;

