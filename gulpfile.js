var gulp = require('gulp'),
  	gutil = require('gulp-util'),
  	sass = require('gulp-sass'),
  	webserver = require('gulp-webserver'),
  	concat = require('gulp-concat'),
  	uglify = require('gulp-uglify'),
  	browserify =  require('browserify'),
  	babelify = require('babelify'),
    bower = require('gulp-bower'),
    source = require('vinyl-source-stream');

var sassSources = ['./app/style/*.scss'];
var htmlSources = ['./public/*.html'];
var jsSources = ['./app/components/*.js'];
var assets = './public/assets';
var bootstrapDir = './bower_components/bootstrap-sass';

gulp.task('bower', function() {
  return bower();
});

gulp.task('sass', ['bower'] ,function() {
    return gulp.src(sassSources)
    .pipe(sass({
        includePaths: [bootstrapDir + '/assets/stylesheets'],
    }))
    .pipe(gulp.dest(assets + '/css'));
});

gulp.task('webserver', function() {
  gulp.src('public')
    .pipe(webserver({
      livereload: true,
      directoryListing: false,
      open: true
    }));
});

gulp.task('js', function () {
      var appBundler = browserify({
      entries: './app/components/index.js',
      debug: true
    })
      .transform("babelify", {presets: ["es2015", "react"]})
      .bundle()
      .on('error', gutil.log)
      .pipe(source('app.js'))
      .pipe(gulp.dest(assets +'/js/'));
});

gulp.task('watch', function(){
  gulp.watch(sassSources, ['sass']);
  gulp.watch(htmlSources, ['html']);
  gulp.watch(jsSources, ['js']);
});

gulp.task('default', ['sass', 'js', 'webserver', 'watch']);
