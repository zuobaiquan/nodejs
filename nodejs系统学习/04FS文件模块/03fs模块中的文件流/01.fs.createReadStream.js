const fs = require('fs')

//流的方式读取文件
//一般情况，文件比较小的时候  建议用fs.readFile 来读取，如果文件比较大，建议用文件流的形式读取
var readStream=fs.createReadStream('input.txt');

var str='';/*保存数据*/
var count=0;  /*判断读取的次数*/
//读取，是一块块的读取，每次读取一次数据广播一个 data， 通过 on来 接受这个data
readStream.on('data',function(chunk){
  str+=chunk;
  count++;
})

//读取完成
readStream.on('end',function(chunk){
  console.log(count);
  console.log(str);
})

//读取失败
readStream.on('error',function(err){
  console.log(err);
})
