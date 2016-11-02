var gulp = require('gulp');
var sass = require('gulp-sass');
var notify = require("gulp-notify");
var browserSync = require('browser-sync').create();
// var concat = require('gulp-concat');
var browserify = require('browserify');
var tap = require('gulp-tap');
var buffer = require('gulp-buffer');

var jsFiles = ["src/js/*.js", "src/js/**/*.js"];

gulp.task('default', ["concat-js", "compile-sass"], function() {


    browserSync.init({
        // server: './'
        proxy: '127.0.0.1:8000',
        browser: 'google chrome'
    });

    gulp.watch("./src/scss/*.scss", ["compile-sass"]);

    gulp.watch("*.html").on("change", browserSync.reload);

    gulp.watch(jsFiles, ["concat-js"]);

});

gulp.task("compile-sass", function() {
    gulp.src("./src/scss/style.scss")
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest("./dist/css/"))
        .pipe(notify({
            title: "SASS",
            message: "Compiled"
        }))
        .pipe(browserSync.stream());
});

gulp.task("concat-js", function() {
    gulp.src("src/js/app.js")
        .pipe(tap(function(file){
            file.contents = browserify(file.path).bundle();
        }))
        .pipe(buffer())
        .pipe(gulp.dest("dist/js/"))
        .pipe(notify({
            title: "JS",
            message: "Concatenated"
        }))
        .pipe(browserSync.stream());
});
