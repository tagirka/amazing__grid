const {src, dest} =require('gulp');
const del = require("del");

const plumber = require('gulp-plumber');
const concat = require('gulp-concat')

function libs_css(source, destination) {
  return src(source)
    .pipe(plumber())
    .pipe(concat('_libs.scss'))
    .pipe(dest(destination));
}

exports.libs = libs_css;
