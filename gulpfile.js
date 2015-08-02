//tell gulp how to import packages
var gulp = require('gulp');
var gutil = require('gulp-util');
var source = require('vinyl-source-stream');
var browserify = require('browserify');
var watchify = require('watchify');
var reactify = require('reactify');



//main task
//look inside src directory and load every file **
//convert jsx to js
//concat and save new file inside root dirdd
gulp.task('default', function(){
  //entries - starting point
  //app knows all its components
  // jsx to js

  var bundler = watchify(browserify({
    entries: ['./src/app.jsx'],
    transform: [reactify],
    extensions: ['.jsx'],
    debug: true,
    cache: {},
    packageCache: {},
    fullPaths: true
  }));

  function build(file){
    if (file) gutil.log('Recompiling ' + file);
    return bundler
      .bundle()
      .on('error', gutil.log.bind(gutil, 'Browserify error'))
      .pipe(source('main.js'))
      .pipe(gulp.dest('./'));
  };
  build()
  bundler.on('update', build)
});
