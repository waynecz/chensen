var gulp = require('gulp');
var nodemon = require('gulp-nodemon');
var path = require('path');
var bs = require('browser-sync').create();
var sass = require('gulp-sass');
var autoprefixer = require('autoprefixer');
var postcss = require('gulp-postcss');
var maps = require('gulp-sourcemaps');
require('colors');
var processors = [
    autoprefixer({browsers: ["Android 4.1", "iOS 7.1", "Chrome > 31", "ff > 31", "ie >= 8"]})
];

// >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

var APP = path.resolve(__dirname, 'app.js');
var ROUTERS = path.resolve(__dirname, 'routes');
var VIEW = path.resolve(__dirname, 'views/**');

// >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

gulp.task('bs', () => {
    bs.init(null, {
        proxy: "http://localhost:3000",
        port: 2333,
        logLevel: "silent",
        file: path.resolve(__dirname, 'public/**/*.*')
    });
    return Promise.resolve()
});

gulp.task('bs-delay', (cb) => {
    console.log('浏览器刷新!'.red);
    return new Promise((resolve, reject) => {
        setTimeout(function () {
            bs.reload();
            bs.notify("This message will only last a second", 1000);
        }, 1500);
        resolve()
    });
});

// >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

gulp.task('css:dev', () => {
    return gulp.src(path.resolve(__dirname, 'src/sass/style-output.scss'))
        .pipe(maps.init())
        .pipe(sass({outputStyle: 'compact'}).on('error', sass.logError))
        .pipe(postcss(processors))
        .pipe(maps.write())
        .pipe(gulp.dest(path.resolve(__dirname, 'public/stylesheets/')));
});

// >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

gulp.task('watch:node', function () {
    gulp.watch(['./routes/**/*.js', './app.js', './bin/www', './views/**/*.html'],
        gulp.parallel('bs-delay')
    );
});

gulp.task('watch:css', () => {
    gulp.watch(path.resolve(__dirname, 'src/sass/*.scss'),
        gulp.parallel('css:dev')
    );
});

// >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

gulp.task('nodemon', (cb) => {
    let started = false;
    nodemon({
        script: path.resolve(__dirname, 'bin/www'),
        verbose: false,
        ext: 'js html',
        env: {'NODE_ENV': 'develop'},
        watch: [APP, ROUTERS, VIEW]
    }).on('start', () => {
        console.log('启动完成!'.green);
    }).on('restart', () => {
        console.log('重启中...................'.blue);
    });
    return Promise.resolve()
});

// >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

gulp.task('dev',
    gulp.series('css:dev', 'nodemon', 'bs',
        gulp.parallel('watch:node', 'watch:css')
    )
);