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
    var pageData = require('../data/pageData/production');
    pageData.title = '产品及服务';
    res.renderPage('production', pageData);
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
    var pageData = require('../data/pageData/about');
    pageData.title = '联系我们';
    res.renderPage('about', pageData);
});

router.all('/dongge', function (req, res, next) {
    res.send({
        title: '东哥大傻逼',
        img: ['http://parnote.com:5000/imgs/news_banner', 'http://parnote.com:5000/imgs/news_banner_2','http://parnote.com:5000/imgs/news_banner_3', 'http://parnote.com:5000/imgs/news_banner_4'],
        content: [1,2,3,4]
    })
});

router.use('/news', require('./news'));

module.exports = router;
