var express = require('express');
var path = require('path');
var logger = require('morgan'); // 请求打印
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var template = require('art-template');
var favicon = require('serve-favicon');
var renderPage = require('./middleware/renderPage')

// 路由入口
var routes = require('./routes/index');

var app = express();

// 渲染引擎设置
template.config('extname', '.html');
template.config('cache', false);
app.set('views', path.join(__dirname, 'views'));
app.engine('.html', template.__express);
app.set('view engine', 'html');

app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));

// 打印请求
app.use(logger('dev'));
app.use(renderPage);

// bodyParser用于解析客户端请求的body中的内容
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));

app.all('*', function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Content-Type,Content-Length, Authorization, Accept,X-Requested-With");
    res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
    res.header("X-Powered-By", ' 3.2.1');
    if (req.method == "OPTIONS") res.send(200);/*让options请求快速返回*/
    else  next();
});

// cookieParser中间件用于获取web浏览器发送的cookie中的内容
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// 全局应用index路由配置，具体路由配置进index设置
app.use('/', routes);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    res.renderPage('404', {})
});

// error handlers
if (app.get('env') === 'development') {
    app.use(function (err, req, res, next) {
        res.status(err.status || 500);
        res.renderPage('error', {
            message: err.message,
            error: err
        })
    })
}

// production error handler
// no stacktraces leaked to user
app.use(function (err, req, res, next) {
    res.status(err.status || 500)
    res.renderPage('error', {
        message: err.message,
        error: {}
    })
});

module.exports = app;
