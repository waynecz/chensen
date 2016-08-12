var express = require('express');
var router = express.Router();
var path = require('path');
var fs = require('fs');

router.get('/', (req, res, next) => {
    var title = '新闻中心';

    res.renderPage('news', {
        newsContent: '22'
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
            title: title,
            newsContent: newsContent
        });
    });
});

module.exports = router;