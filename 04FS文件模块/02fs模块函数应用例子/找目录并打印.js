//找出html目录下面的所有的目录，然后打印出来
var fs=require('fs');

//错误写法
// fs.readdir('html',function(err,files){
//   if(err){
//     console.log(err);
//   }else{  /*判断是目录还是文件夹*/
//     console.log(files);  /*数组*/
//     for(var i=0;i<files.length;i++){
//       console.log(files[i]);//这里 可以打印files[i]
//       //fs.stat 里面打印不出来 file[i] ---异步
//       fs.stat(files[i],function(error,stats){  /*循环判断是目录还是文件  ---异步 错误写法*/
//          console.log(files[i]);
//       })
//     }
//
//     //正确写法 1
//     for(let i=0;i<files.length;i++){
//       console.log(files[i]);//这里 可以打印files[i]
//       //fs.stat 里面打印不出来 file[i] ---异步
//       fs.stat(files[i],function(error,stats){  /*循环判断是目录还是文件  ---异步 错误写法*/
//          console.log(files[i]);
//       })
//     }
//   }
// })

//打印出什么   3 3  3
// for(var i=0;i<3;i++){
//    setTimeout(function(){
//       console.log(i);
//    },100)
// }

//正确的写法
var filesArr=[];
fs.readdir('html',function(err,files){
   if(err){
      console.log(error);
   }else{  /*判断是目录还是文件夹*/
     //console.log(files);  /*数组*/
     (function getFile(i){
         if(i==files.length){  /*循环结束*/
           console.log('目录：');
           console.log(filesArr);   /*打印出所有的目录*/
           return false;
         }
         //files[i]  =   css  js   news.html
         //注意：目录
         fs.stat('html/'+files[i],function(error,stats){
           if(stats.isDirectory()){ /*目录*/
              filesArr.push (files[i]);  /*保存数据*/
           }
           //递归掉用
           getFile(i+1);
         })
     })(0)
   }
})
