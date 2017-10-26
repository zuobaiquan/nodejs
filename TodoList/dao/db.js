/**
 * Created by lenovo on 2017/7/13.
 */

var mongoose=require("mongoose");

mongoose.connect('mongodb://127.0.0.1:27017/todoList',{useMongoClient: true});//连接数据库

var connection=mongoose.connection;
connection.on('error',function(err){
    if(err){
        console.log(err);
    }
});
connection.on('open',function(){
    console.log('opened');
});

//////////////////////////////////// 用户登录注册   ///////////////////////////////////////////////
//schema 骨架(静态的)
var userSchema=new mongoose.Schema({
    userName:String,
    passWord:String,
    email:String,
    avatar:{type: String, default:'default_avatar_2.png'}
});

//模型
var userModel=mongoose.model('user',userSchema);

exports.getUserInfo=function (userName,callback) {
    // userModel.find({userName:userName},function (err, doc) {
    //     if (err){
    //         callback(err);
    //     }else{
    //         callback(null,doc);
    //     }
    // });
    userModel.findOne({userName: userName}, function (err, doc) {
        if(err){
            callback(err);
        }else {
            callback(null, doc);
        }

    });
}

function addUserInfo(userInfoTemp,callback){
    var userTemp=new userModel(userInfoTemp);
    userTemp.save(function (err, doc) {
        if(err){
            callback(err);
        }else {
            callback(null,doc);
        }
    });
};
exports.addUserInfo = addUserInfo;
// var user = {
//     userName:'wukong',
//     passWord:'123',
//     email:'792638895@qq.com'
// };
//
//
// addUserInfo(user,function (err, doc) {
//     console.log(user);
// });


/////////////////////////////////////// 待办事宜列表  /////////////////////////////////////////////


//schema 骨架(静态的)
var itemSchema=new mongoose.Schema({
    userId:String,
    title:String,
    postDate:Date,
    finishState:{type:Number,default:1}//1是未完成，2是已完成   用Number类型的就是为了以后好扩展
});

//模型
var itemModel=mongoose.model('item',itemSchema);

//添加待办事宜
function addItem(itemInfo,callback) {
    var itemTemp=new itemModel(itemInfo);
    itemTemp.save(function (err, doc) {
        if(err){
            callback(err);
        }else {
            callback(null,doc);
        }
    });
}

//查找事宜列表
function findItem(userId,callback) {
    itemModel.find({userId:userId},{},function (err, doc) {
    if(err){
        callback(err);
    }else{
        //console.log(doc);
        callback(null,doc);
    }
});
}

//修改待办事宜
function updateItem(itemInfo,callback) {
    itemModel.findById(itemInfo.itemId,function (err, doc) {
        if(err){
            callback(err);
        }else{
            doc.finishState = itemInfo.finishState;//修改完成
            //保存
            doc.save(function (err, doc) {
                if (err){
                    callback(err);
                }else{
                    callback(null,doc);
                }
            });
        }
    })
}

//删除待办事宜
function deleteItem(itemId,callback) {
    itemModel.findById(itemId,function (err, doc) {
        if(err){
            callback(err);
        }else{
            //删除
            doc.remove(function (err, doc) {
                if (err){
                    callback(err);
                }else{
                    callback(null,doc);
                }
            });
        }
    })
}

//找到待修改的事宜
function findItemById(itemId,callback) {
    itemModel.findById(itemId,function (err, doc) {
        if(err){
            callback(err);
        }else{
            callback(null,doc);
        }
    })
}

function updateTitle(itemInfo,callback) {
    itemModel.findById(itemInfo.itemId,function (err, doc) {
        if(err){
            callback(err);
        }else{
            doc.title = itemInfo.title;//修改完成
            //保存
            doc.save(function (err, doc) {
                if (err){
                    callback(err);
                }else{
                    callback(null,doc);
                }
            });
        }
    })
}

exports.addItem = addItem;
exports.findItem = findItem;
exports.updateItem = updateItem;
exports.deleteItem = deleteItem;
exports.findItemById = findItemById;
exports.updateTitle = updateTitle;

////////////////////////////////// 显示上传的头像  ///////////////////////////////////////
//修改上传的头像名字
function updateAvatar(userId, fileName,callback){
    userModel.findById(userId,function (err, doc) {
        if(err){
            callback(err);
        }else{
            doc.avatar = fileName;//修改完成
            //保存
            doc.save(function (err, doc) {
                if (err){
                    callback(err);
                }else{
                    callback(null,doc);
                }
            });
        }
    })
}
exports.updateAvatar = updateAvatar;