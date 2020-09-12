// 引入fs文件处理模块
var fs = require("fs");
var path = require("path");
var filePath = "./folder";
var keyWord = "index副本copby";
findFolder(filePath);

function findFolder(filePath) {
  fs.readdir(filePath, function (err, files) {
    if (err) {
      console.warn(err);
    } else {
      //遍历读取到的文件列表
      files.forEach(function (filename) {
        //获取当前文件的绝对路径
        var filedir = path.join(filePath, filename);
        hanlderFolder(filedir);
      });
    }
  });
}

function hanlderFolder(filedir) {
  var stat = fs.lstatSync(filedir);
  if (stat.isDirectory()) {
    fs.readdir(filedir, function (err, files) {
      // files是名称数组
      files.forEach(function (filename) {
        var childPath = path.join(filedir, filename)
        var statchild = fs.lstatSync(childPath);
        if (statchild.isDirectory()) {
          hanlderFolder(childPath)
        }else{
          reNameFile(filedir, filename);
        }
      });
    });
  } else {
    reNameFile(filedir);
  }
}

function reNameFile(filedir, filename = "") {
  var oldPath = filedir;
  if (String(filename)) {
    oldPath = filedir + "/" + filename;
  }
  newPath = oldPath.replace(new RegExp(keyWord, "g"), "");
  if (!String(newPath).substr(newPath.lastIndexOf("."), String(path.extname(newPath)).length)){
    console.log(filename + '替换失败!')
  } else if (!filename){
    return 
  }else{
    // fs.rename(oldPath, newPath, callback)
    fs.rename(oldPath, newPath, function (err) {
      if (!err) {
        console.log(filename + '替换成功!')
      }
    });
  }
  
}
