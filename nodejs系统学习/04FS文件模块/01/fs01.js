/*
 1. fs.stat  检测是文件还是目录
 2. fs.mkdir  创建目录
 3. fs.writeFile  创建写入文件
 4. fs.appendFile 追加文件
 5.fs.readFile 读取文件
 6.fs.readdir读取目录
 7.fs.rename 重命名
 8. fs.rmdir  删除目录
 9. fs.unlink删除文件
*/

var fs=require('fs');
//1. fs.stat  检测是文件还是目录
// fs.stat('html',function(err,stats){
//    if(err){
//      console.log(err);
//      return false;
//    }
//    console.log('文件：'+stats.isFile()); // false
//    console.log('目录：'+stats.isDirectory()); // true
// })
// fs.stat('index.txt',function(err,stats){
//   if(err){
//    console.log(err);
//    return false;
//   }
//   console.log('文件：'+stats.isFile());
//   console.log('目录：'+stats.isDirectory());
// })


//2. fs.mkdir  创建目录

  //接收参数：
  //path            将创建的目录路径
  //mode          目录权限（读写权限），默认0777
  //callback      回调，传递异常参数err

fs.mkdir('css',function(err){
   if(err){
    console.log(err);
    return false;
   }
   console.log('创建目录成功');
})

//3. fs.writeFile  创建写入文件（如果文件存在 ，直接写入，如果文件有内容会覆盖，没有没有文件，会自动创建文件再追加）

//filename      (String)            文件名称
//data        (String | Buffer)    将要写入的内容，可以使字符串 或 buffer数据。
//options        (Object)           option数组对象，包含：
//· encoding   (string)            可选值，默认 ‘utf8′，当data使buffer时，该值应该为 ignored。
//· mode         (Number)        文件读写权限，默认值 438
//· flag            (String)            默认值 ‘w'
//callback {Function}  回调，传递一个异常参数err。

//fs.writeFile('t.txt','你好nodejs 覆盖','utf8',function(err){
//   if(err){
//    console.log(err);
//    return false;
//   }
//  console.log('写入成功');
//})

//4. fs.appendFile 追加文件
//
//fs.appendFile('t1.txt','这是写入的内容',function(err){
//   if(err){
//    console.log(err);
//    return false;
//   }
//  console.log('写入成功');
//})

//fs.appendFile('t1.txt','这是写入的内容111\n',function(err){
// if(err){
//  console.log(err);
//  return false;
// }
// console.log('写入成功');
//})


//5.fs.readFile 读取文件
//
//fs.readFile('t1.txt',function(err,data){
//   if(err){
//    console.log(err);
//    return false;
//   }
//   //console.log(data);
//   console.log(data.toString());
//
//})


//6.fs.readdir读取目录  把目录下面的文件和文件夹都获取到。

//fs.readdir('html',function(err,data){
//    if(err){
//     console.log(err);
//     return false;
//   }
//   console.log(data);
//})


//拿到一个文件夹下面的所有目录

//7.fs.rename 重命名
//1.改名  2.剪切文件

//fs.rename('html/index.html','html/news.html',function(err){
//    if(err){
//     console.log(err);
//     return false;
//   }
//   console.log('修改名字成功');
//})


//fs.rename('html/css/basic.css','html/style.css',function(err){
//     if(err){
//      console.log(err);
//      return false;
//    }
//    console.log('剪切成功');
//})


//8. fs.rmdir  删除目录

//fs.rmdir('t',function(err){
//      if(err){
//       console.log(err);
//       return false;
//     }
//    console.log('删除目录成功');
//})

// ENOENT: no such file or directory, rmdir      rmdir 这个方法只能删除目录
//fs.rmdir('index.txt',function(err){
//      if(err){
//       console.log(err);
//       return false;
//     }
//    console.log('删除目录成功');
//})


//9. fs.unlink删除文件

// fs.unlink('index.txt',function(err){
//    if(err){
//      console.log(err);
//      return false;
//    }
//    console.log('删除文件成功');
// })
