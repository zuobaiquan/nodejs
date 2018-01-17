
//引入http模块
var http=require('http');

var url=require('url');

var ejs=require('ejs');

var fs=require('fs');

//路由:指的就是针对不同请求的 URL，处理不同的业务逻辑。
http.createServer(function(req,res){

	res.writeHead(200,{"Content-Type":"text/html;charset='utf-8'"});


	//获取get 还是post请求


	var method=req.method.toLowerCase();
	//console.log(method);

	var pathname=url.parse(req.url,true).pathname;


	if(pathname=='/login'){  /*显示登录页面*/


		ejs.renderFile('views/form.ejs',{

		},function(err,data){


			res.end(data);

		})


	}else if(pathname=='/dologin' &&method=='get'){  /*执行登录的操作*/


		//get获取数据
		console.log(url.parse(req.url,true).query);

		res.end('dologin');



	}else if(pathname=='/dologin' &&method=='post'){  /*执行登录的操作*/


		var postStr='';
		req.on('data',function(chunk){

			postStr+=chunk;
		})
		req.on('end',function(err,chunk){

			//res.end(postStr);
			console.log(postStr);

			fs.appendFile('login.txt',postStr+'\n',function(err){

				if(err){
					console.log(err);
					return;
				}
				console.log('写入数据成功');
			})

			res.end("<script>alert('登录成功');history.back();</script>")

		})


	}else{

		ejs.renderFile('views/index.ejs',{

		},function(err,data){

			res.end(data);

		})
	}

}).listen(8001);




