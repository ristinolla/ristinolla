var gulp = require("gulp"),
  sass = require("gulp-ruby-sass"),
  scsslint = require("gulp-scss-lint"),
  autoprefixer = require("gulp-autoprefixer"),
  minifycss = require("gulp-minify-css"),
  jshint = require("gulp-jshint"),
  uglify = require("gulp-uglify"),
  imagemin = require("gulp-imagemin"),
  rename = require("gulp-rename"),
  concat = require("gulp-concat"),
  notify = require("gulp-notify"),
  cache = require("gulp-cache"),
  livereload = require("gulp-livereload"),
  jade = require("gulp-jade"),
  del = require("del"),
  connect = require("gulp-connect"),
  plumber = require("gulp-plumber"),
  filter = require("gulp-filter");

gulp.task("styles", function() {
  var scssFilter = filter("src/vendor/**/*.scss");

  return (gulp
      .src("src/scss/**/*.scss")
      .pipe(scssFilter)
      .pipe(plumber())
      //.pipe(cache('scsslint'))
      //.pipe(scsslint())
      .pipe(scssFilter.restore())
      .pipe(sass({ style: "expanded" }))
      .pipe(
        autoprefixer(
          "last 2 version",
          "safari 5",
          "ie 8",
          "ie 9",
          "opera 12.1",
          "ios 6",
          "android 4"
        )
      )
      .pipe(gulp.dest("assets/css"))
      .pipe(rename({ suffix: ".min" }))
      .pipe(minifycss())
      .pipe(plumber.stop())
      .pipe(gulp.dest("assets/css"))
      .pipe(notify({ message: "Styles Complete" })) );
});

//Scripts
gulp.task("scripts", function() {
  return (gulp
      .src(["bower_components/fastclick/lib/fastclick.js", "src/js/**/*.js"])
      //.pipe(jshint('.jshintrc'))
      .pipe(jshint.reporter("default"))
      .pipe(concat("scripts.js"))
      .pipe(gulp.dest("assets/js"))
      .pipe(rename({ suffix: ".min" }))
      .pipe(uglify())
      .pipe(gulp.dest("assets/js"))
      .pipe(notify({ message: "Scripts task complete" })) );
});

//Jade
gulp.task("jade", function() {
  var YOUR_LOCALS = {};

  gulp
    .src("./src/index.jade")
    .pipe(plumber())
    .pipe(
      jade({
        locals: YOUR_LOCALS,
        pretty: true
      })
    )
    .pipe(plumber.stop())
    .pipe(gulp.dest("./"));
});

// Img
gulp.task("images", ["clean-images"], function() {
  return gulp
    .src("src/img/**/*")
    .pipe(
      cache(
        imagemin({ optimizationLevel: 3, progressive: true, interlaced: true })
      )
    )
    .pipe(gulp.dest("assets/img"))
    .pipe(notify({ message: "Images task complete" }));
});

// Modernizer
gulp.task("modernizr", function() {
  return gulp
    .src("bower_components/modernizr/modernizr.js")
    .pipe(rename({ suffix: ".min" }))
    .pipe(uglify())
    .pipe(gulp.dest("assets/vendor"))
    .pipe(notify({ message: "Modernizer moved " }));
});

gulp.task("webserver", function() {
  connect.server({
    port: 8102,
    livereload: true
  });
});

// Clean
gulp.task("clean", function(cb) {
  del(["assets/css", "assets/js"], cb);
});

gulp.task("clean-images", function(cb) {
  del(["assets/img"], cb);
});

// Default task
gulp.task("default", ["clean"], function() {
  gulp.start("styles", "scripts", "jade", "modernizr");
});

gulp.task("build", ["clean", "clean-images"], function() {
  gulp.start("styles", "scripts", "jade", "modernizr", "images");
});

// Watch
gulp.task("watch", function() {
  gulp.watch("src/scss/**/*.scss", ["styles"]);
  gulp.watch("src/js/**/*.js", ["scripts"]);
  gulp.watch("src/**/*.jade", ["jade"]);
  gulp.watch("src/img/**/*", ["images"]);

  // Create LiveReload server
  gulp.start("webserver");
  // Watch any files in dist/, reload on change
  gulp.watch(["assets/**", "index.html"]).on("change", livereload.changed);
});
