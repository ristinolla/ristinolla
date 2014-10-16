

var gulp = require('gulp'),
    sass = require('gulp-ruby-sass'),
    less = require('gulp-less');
    autoprefixer = require('gulp-autoprefixer'),
    minifycss = require('gulp-minify-css'),
    jshint = require('gulp-jshint'),
    uglify = require('gulp-uglify'),
    imagemin = require('gulp-imagemin'),
    rename = require('gulp-rename'),
    concat = require('gulp-concat'),
    notify = require('gulp-notify'),
    cache = require('gulp-cache'),
    livereload = require('gulp-livereload'),
    jade = require('gulp-jade'),
    del = require('del');

gulp.task('styles', function () {
  return gulp.src('src/scss/main.scss')
    .pipe(sass({ style: 'expanded', }))
    .pipe(autoprefixer('last 2 version', 'safari 5', 'ie 8', 'ie 9', 'opera 12.1', 'ios 6', 'android 4'))
    .pipe(gulp.dest('assets/css'))
    .pipe(rename({ suffix: '.min' }))
    .pipe(minifycss())
    .pipe(gulp.dest('assets/css'))
    .pipe(notify({ message: 'Styles Complete'}));
});


//Scripts
gulp.task('scripts', function () {
  return gulp.src('src/js/**/*.js')
    //.pipe(jshint('.jshintrc'))
    .pipe(jshint.reporter('default'))
    .pipe(concat('main.js'))
    .pipe(gulp.dest('assets/js'))
    .pipe(rename({ suffix: '.min' }))
    .pipe(uglify())
    .pipe(gulp.dest('assets/js'))
    .pipe(notify({ message: 'Scripts task complete' }));
});


//Jade
gulp.task('jade', function() {
  var YOUR_LOCALS = {};

  gulp.src('./src/index.jade')
    .pipe(jade({
      locals: YOUR_LOCALS
    }))
    .pipe(gulp.dest('./'))
});


// Img
gulp.task('images',['clean-images'], function() {
  return gulp.src('src/img/**/*')
    .pipe(cache(imagemin({ optimizationLevel: 3, progressive: true, interlaced: true })))
    .pipe(gulp.dest('assets/img'))
    .pipe(notify({ message: 'Images task complete' }));
});



// Clean
gulp.task('clean', function(cb) {
    del(['assets/css', 'assets/js'], cb)
});

gulp.task('clean-images', function(cb) {
    del(['assets/img'], cb)
});

// Default task
gulp.task('default', ['clean'], function() {
    gulp.start('styles', 'scripts', 'jade');
});

// Watch
gulp.task('watch', function() {

  // Watch .scss files
  gulp.watch('src/scss/**/*.scss', ['styles']);

  // Watch .js files
  gulp.watch('src/js/**/*.js', ['scripts']);

  // Watch .jade files
  gulp.watch('src/**/*.jade', ['jade']);

  // Watch image files
  gulp.watch('src/images/**/*', ['images']);

  // Create LiveReload server
  livereload.listen();

  // Watch any files in dist/, reload on change
  gulp.watch(['assets/**', 'index.html']).on('change', livereload.changed);

});
