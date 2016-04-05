
var gulp 	= require('gulp');
var config 	= require('./gulp-config')();
var sourcemaps = require('gulp-sourcemaps');
var babel = require('gulp-babel');
var concat = require('gulp-concat');
var browserSync = require('browser-sync').create();
var plumber = require('gulp-plumber')
var sass = require('gulp-sass')
var autoprefixer = require('gulp-autoprefixer')
var nodemon = require('gulp-nodemon')



//https://gist.github.com/sogko/b53d33d4f3b40d3b4b2e
gulp.task('serve', ['browser-sync'], function(){

});

gulp.task('browser-sync', ['nodemon'], function(){
    console.log('loading browser-sync..')
    setTimeout(function(){

        browserSync.init(null, {
            proxy: 'http://localhost:4000/',
            files: ['public/**/*.*'],
            port: 4001
        })

    }, 500);
});

/* Watch file changes, restart server with nodemon */
gulp.task('nodemon', ['styles', 'compile-js'], function setupNodemon(cb){
    console.log('loading nodemon...')
    var started = false;
    nodemon({
        script: config.server,           //what is nodemon going to run on server restart?
        ext: 'js',	                 //what extentions to watch for changes (i.e when .js file changes, restart!)
        ignore: ['/node_modules/**/*', 'public/**/*'],  //do NOT restart when these files change
    }).on('start', function start(){
        if (!started){
            cb();
            started = true;
        }
    });

    gulp.watch(config.sass, ['styles']);
    gulp.watch('public/app/**/*.js', ['compile-js']);
    gulp.watch('')

});

/* Compiling SASS */
gulp.task('styles', function() {
    console.log("Compiling SCSS --> CSS ");
    return gulp
        .src('public/css/scss/app.scss')
        .pipe(plumber() )
        .pipe(sass() )
        .pipe(autoprefixer(config.supportedBrowsers))
        .pipe(gulp.dest('public/css'))
        .pipe(browserSync.stream());

});

/*
 * Transpile to ES6 with babel, concatenate and insert into public folder
 */
gulp.task("compile-js", function () {
    console.log('compiling and adding fixme.js...');
    return gulp.src([
            config.app + '/**/*.js',
        ])
        .pipe(sourcemaps.init())
        .pipe(babel({
            presets:['es2015']
        }))
        .pipe(concat("fixme.js"))
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest(config.public))
        .pipe(browserSync.stream());
});


gulp.task('default',['serve']);
