var gulp = require('gulp'),
	sass = require('gulp-sass'),
	minifycss = require('gulp-minify-css'),
	rename  = require('gulp-rename'),
	concat  = require('gulp-concat'),
	browserify  = require('gulp-browserify'),
	gulpif  = require('gulp-if');

var env = 'develpment';
var sassDir = './public/sass/*.scss';
var sassOut = './public/stylesheets';

gulp.task('styles', function () {
	var config = {};
	var browser = { browsers: ['> 1%', 'IE 7'] };

	if (env === 'development'){
	  config.sourceComments = 'map';
	}

	return gulp.src(sassDir)
		.pipe( sass( config ) )
		.pipe( gulpif(env != 'development', minifycss())  )
		.pipe( gulp.dest(sassOut) );
});

gulp.task('template', function(){

});

gulp.task('todo', function(){
  	gulp.watch('./public/sass/components/**/*.scss', ['styles']);
  	gulp.watch('./public/sass/components/*.scss', ['styles']);
});

gulp.task('default', ['styles', 'template']);
