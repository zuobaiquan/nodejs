/**
 * Created by Administrator on 2017/8/18 0018.
 */
var MongoClient=require('mongodb').MongoClient;

var DbUrl='mongodb://localhost:27017/productmanage';  /*连接数据库*/

var ObjectID = require('mongodb').ObjectID;


function  __connectDb(callback){


    MongoClient.connect(DbUrl,function(err,db){

        if(err){

            console.log('数据库连接失败');
            return;
        }
        //增加 修改 删除

          callback(db);


    })

}

//暴露 ObjectID


exports.ObjectID=ObjectID;

//数据库查找
/*
 Db.find('user',{},function(err,data){
    data数据
})

 */
exports.find=function(collectionname,json,callback){

    __connectDb(function(db){


        var result=db.collection(collectionname).find(json);

        result.toArray(function(error,data){

            db.close();/*关闭数据库连接*/
            callback(error,data);/*拿到数据执行回调函数*/
        })

    })

}

//增加数据
exports.insert=function(collectionname,json,callback){

    __connectDb(function(db){


        db.collection(collectionname).insertOne(json,function(error,data){

            callback(error,data);
        })
    })

}


//增加数据
exports.update=function(collectionname,json1,json2,callback){

    __connectDb(function(db){
        db.collection(collectionname).updateOne(json1,{$set:json2},function(error,data){

            callback(error,data);
        })
    })

}

//删除数据
exports.deleteOne=function(collectionname,json,callback){

    __connectDb(function(db){
        db.collection(collectionname).deleteOne(json,function(error,data){
            callback(error,data);
        })
    })

}