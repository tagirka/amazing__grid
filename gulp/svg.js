const {src, dest} = require('gulp');

const svgSprite = require('gulp-svg-sprite');
const svgmin = require('gulp-svgmin');
const cheerio = require('gulp-cheerio');
const replace = require('gulp-replace');

function svg(source, destination) {
  return src(source)
    .pipe(svgmin({
      js2svg: {
        pretty: true
      }
    }))
    .pipe(cheerio({
      run: function ($) {
        $('[fill]').removeAttr('fill');
        $('[stroke]').removeAttr('stroke');
        $('[style]').removeAttr('style');
      },
      parserOptions: {xmlMode: true}
    }))
    .pipe(replace('&gt;', '>'))
    // build svg sprite
    .pipe(svgSprite({
      mode: {
        symbol: {
          sprite: "sprite.svg"
        }
      }
    }))
    .pipe(dest(destination))
}

exports.svg = svg;
