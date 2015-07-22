/*!
 * 前端自动构建工具
 * paywefrontside
 * version: 0.1
 */
 
 /**
  * doc:
  *     1. _file.(html|less)文件为私有文件不产生文件到发布环境
  */

"use strict";

// 配置
var config = require('./config.json')

var nunjucks = require('nunjucks');
var path = require('path');
var through2 = require('through2');
var gulp = require('gulp');
var watch = require('gulp-watch');
var connect = require('gulp-connect')

var less = require('gulp-less');
var sourcemaps = require('gulp-sourcemaps');
var minifyCSS = require('gulp-minify-css');

var imagemin = require('gulp-imagemin');
var pngquant = require('imagemin-pngquant');
var spritesmith = require('gulp.spritesmith');
var merge = require('merge-stream');

var uglify = require('gulp-uglify');
var concat = require('gulp-concat');
var rename = require('gulp-rename');
var del = require('del')

var autoBrowser = require('./autoBrowser')
var getIPAddress = require('./getIPAddress')
//var Server = require('./server')
//
//

var svnConfig = require('./svnConfig')

//模板路径
var tplPath = '../';
//输出路径
var outPath = tplPath + 'output';
// 静态资源源文件目录
var staticPath = tplPath + '/ow_mobile_depend';
// 静态资源输出路径
var distPath = outPath + '/ow_mobile_depend'


/* 路径 */
var tpls = [tplPath+'/**/*.html', '!'+tplPath+'/output/**/*.html','!'+tplPath+'/build/**/*.html'];
var filePaths = {
	iconfont: staticPath+'/iconfont/**/**',
	sprite: staticPath +'/images/sprite/**/*.*',
	images: [staticPath+'/images/**/**', '!'+ staticPath +'/images/sprite/**/**'],
	less: [staticPath+'/less/**/**.less', '!'+staticPath+'/less/**/_**.less'],
	js: staticPath+'/js/**/**.js',
    plguinStyle: staticPath+'/js/**/**.css',
	html: [tplPath+'/**/*.html','!'+tplPath+'/card.html','!'+tplPath+'/_**/*.html','!'+tplPath+'/output/**/*.html','!'+tplPath+'/build/**/*.html'],
    watchHtml: [tplPath+'/**/*.html', '!'+tplPath+'/output/**/*.html','!'+tplPath+'/build/**/*.html']
};



//模板引擎
var template = nunjucks.configure(tplPath, {
    /*
     * autoescape: true,
     * watch: true
     */
    watch: true
});

// 输出静态模板文件
var tpl = function(){
    return through2.obj(function(file, enc, next){
        // windows环境下不用替换
        //var tplFile = file.path.replace(tplPath, '');
        var tplFile = file.path;
        template.render(tplFile, {config: config}, function(err, html){
            if(err){
                return next(err);
            }
            file.contents = new Buffer(html);
            return next(null, file);
        });
    });   
};

/*------- 任务定义 --------- */

/* 删除旧版文件 */
gulp.task('clean', function(cb) {
    //console.log(outPath);
	//return del(outPath, cb);
    return cb();
})

/* 字体目录拷贝 */
gulp.task('iconfont', function(){
   return gulp.src(filePaths.iconfont)
                .pipe(gulp.dest(distPath+'/iconfont'))
                .pipe(connect.reload()) 
});

/* sprite 图片 */
gulp.task('sprite', function(cb){
	var cssName = '_sprite.css';
	var lessPath = staticPath+'/less/';

	var spriteData = gulp.src(filePaths.sprite)
						.pipe(spritesmith({
							imgPath: '../images/sprite/sprite.png?v='+config.ver,
					        imgName: 'sprite.png',
					        cssName: cssName
					        ,padding: 20
					      }));

	var imgPipe = spriteData.img.pipe(imagemin({ optimizationLevel: 5, use: [pngquant()] }))
				 	.pipe(gulp.dest(distPath+'/images/sprite/'));
	var cssPipe = spriteData.css.pipe(rename({extname: '.less'}))
					.pipe(gulp.dest(lessPath))

	return merge(imgPipe, cssPipe);
})

/* 图片拷贝压缩 */
gulp.task('images', function(){
    return gulp.src(filePaths.images)
                .pipe(imagemin({
                    optimizationLevel: 5,
                    progressive: true,
                    svgoPlugins: [{removeViewBox: false}],
                    use: [pngquant()]
                }))
                .pipe(gulp.dest(distPath+'/images'))
                // .pipe(connect.reload())
})

/* less文件编译 */
gulp.task('less', function(){
    return gulp.src(filePaths.less)
                // 初始化sourcemap
                .pipe(sourcemaps.init())
                // 编译less
                .pipe(less())
                // 压缩css
                .pipe(minifyCSS({compatibility: 'ie7'}))
                // 生成sourcemap
                .pipe(sourcemaps.write('../maps'))
                // 输出css文件
                .pipe(gulp.dest(distPath+'/css'))
                .pipe(connect.reload())
})

/* js */
gulp.task('js', function(){
    return gulp.src(filePaths.js)
               .pipe(sourcemaps.init())
                .pipe(uglify({mangle: false}))
                .pipe(sourcemaps.write('../maps'))
                .pipe(gulp.dest(distPath+'/js'))
                .pipe(connect.reload())
})

gulp.task('mainjs', ['js'], function(){
    var jsArr = ['sea','zepto', 'touch', 'fastclick', 'gallery/affix','layer/layer', 'gallery/imgLoader', 'framwork'].map(function(item){
        return staticPath+'/js/'+item+'.js';
    });
    return gulp.src(jsArr)
                .pipe(sourcemaps.init())
                .pipe(concat('main.js'))
                .pipe(uglify({mangle: false}))
                .pipe(sourcemaps.write('../maps'))
                .pipe(gulp.dest(distPath+'/js'))
                .pipe(connect.reload());
});

gulp.task('plugin', function(){
    return gulp.src(filePaths.plguinStyle)
                .pipe(minifyCSS({compatibility: 'ie7'}))
                .pipe(gulp.dest(distPath+'/js'))
                // .pipe(connect.reload())
});

/* 编译模板 */
gulp.task('template', function(){
    gulp.src(filePaths.html)
        .pipe(tpl())
        .pipe(gulp.dest(outPath))
        .pipe(connect.reload())
});

/* 启动服务 */
gulp.task('server', ['less', 'mainjs',  'plugin', 'images', 'template'], function(next){
    var port = config.port || 8000;
    var hostname =  getIPAddress() || 'localhost';
    connect.server({
        host: hostname,
        root: outPath,
        port: port
        ,livereload: true
    });

    autoBrowser('http://'+ hostname +':'+ port );

    //Server(outPath, port);
    return next();
});

/*--- watch 监听 ---*/
gulp.task('watch', function(){
	//gulp.watch(filePaths.iconfont, ['iconfont']);
	gulp.watch(filePaths.images, ['images']);
	gulp.watch(filePaths.less[0], ['less']);
	gulp.watch(filePaths.js, ['mainjs']);
    gulp.watch(filePaths.watchHtml, ['template']);
   // gulp.watch(filePaths.sprite, ['sprite']);
	//gulp.watch(distPath+'/images/sprite/**/**', ['less']);
});

/*---- 发布到SVN -----*/
gulp.task('publish', function(){
    gulp.src([outPath+'/**/**', '!'+outPath+'/ow_mobile_depend/maps/**/**'])
        // 根据你的目录请修改路径
        .pipe(gulp.dest(svnConfig.path));
});


/*------ 默认启动任务 ------ */
gulp.task('default', ['clean'], function(){
    //gulp.start(['sprite','iconfont', 'images', 'less', 'js', 'template', 'watch', 'server']);
    gulp.start(['server', 'watch']);
});

