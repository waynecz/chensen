var express = require('express');
var router = express.Router();
var path = require('path');
var fs = require('fs');

router.get('/', (req, res, next) => {
    var title = '新闻中心';
    var newsList = [{
        d: '07-22',
        y: '2016',
        title: '萨达达达啊啊打算哈哈哈哈哈哈',
        content: '会上，隋董事长首先对餐饮软件行业的形势做了全面而细致的分析，指出辰森面临的外部竞争压力越来越大。与此同时，辰森世纪在经过7年产品化建设后，产品彻底稳定，拥有良好的市场基础，现在正处在绝佳的战略发展时机。因此，我们要紧抓时机，凭借核心竞争力抢占市场高地，快速布局提高市场占有率。接着，就公司近期的主要工作和重要举措做了详细部署。'
    }];

    res.renderPage('news', {
        title,
        newsList
    });
});

router.get('/:id', (req, res, next) => {
    var title = '新闻中心';
    var fileName = path.resolve(__dirname, '../views/screen/news/' + req.params.id + '.html');
    fs.stat(fileName, (err) => {
        if (err) {
            return res.renderPage('404', {});
        }
        var newsContent = fs.readFileSync(fileName, {encoding: 'utf-8'});
        res.renderPage('specificNews', {
            title,
            newsContent
        });
    });
});

module.exports = router;