const {src, dest} =require('gulp');

const rigger = require('gulp-rigger');
const terser = require('gulp-terser');
const plumber = require('gulp-plumber');
const rename = require('gulp-rename');

function js(source, destination) {
  return src(source)
    .pipe(plumber())
    .pipe(rigger())
    .pipe(dest(destination))
    .pipe(terser())
    .pipe(rename({
      suffix: '.min',
      extname: '.js'
    }))
    .pipe(dest(destination))

}

exports.js = js;


// const webpack = require('webpack-stream');
// gulp.task('default', function() {
//   return gulp.src('src/entry.js')
//     .pipe(webpack())
//     .pipe(gulp.dest('dist/'));
// });

// return gulp.src('src/entry.js')
//   .pipe(webpack( require('./webpack.config.js') ))
//   .pipe(gulp.dest('dist/'));