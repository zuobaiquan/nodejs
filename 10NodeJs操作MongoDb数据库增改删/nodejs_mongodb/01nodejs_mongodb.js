/**
 * nodejs操作数据库的步骤

1.安装依赖
  npm install mongodb --save-dev

2.var MongoClient = require('mongodb').MongoClient;
  //连接数据库的地址
  var url = 'mongodb://localhost:27017/test';

3.连接数据库
  MongoClient.connect(url, function(err, db) {

  });

4.实现增加修改删除
 MongoClient.connect(url, function(err, db) {
    db.collection('user').insertOne({'name':'zhangsan'},function(error,data){

    })
});
 */
var http=require('http');
var ejs=require('ejs');
/*引入数据库 MongoClient*/
var MongoClient = require('mongodb').MongoClient;
// 连接数据库的地址   student表示数据库的名称
var DBurl = 'mongodb://localhost:27017/student';
var url=require('url');
var app=require('./model/express-route.js');

http.createServer(app).listen(3000);
app.get('/',function(req,res){
  res.writeHead(200,{"Content-Type":"text/html;charset='utf-8'"});
  var msg='这是数据库的数据';
  ejs.renderFile('views/index.ejs',{msg:msg},function(err,data){
    console.log(err);
    res.send(data);
  })
})


app.get('/add',function(req,res){
   //增加数据
  MongoClient.connect(DBurl,function(err,db){
    if(err){
      console.log(err);
      console.log('数据库连接失败');
      return;
    }
    //增加数据
    db.collection('user').insertOne({
      "name":"zhangsan",
      "age":10
    },function(error,result){
        res.writeHead(200,{"Content-Type":"text/html;charset=utf-8"});
        if(error){
          console.log('增加数据失败');
          return;
        }
        res.write('增加数据成功');
        res.end(); /*结束响应*/
        db.close();//关闭数据库
    })
  })
})

app.get('/edit',function(req,res){
  //res.send('修改数据成功');
  MongoClient.connect(DBurl,function(err,db){
    if(err){
      console.log(err);
      console.log('数据库连接失败');
      return;
    }
    db.collection('user').updateOne({"name":"lisi"},{$set:{
        "age":666
    }},function(error,data){
      res.writeHead(200,{"Content-Type":"text/html;charset=utf-8"});
      if(error){
        console.log('修改数据失败');
        return;
      }
      res.write('修改数据成功');
      res.end(); /*结束响应*/
      db.close();//关闭数据库
    })
  })
})

app.get('/delete',function(req,res){
  //delete?name=lisi
  //console.log(url.parse(req.url,true));
  var query=url.parse(req.url,true).query;
  //console.log(query.name);
  var name=query.name;
  console.log(name);
  MongoClient.connect(DBurl,function(err,db){
    if(err){
      //console.log(err);
      console.log('数据库连接失败');
      return;
    }
    //db.collection('user').remove({"name":name},function(error,data){
    db.collection('user').deleteOne({"name":name},function(error,data){
      if(error){
        console.log('删除失败');
        return;
      }
      res.writeHead(200,{"Content-Type":"text/html;charset=utf-8"});
      if(error){
        console.log('删除数据失败');
        return;
      }
      res.write('删除数据成功');
      res.end(); /*结束响应*/
      db.close();//关闭数据库
    })
  })
})
