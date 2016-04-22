var gulp = require('gulp');
var $    = require('gulp-load-plugins')();

var sassPaths = [
  'bower_components/foundation-sites/scss',
  'bower_components/motion-ui/src'
];

var merge = require('merge-stream');
var concat = require('gulp-concat');
var cssnano = require('gulp-cssnano');
var uglify = require('gulp-uglify');


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

    cssStream = gulp.src(['css/app.css', 'css/lightbox.css'])
      .pipe(cssnano());

    return merge(sassStream, cssStream)
      .pipe(concat('app.min.css'))
      .pipe(gulp.dest('css'));

});

gulp.task('js', function() {
  return gulp.src(['bower_components/jquery/dist/jquery.js', 'bower_components/what-input/what-input.js', 'bower_components/foundation-sites/dist/foundation.js', 'js/masonary.min.js', 'js/enquire.min.js', 'js/jquery.waypoints.min.js', 'js/lightbox.min.js', 'js/app.js'])
    .pipe(concat('app.min.js'))
    .pipe(uglify())
    .pipe(gulp.dest('js'))
});


gulp.task('default', ['sass'], function() {
  gulp.watch(['scss/**/*.scss'], ['sass']);
  gulp.watch(['js/app.js'], ['js']);
});
