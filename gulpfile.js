const { src, dest, series, parallel } = require('gulp')
const uglify = require('gulp-uglify-es').default;
const rename = require('gulp-rename');
const cleanCSS = require('gulp-clean-css');
const image = require('gulp-image');

function compileJS() {
  return src('src/*.js')
    // 做 uglify 跟 rename, 再存進 dist
    .pipe(uglify())
    .pipe(rename({ extname: '.min.js'}))
    .pipe(dest('dist/js'))
}

function compileCSS() {
  return src('src/*.css')
    .pipe(cleanCSS({ compatibility: 'ie8' }))
    .pipe(rename({ extname: '.min.css' }))
    .pipe(dest('dist/css'))
}

function compileImage() {
  return src('image/*')
    .pipe(image())
    .pipe(dest('dist/'))
}

// 同時做任務
exports.default = series(compileCSS, compileJS, compileImage)

// 這樣才能單獨執行某個任務 npx gulp compileCSS
exports.compileCSS = compileCSS