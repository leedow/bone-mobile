var gulp 			= require('gulp');
var less 			= require('gulp-less');
var autoprefixer 	= require('gulp-autoprefixer');
var watch 			= require('gulp-watch');
var uglify			= require('gulp-uglify');
var minifyCSS 		= require('gulp-minify-css');
var webpack 		= require('gulp-webpack');

//less
gulp.task('css', function(){
	return 	gulp.src('./style/main.less')
			.pipe(watch('./style/*.less'))
			.pipe(less())
			.pipe(autoprefixer())
			//.pipe(minifyCSS())
			.pipe(gulp.dest('./build'));
});


gulp.task('js', function(callback){
	return 	gulp.src('./test.js')
			.pipe(webpack({
				watch: true,
				output: {
					filename: '[name].js'
				}
			}))
			.pipe(gulp.dest('./build'));
});


gulp.task('default', function(){
	gulp.run(['css', 'js']);
});
