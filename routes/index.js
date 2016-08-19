var express = require('express');
var router = express.Router();
var app = require('../app.js');

router.get('/', function (req, res, next) {
    var pageData = require('../data/pageData/index');
    pageData.title =  '首页';
    res.renderPage('index', pageData);
});

router.get('/production', function (req, res, next) {
    var title = '产品及服务';
    res.renderPage('production', {
        title: title
    });
});

router.get('/solution', function (req, res, next) {
    var title = '解决方案';
    res.renderPage('solution', {
        title: title
    });
});

router.get('/case', function (req, res, next) {
    var title = '经典案例';
    res.renderPage('case', {
        title: title
    });
});

router.get('/about', function (req, res, next) {
    var title = '联系我们';
    res.renderPage('about', {
        title: title
    });
});

router.get('/message', function (req, res, next) {
    var title = '咨询留言';
    res.renderPage('message', {
        title: title
    });
});

router.use('/news', require('./news'));

module.exports = router;
