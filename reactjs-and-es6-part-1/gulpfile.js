var gulp = require('gulp');
var browserify = require('browserify');
var babelify = require('babelify');
var source = require('vinyl-source-stream');
var connect = require('gulp-connect');
var browserSync = require('browser-sync').create();

gulp.task('webserver', function() {
    connect.server({
      livereload: true,
      port: 8000,
      host: '0.0.0.0'
    });
  });
  
  // Static server
  gulp.task('browser-sync', function() {
      browserSync.init({
          server: {
              baseDir: "./"
          }
      });
  });

gulp.task('build', function () {
    return browserify({entries: './app.jsx', extensions: ['.jsx'], debug: true})
        .transform('babelify', {presets: ['es2015', 'react']})
        .bundle()
        .on('error', function(err) { console.error(err); this.emit('end'); })
        .pipe(source('bundle.js'))
        .pipe(gulp.dest('dist'));
});

gulp.task('watch', ['build'], function () {
    gulp.watch('*.jsx', ['build']);
});

gulp.task('default', ['watch','webserver']);
