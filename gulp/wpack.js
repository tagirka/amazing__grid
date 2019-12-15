const {src, dest} =require('gulp');
const plumber = require('gulp-plumber');

const webpackDevConfig = require('../webpack.dev.config'),
      webpackBuildConfig = require('../webpack.build.config'),
      webpackStream = require('webpack-stream'),
      webpack = require('webpack')

function wpack(source, destination) {

  if (process.argv.includes('--build')) {
    return src(source)
      .pipe(plumber())
      .pipe(webpackStream(webpackBuildConfig, webpack))
      .on('error', function handleError() {
        this.emit('end'); // Recover from errors
      })
      .pipe(dest(destination))
  }

  // --dev
  return src(source)
    .pipe(plumber())
    .pipe(webpackStream(webpackDevConfig, webpack))
      .on('error', function handleError() {
        this.emit('end'); // Recover from errors
      })
    .pipe(dest(destination))
}

exports.wpack = wpack;
