var gulp = require('gulp');
var sass = require('gulp-sass');
var sassLint = require('gulp-sass-lint');
var csso = require('gulp-csso');
var postcss = require('gulp-postcss');
var cssnext = require('gulp-cssnext');
var selector = require('postcss-custom-selectors');
var autoprefixer = require('gulp-autoprefixer');

var ejs = require('gulp-ejs');
 
gulp.task('default', function () {
    return gulp.watch('*.scss',['css']);
});

var browsers = [
    '> 3%'
];

gulp.task('css', function () {
    return gulp.src('src/css/*.css')
//        .pipe(csso())
        .pipe(autoprefixer())
        .pipe(postcss([
            require('doiuse')({browsers: browsers}),
            require('postcss-mixins'),
            require('postcss-size'),
            require('postcss-nested'),
            require('postcss-simple-vars'),
            require('postcss-custom-properties'),
            require('postcss-advanced-variables'),
            require('postcss-calc'),
            require('gulp-sass'),
            require('postcss-custom-media'),
            require('precss'),
            require('gulp-cssnext'),
            require('cssnext'),
            selector(),
//            require('autoprefixer')({browsers: browsers}),
            require('css-mqpacker')
        ]))
        .pipe(gulp.dest('dest/css'));
});

gulp.task("ejs", function() {
    gulp.src(
        ["ejs/*.ejs",'!' + "ejs/_*.ejs"] //注1
    )
        .pipe(ejs())
        .pipe(gulp.dest("dest")) //注2
});
