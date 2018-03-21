var gulp = require('gulp');
var uglify = require('gulp-uglify');
var gulpIf = require('gulp-if');
var cssnano = require('gulp-cssnano');
var del = require('del');
var runSequence = require('run-sequence');
var ngAnnotate = require('gulp-ng-annotate');
var gutil = require('gulp-util');


gulp.task('clean:dist',function(){
  return del.sync('public/dist/*');
});

gulp.task('js',function(){
  return gulp.src('public/js/**/*')
              .pipe(gulpIf('*.js', ngAnnotate()))
              .pipe(gulpIf('*.js', uglify()))
              .on('error', function (err) { gutil.log(gutil.colors.red('[Error]'), err.toString()); })
              .pipe(gulp.dest('public/dist/js'));
});

gulp.task('css',function(){
  return gulp.src('public/styles/*')
              .pipe(gulpIf('*.css', cssnano()))
              .pipe(gulp.dest('public/dist/styles'));
});

gulp.task('modules',function(){
  return gulp.src('public/bower_components/**/*')
              .pipe(gulp.dest('public/dist/bower_components/'))
});

gulp.task('views',function(){
  return gulp.src('public/views/**/*')
              .pipe(gulp.dest('public/dist/views/'));
});

gulp.task('index',function(){
  return gulp.src(['public/*.html','public/*.js','public/*.json'])
              .pipe(gulp.dest('public/dist/'));
});

gulp.task('build',function(callback){
  runSequence('clean:dist',
  ['js','css','modules','views','index'],
  callback);
});
