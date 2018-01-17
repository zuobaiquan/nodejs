
//引入http模块
var http=require('http');

var url=require('url');

var ejs=require('ejs');

//路由:指的就是针对不同请求的 URL，处理不同的业务逻辑。
http.createServer(function(req,res){

	res.writeHead(200,{"Content-Type":"text/html;charset='utf-8'"});


	var pathname=url.parse(req.url).pathname;

	if(pathname=='/login'){

		var data='你好我是后台数据';

		var list=[


			'1111',
			'2222',
			'3333',
		];

		//把数据库的数据渲染到模板上面
		ejs.renderFile('views/login.ejs',{
			msg:data,
			list:list
		},function(err,data){

			res.end(data);

		})



	}else{

		var msg='这是注册页面，也是注册的路由';
		var h="<h2>这是一个h2</h2>"
		ejs.renderFile('views/register.ejs',{
			msg:msg,
			h:h
		},function(err,data){

			res.end(data);

		})
	}

}).listen(8001);




