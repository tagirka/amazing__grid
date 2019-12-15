const {src, dest} = require('gulp');

function allimg(source, destination) {

  return src(source)

    .pipe(dest(destination));

}

exports.allimg = allimg;
