const gulp = require('gulp');
const gulpSass = require('gulp-sass');
const imagemin = require('gulp-imagemin');
const spritesmith = require('gulp.spritesmith');
const cssnano = require('gulp-cssnano');
const postcss = require('gulp-postcss');
const autoprefixer = require('autoprefixer');
const minifyHTML = require('gulp-minify-html');

const processors = [
	autoprefixer({ browsers: ['last 5 version'] })
];

const buildSass = (cb) => {
	console.log('buildSass');
	gulp.src('./src/styles/index.scss')
		.pipe(gulpSass())
		.pipe(postcss(processors))
		.pipe(cssnano())
		.pipe(gulp.dest('build/'));
	cb();
}

const optimizeImages = async (cb) => {
	gulp.src('src/images/*')
		.pipe(imagemin())
		.pipe(gulp.dest('build/images'));
	cb();
}

const sprite = async (cb) => {
	gulp.src('src/sprite/*.png').pipe(spritesmith({
		imgName: 'sprite.png',
		cssName: 'sprite.css'
	}))
		.pipe(gulp.dest('build/'));
	cb();
}

const importFa = async (cb) => {
	gulp.src('./src/fonts/*')
		.pipe(gulp.dest('build/webfonts/'));
	cb();
}

const miniHtml = async (cb) => {
	let opts = { comments: true, spare: true };
	gulp.src('*.html')
		.pipe(minifyHTML(opts))
		.pipe(gulp.dest('/'))
	cb();
}


exports.default = gulp.series(buildSass, optimizeImages, sprite, importFa, miniHtml);