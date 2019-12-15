const {src, dest} = require('gulp');

const plumber = require('gulp-plumber');
const gulpUncss = require('gulp-uncss')

function uncss(source, destination) {
    return src(source)
      .pipe(plumber())
      .pipe(gulpUncss({
          ignore: ['.visible','script'],
          html: ['./public/index.html']
        }
      ))
      .pipe(dest(destination));
}

exports.uncss = uncss;

// .pipe(postcss([
//   require('postcss-uncss')({
//     ignore: ['.visible','script'],
//     html: ['./public/index.html']
//   })
// ]))