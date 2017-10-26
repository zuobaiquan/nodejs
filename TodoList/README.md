# TodoList
**主要功能**：用户的登录注册；待办事宜的增删改；用户自定义头像的上传<br>
**涉及到的技术**：nodejs,express框架，mongodb非关系型数据库，mongoose框架，ejs模板，expressSession记录登录状态<br>
**模块化**：路由和事物逻辑分离。路由在router.js中，事物逻辑在business_logic.js中，数据库在dao/db.js中。便于管理和维护。


----------


##用户的登录注册

####登录功能

 - 得到请求的数据,get请求是 req.query.userName  post请求的数据是在body中，因此req.body.userName
 - 验证用户输入是否正确，这是需要从数据库中取出userName对应的密码，比较
                - 数据库需要根据user的id找到用户信息，找到的话就说明用户登录正确，就渲染到listItem页面
                - 否则输出不正确

####注册功能

 - 从前端html中得到数据。userName,passWord,passwordConfirm,email
 - 先判断passWord,passwordConfirm是否相等，不等的话重新输入；相等的话，进入下一步。
 - 从数据库中获得userName判断数据库中是否已经存在。存在的话，请用户直接登录。否则，进入下一步。
 -  把前边得到的数据存入数据库中。
 - 完成之后，停止3秒后，自动跳转到登录页面。  （res.setTimeout(3000,fun);）
 
####登出功能
 - 思想是把之前登录存储的session删除掉就ok。      （req.session.destroy();）
 - 然后重定向到首页。    （res.redirect("/");）
 
 


----------


 

##待办事宜的增删改

####添加待办事宜数据
要添加的数据

```
 var itemInfo = {
        userId:userId,
        title:title,
        postDate:postDate
    };
```

**为什么有userId？**
因为添加的待办事宜是个人的数据，必须要将人和事宜对应起来，所以要有userId。从用户登录后保存的session中得到。

**流程**

 - 把这些数据添加到数据库中。
 -  添加成功后，重新渲染item_list页面。


----------


##用户自定义头像的上传
