const {src, dest} =require('gulp');

const plumber = require('gulp-plumber');

function html(source, destination) {
  return src(source)
    .pipe(plumber())
    .pipe(dest(destination));
}

exports.html = html;