var express  = require('express');
var cookieParser = require('cookie-parser');
var app = express();
app.use(cookieParser());

app.get("/",function(req,res){
  res.send("您浏览过的城市-"+req.cookies.citys);
});

/*您浏览过的城市  /lvyou?city=北京  /lvyou?city=上海    /lvyou?city=杭州    /lvyou?city=重庆 */
app.get("/lvyou",function(req,res){
  //写入数据要做判断
  var city=req.query.city;  /*获取当前城市*/
  var citys=req.cookies.citys;  /*数组  获取所有的城市*/
  if(citys){
    citys.push(city)
  }else{
    citys=[];  /*没有浏览过任何城市的话 citys改为数组 */
    citys.push(city)
  }
  res.cookie('citys',citys,{maxAge:60*1000*10});
  res.send("您浏览的城市是"+city);
});
app.listen(3001);
