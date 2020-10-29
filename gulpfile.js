const { src, dest, series } = require('gulp')
const uglify = require('gulp-uglify-es').default;
const rename = require('gulp-rename');
const sass = require('gulp-sass');
const cleanCSS = require('gulp-clean-css');
const image = require('gulp-image');
const imageResize = require('gulp-image-resize');
const htmlmin = require('gulp-htmlmin');
const purgecss = require('gulp-purgecss')

sass.compiler = require('node-sass');

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
  return src('image-umcompress/*')
    .pipe(image())
    .pipe(dest('dist/'))
}

function resizeImage() {
  return src('image-umcompress/bg/*')
    .pipe(imageResize({
      width: 1920,
      height: 560,
    }))
    .pipe(dest('dist/image/bg'))
}

function compileHTML() {
  return src('src/*.html')
    .pipe(htmlmin({ collapseWhitespace: true }))
    .pipe(dest('dist/html'))
}

function purgeCSS() {
  return src('src/*.css')
    .pipe(purgecss({
      content: ['src/*.html']
    }))
    .pipe(dest('dist/css'))
}

// 同時做任務
exports.default = series(compileCSS, compileJS, compileImage)

// 這樣才能單獨執行某個任務 npx gulp compileCSS resizeImage
exports.compileCSS = compileCSS
exports.resizeImage = resizeImage
exports.compileJS = compileJS
exports.compileHTML = compileHTML
exports.purgeCSS = purgeCSS