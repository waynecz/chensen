var express = require('express');
var router = express.Router();
var app = require('../app.js');
var path = require('path');

router.get('/', function (req, res, next) {
    var pageData = require('../data/pageData/index');
    pageData.title = '首页';
    var newsOr = require(path.join(process.cwd(), './data/pageData/newsIndex.json')).datas.slice(0, 3);
    pageData.newsList = newsOr.map((a, i) => {
        a.content = a.content.substr(0, 70) + '...';
        return a
    });
    res.renderPage('index', pageData);
});

router.get('/production', function (req, res, next) {
    var title = '产品及服务';
    res.renderPage('production', {
        title: title
    });
});

router.get('/solution', function (req, res, next) {
    var pageData = require('../data/pageData/solution');
    pageData.title = '解决方案';
    res.renderPage('solution', pageData);
});

router.get('/case', function (req, res, next) {
    var pageData = require('../data/pageData/case');
    pageData.title = '经典案例';
    res.renderPage('case', pageData);
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
