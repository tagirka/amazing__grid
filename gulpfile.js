"use strict";

const gulp = require('gulp');
const { watch, src, dest, series, parallel } = require('gulp');

const browserSync = require('browser-sync').create();
const del = require("del");

let isDEV = false

if (process.argv.includes('--dev'))
  isDEV = true

const paths = {
  src: {
    html: 'src/*.html',
    pug: 'src/*.pug',
    sass: 'src/scss/style.scss',
    js: 'src/js/*.{js,ts}',
    css: 'src/css/**/*.css',
    images: 'src/img/**/*.{png,jpg}',
    svg: 'src/img/**/*.svg',
    vendor: './src/vendor/**/**'
  },
  build: {
    html: './public',
    css: './public/css',
    scss: './src/scss',
    js: './public/js',
    images: './public/img',
    vendor: './public/vendor',
  },
  watch: {
    html: 'src/**/*.html',
    pug: 'src/**/*.pug',
    css: 'src/css/**/*.css',
    sass: 'src/scss/**/*.scss',
    js: 'src/js/**/*.{js,ts}',
    images: 'src/img/**/*.{png,jpg}',
    svg: 'src/img/*.svg'
  },
  clean: "./public"
}


function pug() {
  return require('./gulp/pug').pug(paths.src.pug, paths.build.html)
}

function html() {
  return require('./gulp/html').html(paths.src.html, paths.build.html)
}

function sass() {
  return require('./gulp/sass').sass(paths.src.sass, paths.build.css)
}

function js() {
  return require('./gulp/js').js(paths.src.js, paths.build.js)
}

function wpack() {
  return require('./gulp/wpack').wpack(paths.src.js, paths.build.js)
}

function css() {
  return require('./gulp/css').css(paths.src.css, paths.build.css)
}

function uncss() {
  return require('./gulp/uncss').uncss(paths.build.css+'/style.min.css', paths.build.css)
}

function allimg() {
  return require('./gulp/allimg').allimg(paths.src.images, paths.build.images)
}

function images() {
  return require('./gulp/images').images(paths.src.images, paths.build.images)
}

function svg() {
  return require('./gulp/svg').svg(paths.src.svg, paths.build.images)
}

function libs() {
  return require('./gulp/libs')
    .libs([
    'node_modules/normalize.css/normalize.css'
    ],
    paths.build.scss)
}

function copy() {
  return src([
    paths.src.vendor,
    paths.src.images,
    // paths.src.js,
    // paths.src.html
  ], {base: './src'})
    .pipe(dest(paths.clean));
}

function clean() {
  return del(paths.clean + '/*', {force: true})
}

function server() {
  browserSync.init({
    // proxy: "http://localhost:5000/"
    notify: false,
    reload: 1000,
    server: {
      baseDir: "./public"
    }
  })
}

function watchFiles() {
  watch(paths.watch.sass, sass).on('change', browserSync.reload);
  watch(paths.watch.pug, pug).on('change', browserSync.reload);
  watch(paths.watch.html, html).on('change', browserSync.reload);
  watch(paths.watch.js, wpack).on('change', browserSync.reload);
  watch(paths.watch.css, css).on('change', browserSync.reload);
  watch(paths.watch.images, images).on('change', browserSync.reload);
  watch(paths.watch.svg, svg).on('change', browserSync.reload);
}

gulp.task('before_run_project',
  series(
    clean, copy,
    parallel(
      images, svg, wpack, css,
      series(libs, sass, pug),
    ),
  )
);

gulp.task('build_project',
  series(
    clean, copy,
    parallel(
      images, svg, wpack, css,
      series(libs, sass, pug, uncss),
    ),
  )
);

gulp.task('dev',
  parallel(
    server,
    watchFiles)
);


if (isDEV) {
  gulp.task('default',
    series(
      'before_run_project',
      'dev')
  )
} else {
  gulp.task('default',
    series(
      'build_project'
      )
  )
}

exports.copy = copy
exports.clean = clean

// exports.default = series(before_run_project)