//1.判断服务器上面有没有upload目录。没有创建这个目录。   （图片上传）
//要用fs目录必须得引入fs

var fs=require('fs');
fs.stat('upload',function(err,stats){
  if(err){  /*没有这个目录*/
       fs.mkdir('upload',function(error){
           if(error){
               console.log(error);
               return false;
           }
           console.log('创建成功');
       })
   }else{
       console.log('目录已经存在');
       console.log(stats.isDirectory());
   }

})
