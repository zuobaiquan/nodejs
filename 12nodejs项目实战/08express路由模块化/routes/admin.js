/**
 * Created by Administrator on 2017/8/18 0018.
 */
var express=require('express');

var router = express.Router();   /*��ʹ�� express.Router �ഴ��ģ�黯���ɹ��ص�·�ɾ��*/
//��̨��·��  ���еĺ�̨����Ҫ��������

var login=require('./admin/login.js');
var product=require('./admin/product.js');
var user=require('./admin/user.js');

//����·��

router.use('/login',login);
router.use('/product',product);
router.use('/user',user);




module.exports = router;   /*��¶��� routerģ��*/