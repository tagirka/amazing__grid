const {src, dest} = require('gulp');

const imagemin = require("gulp-imagemin");
const imageminJpegtran = require('imagemin-jpegtran');
const imageminPngquant = require('imagemin-pngquant');


function images(source, destination) {

  return src(source)
    .pipe(dest(destination))
    .pipe(imagemin([
      imageminJpegtran(),
      imageminPngquant({
        quality: [0.6, 0.8]
      })
    ]))
    .pipe(dest(destination));

}

exports.images = images;

// const imageminJpegRecompress = require('imagemin-jpeg-recompress');
// imagemin.jpegtran({progressive: true}),
//   imageminJpegRecompress({
//     loops: 5,
//     min: 65,
//     max: 70,
//     quality: 'medium'
//   }),
//   imagemin.optipng({optimizationLevel: 3}),
// pngquant({quality: '65-70', speed: 5})