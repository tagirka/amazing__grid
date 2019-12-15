const { src, dest } = require("gulp");
const gulpPug = require("gulp-pug");
const plumber = require("gulp-plumber");
const htmlmin = require("gulp-htmlmin");

function pug(source, destination) {
  if (process.argv.includes("--build")) {
    return src(source)
      .pipe(plumber())
      .pipe(
        gulpPug({
          basedir: "src/",
          pretty: false
        })
      )
      .pipe(
        htmlmin({
          collapseWhitespace: true,
          removeComments: true
        })
      )
      .pipe(dest(destination));
  }

  return src(source)
    .pipe(plumber())
    .pipe(
      gulpPug({
        basedir: "src/",
        pretty: true
      })
    )
    .pipe(dest(destination));
}

exports.pug = pug;
