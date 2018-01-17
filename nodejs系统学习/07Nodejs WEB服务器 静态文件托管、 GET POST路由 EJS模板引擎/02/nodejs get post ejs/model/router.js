/**
 * Created by Administrator on 2017/7/6 0006.
 */

//fs模块

var fs=require('fs');
//path模块
var path=require('path');  /*nodejs自带的模块*/
//url模块
var url=require('url');

//获取文件类型的方法  私有
function getMime(extname,callback){  /*获取后缀名的方法*/

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


    var pathname=url.parse(req.url).pathname;   /*获取url的值*/


    if(pathname=='/'){
        pathname='/index.html'; /*默认加载的首页*/
    }
    //获取文件的后缀名
    var extname=path.extname(pathname);

    if(pathname!='/favicon.ico'){  /*过滤请求favicon.ico*/
        //console.log(pathname);
        //文件操作获取 static下面的index.html

        fs.readFile(staticpath+'/'+pathname,function(err,data){

            if(err){  /*么有这个文件*/

                console.log('404');

                fs.readFile(staticpath+'/404.html',function(error,data404){
                    if(error){
                        console.log(error);
                    }
                    res.writeHead(404,{"Content-Type":"text/html;charset='utf-8'"});
                    res.write(data404);
                    res.end(); /*结束响应*/
                })

            }else{ /*返回这个文件*/

               getMime(extname,function(mime){
                    res.writeHead(200,{"Content-Type":""+mime+";charset='utf-8'"});
                    res.write(data);
                    res.end(); /*结束响应*/
                });

            }
        })

    }

}