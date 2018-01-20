var fs=require('fs');
var path=require('path');
var url=require('url');

//获取文件类型的方法
function getMime(extname,callback){
  fs.readFile('./mime.json',function(err,data){
    if(err){
      console.log('mime.json文件不存在');
      return false;
    }
    //console.log(data.toString());
    var Mimes=JSON.parse(data.toString());
    var result= Mimes[extname] || 'text/html';
    callback(result)
  })
}


exports.statics=function(req,res,staticpath){
  var pathname=url.parse(req.url).pathname;
  if(pathname=='/'){
    pathname='/index.html';
  }
  var extname=path.extname(pathname);
  if(pathname!='/favicon.ico'){
    fs.readFile(staticpath+'/'+pathname,function(err,data){
      if(err){
        console.log('404');
        fs.readFile(staticpath+'/404.html',function(error,data404){
          if(error){
            console.log(error);
          }
          res.writeHead(404,{"Content-Type":"text/html;charset='utf-8'"});
          res.write(data404);
          res.end();
        })
      }else{
       getMime(extname,function(mime){
          res.writeHead(200,{"Content-Type":""+mime+";charset='utf-8'"});
          res.write(data);
          res.end();
        });
      }
    })
  }
}
