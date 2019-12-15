const {src, dest} = require('gulp');

const _sass = require('gulp-sass');
const postcss = require('gulp-postcss')
const sourceMaps = require('gulp-sourcemaps');
const plumber = require('gulp-plumber');
const rename = require('gulp-rename');

const postCssConfig = "../postcss.config"

function sass(source, destination) {

  if (process.argv.includes('--build')) {
    return src(source, {allowEmpty: true})
      .pipe(plumber())
      .pipe(_sass())
      .pipe(postcss(postCssConfig))
      .pipe(rename({
        suffix: '.min',
        extname: '.css'
      }))
      .pipe(dest(destination))
  }
// --dev
  return src(source, {allowEmpty: true})
    .pipe(plumber())
    .pipe(sourceMaps.init())
    .pipe(_sass())
    .pipe(postcss(postCssConfig))
    .pipe(rename({
      suffix: '.min',
      extname: '.css'
    }))
    .pipe(sourceMaps.write('.'))
    .pipe(dest(destination))
}

exports.sass = sass;
