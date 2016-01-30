var gulp = require('gulp');
var $    = require('gulp-load-plugins')();

var sassPaths = [
  'bower_components/foundation-sites/scss',
  'bower_components/motion-ui/src'
];

var merge = require('merge-stream');
var concat = require('gulp-concat');
var cssnano = require('gulp-cssnano');

gulp.task('css', function(){
  return gulp.src('css/*.css')
    .pipe(concat('app.min.css'))
    .pipe(gulp.dest('css'));
});


gulp.task('sass', function() {
  var sassStream, cssStream;

  sassStream = gulp.src('scss/app.scss')
    .pipe($.sass({
      includePaths: sassPaths,
      outputStyle: 'compressed'
    })
      .on('error', $.sass.logError))
    .pipe($.autoprefixer({
      browsers: ['last 2 versions', 'ie >= 9']
    }));

    cssStream = gulp.src('css/*.css')
      .pipe(cssnano());

    return merge(sassStream, cssStream)
      .pipe(concat('app.min.css'))
      .pipe(gulp.dest('css'));

});


gulp.task('default', ['sass'], function() {
  gulp.watch(['scss/**/*.scss'], ['sass']);
});
