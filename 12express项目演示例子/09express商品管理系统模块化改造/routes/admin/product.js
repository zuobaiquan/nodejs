/**
 * Created by Administrator on 2017/8/18 0018.
 */
var express=require('express');

var router = express.Router();   /*可使用 express.Router 类创建模块化、可挂载的路由句柄*/

var DB=require('../../modules/db.js');  /*引入DB数据库*/

var multiparty = require('multiparty');  /*图片上传模块  即可以获取form表单的数据 也可以实现上传图片*/
var  fs=require('fs');

router.get('/',function(req,res){
    DB.find('product',{},function(err,data){

        res.render('admin/product/index',{
            list:data
        });
    })

})
//处理登录的业务逻辑
router.get('/add',function(req,res){
     res.render('admin/product/add');

})
//doAdd
router.post('/doAdd',function(req,res){
    //获取表单的数据 以及post过来的图片

    var form = new multiparty.Form();

    form.uploadDir='upload'   //上传图片保存的地址     目录必须存在

    form.parse(req, function(err, fields, files) {

        //获取提交的数据以及图片上传成功返回的图片信息
        //
        //console.log(fields);  /*获取表单的数据*/
        //
        //console.log(files);  /*图片上传成功返回的信息*/
        var title=fields.title[0];
        var price=fields.price[0];
        var fee=fields.fee[0];
        var description=fields.description[0];
        var pic=files.pic[0].path;
        //console.log(pic);

        DB.insert('product',{
            title:title,
            price:price,
            fee,
            description,
            pic

        },function(err,data){
            if(!err){
                res.redirect('/admin/product'); /*上传成功跳转到首页*/
            }

        })
    });

})


router.get('/edit',function(req,res){

    //获取get传值 id

    var id=req.query.id;

    console.log(id);

    //去数据库查询这个id对应的数据     自增长的id 要用{"_id":new DB.ObjectID(id)

    DB.find('product',{"_id":new DB.ObjectID(id)},function(err,data){

        //console.log(data);

        res.render('admin/product/edit',{
            list:data[0]
        });
    });

})
router.post('/doEdit',function(req,res){

    var form = new multiparty.Form();

    form.uploadDir='upload'  // 上传图片保存的地址

    form.parse(req, function(err, fields, files) {

        //获取提交的数据以及图片上传成功返回的图片信息

        //console.log(fields);
        console.log(files);

        var _id=fields._id[0];   /*修改的条件*/
        var title=fields.title[0];
        var price=fields.price[0];
        var fee=fields.fee[0];
        var description=fields.description[0];


        var originalFilename=files.pic[0].originalFilename;
        var pic=files.pic[0].path;

        if(originalFilename){  /*修改了图片*/
            var setData={
                title,
                price,
                fee,
                description,
                pic
            };
        }else{ /*没有修改图片*/
            var setData={
                title,
                price,
                fee,
                description
            };
            //删除生成的临时文件
            fs.unlink(pic);

        }

        DB.update('product',{"_id":new DB.ObjectID(_id)},setData,function(err,data){

            if(!err){
                res.redirect('/admin/product');
            }
        })



    });

})

router.get('/delete',function(req,res){
    //获取id

    var  id=req.query.id;

    DB.deleteOne('product',{"_id":new DB.ObjectID(id)},function(err){

        if(!err){

            res.redirect('/admin/product');
        }

    })

})

module.exports = router;   /*暴露这个 router模块*/