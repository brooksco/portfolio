var gulp = require('gulp');
var $    = require('gulp-load-plugins')();

var merge = require('merge-stream');
var concat = require('gulp-concat');
var cssnano = require('gulp-cssnano');
var uglify = require('gulp-uglify');
var nunjucksRender = require('gulp-nunjucks-render');
var data = require('gulp-data');
var fs = require('fs');

var sassPaths = [
'node_modules/foundation-sites/scss',
'bower_components/motion-ui/src'
];

// Stylesheets
gulp.task('sass', function() {
  var sassStream, cssStream;

  sassStream = gulp.src('scss/app.scss').pipe($.sass({
    includePaths: sassPaths,
    outputStyle: 'compressed'
  })
  .on('error', $.sass.logError))
  .pipe($.autoprefixer({
    browsers: ['last 2 versions', 'ie >= 9']
  }));

  cssStream = gulp.src([
    'css/app.css', 
    'css/jquery.fancybox.css'])
  .pipe(cssnano());

  return merge(sassStream, cssStream)
  .pipe(concat('app.min.css'))
  .pipe(gulp.dest('css'));

});

// Javascript
gulp.task('js', function() {
  return gulp.src([
    'bower_components/jquery/dist/jquery.js', 
    'node_modules/what-input/what-input.js', 
    'node_modules/foundation-sites/dist/js/foundation.js', 
    'js/masonary.min.js', 
    'js/enquire.min.js', 
    'js/jquery.waypoints.min.js', 
    'js/jquery.fancybox.js', 
    'js/app.js'
    ])
  .pipe(concat('app.min.js'))
  .pipe(uglify())
  .pipe(gulp.dest('js'))
});

// Nunjucks (partials)
gulp.task('nunjucks', function() {
  // Gets .html and .nunjucks files in pages
  return gulp.src('html/**')
   // Adding data to Nunjucks
   .pipe(data(function() {
    // return require('./data.json')
    return JSON.parse(fs.readFileSync('./data.json'));
  }))
  // Renders template with nunjucks
  .pipe(nunjucksRender({
    path: ['html/']
  }))
  // output files in app folder
  .pipe(gulp.dest('./'))
});

gulp.task('default', ['sass'], function() {
  gulp.watch(['scss/**/*.scss'], ['sass']);
  gulp.watch(['js/app.js'], ['js']);
  gulp.watch(['html/**', 'data.json'], ['nunjucks']);
});
