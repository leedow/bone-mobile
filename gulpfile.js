var gulp 			= require('gulp');
var less 			= require('gulp-less');
var autoprefixer 	= require('gulp-autoprefixer');
var watch 			= require('gulp-watch');
var uglify			= require('gulp-uglify');
var minifyCSS 		= require('gulp-minify-css');
var webpack 		= require('gulp-webpack');
var gutil 			= require('gulp-util');
var ejs 			= require("gulp-ejs");
var rev				= require('gulp-rev');

gulp.task('css', function(){
	watch('./style/**/*.less', function(){
		gulp.src('./style/bone.less')
			.pipe(less())
			.on('error', function(err) {
				gutil.log('Less Error!', err.message);
				this.end();
			})
			//.pipe(rev())
			.pipe(autoprefixer())
			//.pipe(minifyCSS())
			.pipe(gulp.dest('./build'))
			.pipe(gulp.dest('../Order/css'));

		gulp.src('./style/bone-pc.less')
			.pipe(less())
			.on('error', function(err) {
				gutil.log('Less Error!', err.message);
				this.end();
			})
			//.pipe(rev())
			.pipe(autoprefixer())
			//.pipe(minifyCSS())
			.pipe(gulp.dest('./build'))
			//.pipe(gulp.dest('D:/sae/wwwroot/source/smart/trunck/sources/webresource/glw/admin/style'));//for格林卫 
	
		 
	});

});

//react版本
gulp.task('rcjs', function(callback){
	watch('./rc/*.js', function(){
		gulp.src('./rc/mainrc.js')
			.pipe(webpack({
				watch: true,
				output: {
					filename: 'mainrc.js'
				},
				module: {
			        loaders: [
						// { test: /\.css$/, loader: "style!css" },
						// required for react jsx
						//{ test: /\.js$/,    loader: "babel-loader" },
						{
							test: /\.js$/,
							exclude: /(node_modules|bower_components)/,
							loader: 'babel-loader',
							query: {
						     	presets: ['react', 'es2015']
						    }
						}
			        ]
			    }
			})).pipe(gulp.dest('./build'));
	});
});

//jquery版本脚本
gulp.task('js', function(callback){
	watch('./js/*.js', function(){
		gulp.src('./js/main.js')
			.pipe(webpack({
				watch: true,
				output: {
					filename: '[name].js'
				}
			}))
			.pipe(gulp.dest('./build'));
		gulp.src('./js/main-global.js')
			.pipe(webpack({
				watch: true,
				output: {
					filename: 'bone-global.js'
				}
			}))
			.pipe(gulp.dest('./build'))
			//.pipe(gulp.dest('D:/sae/wwwroot/source/smart/trunck/sources/webresource/glw/front/js'));//for格林卫 
	});
});


//文档
gulp.task('doc', function(){
	watch('./docs/src/*.ejs', function(){
		gulp.src('./docs/src/*.ejs')
			.pipe(ejs())
			.pipe(gulp.dest('./docs'));
	});
	watch('./docs-pc/src/*.ejs', function(){
		gulp.src('./docs-pc/src/*.ejs')
			.pipe(ejs())
			.pipe(gulp.dest('./docs-pc'));
	});
});


gulp.task('default', function(){
	gulp.run(['css', 'js', 'doc']);
});
