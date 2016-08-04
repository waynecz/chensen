const template = require('art-template');
const path = require('path');
const layoutPath = path.resolve(process.cwd(), 'views/layout/layout');

module.exports = function (req, res, next) {
    if (req.method != 'GET') {
        return next();
    }
    res.renderPage = function (screenPath, data) {
        var screenPath = path.join('views/screen', screenPath);

        let isExist = function (screenPath) {
            return new Promise((resolve, reject) => {
                fs.exists(screenPath + '.html', (exists) => {
                    if (!exists) reject("template '" + screenPath  + "' is not found");
                    resolve(exists)
                });
            });
        };

        isExist(screenPath).then(res => {
                data.ctx = template(screenPath, data);
            }
        ).catch(e => {
            res.g
        });


        return res.render(layoutPath, data)
    };
    next()
};