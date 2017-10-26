/**
 * Created by lenovo on 2017/7/26.
 */

var db = require('../dao/db.js');
var path = require('path');

//检查用户是否已经登录
function checkedLogined(req,res,next) {
    /*
     if(用户已经登录过了){
     返回个性化首页
     }else {
     next();
     }
     */
    if(req.session.user){
        tempFun(req,res);//渲染个性化页面
    }else{
        next();
    }
}

//登录重定向
function redirectLogin(req, res, next) {
    //res.redirect('/login.html');//重定向
    res.render('login.ejs',{});
}

//post 登录
function postLogin(req, res, next) {
    //得到数据
    // var userName=req.query.userName;
    // var passWord=req.query.passWord;
    var userName=req.body.userName;
    var passWord=req.body.passWord;
    console.log(userName,passWord);
    //处理数据
    db.getUserInfo(userName,function (err,doc) {
        if(err){
            console.log(err);
        }else{
            //验证用户输入是否正确
            if(doc){
                if (doc.passWord===passWord){
                    req.session.user=doc;
                    //res.redirect('./item_list.html');
                    db.findItem(req.session.user._id,function (err, doc) {
                        if (err){
                            console.error(err);
                        }else{
                            //res.send(doc);
                            //res.redirect('/item_list.html');
                            var userName = req.session.user.userName;
                            var fileName = req.session.user.avatar;
                            var avatar = path.join('/', 'avatars', fileName);
                            res.render('item_list.ejs',{listData:doc,userName:userName,avatar:avatar});//渲染模板
                        }
                    });
                }else{
                    res.send("密码不正确");
                }
            }else{
                res.send("不存在此用户");
            }
        }
    });
}

//注册 重定向
function registerLogin(req, res, next) {
    //res.redirect('/register.html');//重定向
    res.render('register.ejs',{});
}

//
function postRegister(req, res, next) {
    //得到数据
    var userName = req.body.userName;
    var passWord = req.body.passWord;
    var passwordConfirm = req.body.passwordConfirm;
    var email = req.body.email;
    console.log(userName,passWord,passwordConfirm,email);
    //处理数据
    if (passWord===passwordConfirm){
        db.getUserInfo(userName,function (err, doc) {
            if(err){
                console.error(err);
                res.send('页面不存在');
            } else {
                if(null !== doc){
                    res.send('用户已经注册了， 请直接登录');
                }else{

                    var userInfoTemp = {
                        userName: userName,
                        passWord: passWord,
                        email: email
                    };
                    db.addUserInfo(userInfoTemp, function (err, doc) {
                        req.session.user=doc;
                        if(err){
                            console.error(err);
                            //res.send('404');
                            res.redirect('/404.html');
                        }else {
                            //res.send('<a href="/">已经注册成功,请返回登录</a>');//跳转链接
                            //实现停止3秒，自动跳转到登录页面
                            function fun() {
                                return res.render('login.ejs',{});
                            }
                            res.setTimeout(3000,fun);
                        }
                    });
                }
            }
        });
    }else{
        res.send("密码不相同");
    }
}

//登出
function logout(req, res, next) {
    req.session.destroy();
    res.redirect("/");

    //res.render('login.ejs',{});
}

exports.checkedLogined = checkedLogined;
exports.redirectLogin = redirectLogin;
exports.postLogin = postLogin;
exports.registerLogin = registerLogin;
exports.postRegister = postRegister;
exports.logout = logout;


//////////////////////////////////  待办事宜列表   /////////////////////////////////////////////////

//添加待办事宜数据
function addItemInfo(req, res, next) {
    //得到数据,因为是个性化的数据，所以用到了session
    var title = req.body.title;
    var userId = req.session.user._id;
    var postDate = new Date();
    var itemInfo = {
        userId:userId,
        title:title,
        postDate:postDate
    };
    //添加数据
    db.addItem(itemInfo,function (err, doc) {
        if (err){
            console.error(err);
            res.send('404');
        }else{
            //res.send('写入成功');
            tempFun(req,res);//渲染页面
        }
    });
}

//修改待办事宜状态
function updateItemInfo(req,res,next) {
    //得到数据 /finish/575721c511b6da2023bea343/?state=yes
    var itemId = req.params.id;
    var finishState = req.query.state;
    finishState = (finishState==='yes') ? 2 : 1;
    var temp = {
        itemId:itemId,
        finishState:finishState
    }
    //修改数据
    db.updateItem(temp,function (err, doc) {
        if (err){
            console.error(err);
            res.send('404');
        }else{
            //res.send('修改成功');
            tempFun(req,res);//渲染页面
        }
    })
}

//删除事情
function deleteItemInfo(req,res,next) {
    //得到要删除的数据 /delete/id
    var itemId = req.params.id;
    //删除
    db.deleteItem(itemId,function (err, doc) {
        if (err){
            console.error(err);
            res.send('404');
        }else{
            //res.send('删除成功');
            tempFun(req,res);//渲染页面
        }
    })
}

//找打待修改的事宜，渲染修改页面
function editItemInfo(req,res,next) {
    //res.redirect('/edit.html');
    var itemId = req.params.id;
    db.findItemById(itemId,function (err, doc) {
            if (err){
                console.error(err);
                res.send('404');
            }else{
                //res.send('删除成功');d
                var userName = req.session.user.userName;
                var fileName = req.session.user.avatar;
                var avatar = path.join('/', 'avatars', fileName);
                res.render('edit.ejs', {itemId: itemId, title: doc.title,userName:userName,avatar:avatar});
            }
    })
}

//提交修改
function editItemPost(req,res,next) {
    var itemId = req.params.id;
    var title = req.body.title;//注意是post请求还是get请求
    var itemTemp = {
        itemId:itemId,
        title:title,
        postDate:new Date()
    }
    db.updateTitle(itemTemp,function (err, doc) {
        if (err){
            console.error(err);
            res.send('404');
        }else{
            //res.send('删除成功');d
            tempFun(req,res);
        }
    });
}

////////////////////////////////////////上传头像///////////////////////////////////////////////
//点击上传头像显示上传头像页面,检测是否上传过头像，没上传过就用默认的
function uploadAvatar(req,res,next) {
    var userName = req.session.user.userName;
    var fileName = req.session.user.avatar;
    var avatar = path.join('/', 'avatars', fileName);
    res.render('upload_avatar.ejs',{userName:userName,avatar:avatar});
}
//上传头像
function uploadAvatarPost(req,res,next) {
   // res.send('上传成功');
    var userId = req.session.user._id;
    var fileName = req.session.user.userName;
    //修改数据库中的文件名
    db.updateAvatar(userId, fileName, function (err, doc) {
        if(err){
            console.error(err);
            res.send('404');
        }else {
            req.session.user = doc;
            //返回数据
            tempFun(req, res );
        }
    });
}




exports.addItemInfo = addItemInfo;
exports.updateItemInfo = updateItemInfo;
exports.deleteItemInfo = deleteItemInfo;
exports.editItemInfo = editItemInfo;
exports.editItemPost = editItemPost;
exports.uploadAvatar = uploadAvatar;
exports.uploadAvatarPost = uploadAvatarPost;

function tempFun(req,res) {
    console.log(req.session.user);
    db.findItem(req.session.user._id,function (err, doc) {
        if (err){
            console.error(err);
        }else{
            //res.send(doc);
            //res.redirect('/item_list.html');
            var userName = req.session.user.userName;
            var fileName = req.session.user.avatar;
            var avatar = path.join('/', 'avatars', fileName);
            res.render('item_list.ejs',{listData:doc,userName:userName,avatar:avatar});//渲染模板
        }
    });
}