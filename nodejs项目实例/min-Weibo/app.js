var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var helpers = require('express-helpers')

var flash = require('connect-flash');
// 数据库相关
// var MongoStore = require('connect-mongo');
var settings = require('./settings');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);

// 路由相关
var index = require('./routes/index');
var users = require('./routes/users');
var list = require('./routes/list')
var logout = require('./routes/logout')
var login = require('./routes/login')
var reg = require('./routes/reg')
var post = require('./routes/post')
var admin=require('./routes/admin')

var app = express();
helpers(app);
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(flash());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
// Cookie 解析的中间件
app.use(cookieParser());
// 提供会话支持
app.use(session({
    secret: settings.cookieSecret,
    store: new MongoStore({
        url: 'mongodb://localhost/' + settings.db,
        autoRemove: 'native'
    })
}));


app.use(require('node-sass-middleware')({
    src: path.join(__dirname, 'public'),
    dest: path.join(__dirname, 'public'),
    indentedSyntax: true,
    sourceMap: true
}));
app.use(express.static(path.join(__dirname, 'public')));
// app.use(express.static(path.join(__dirname, 'bower_components')));
//动态视图
app.use(function(req, res, next) {
    res.locals.user = req.session.user;
    console.log('locals user:' + res.locals.user);
    console.dir(res.locals.user);

    var err = req.flash('error');
    var success = req.flash('success');
    res.locals.error = err.length ? err : null;
    res.locals.success = success.length ? success : null;
    next();
});

app.use('/', index);
app.use('/u', users);
app.use('/list', list);
app.use('/post', post);
app.use('/reg', reg);
app.use('/login', login);
app.use('/logout', logout);
app.use('/admin',admin);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handler
app.use(function(err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

//动态视图
// app.dynamicHelpers({
//     user: function(req, res) {
//         return req.session.user;
//     },
//     error: function(req, res) {
//         var err = req.flash = ('error');
//         if (err.length) return err;
//         else return null;

//     },
//     success: function(req, res) {
//         var succ = req.flash('success');
//         if (succ.length)
//             return succ;
//         else
//             return null;
//     }
// })



module.exports = app;
app.listen(3000);
