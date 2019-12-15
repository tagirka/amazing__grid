const {src, dest} =require('gulp');

const plumber = require('gulp-plumber');
const postcss = require('gulp-postcss')
const rename = require('gulp-rename');

const postCssConfig = "../postcss.config"

function css(source, destination) {
  return src(source)
    .pipe(plumber())
    .pipe(postcss(postCssConfig))
    .pipe(rename({
      suffix: '.min',
      extname: '.css'
    }))
    .pipe(dest(destination));
}

exports.css = css;