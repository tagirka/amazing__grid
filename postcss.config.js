// npm install gulp-postcss autoprefixer css-mqpacker cssnano --save-dev

module.exports = {
  plugins: [
    require('autoprefixer')({
      overrideBrowserslist: ['last 3 version'],
      cascade: true
    }),
    require('css-mqpacker'),
    require('cssnano')({
      preset: [
        'default', {
          zindex: false,
          discardComments: {
            removeAll: false,
          }
        }
      ]
    })
  ]
}