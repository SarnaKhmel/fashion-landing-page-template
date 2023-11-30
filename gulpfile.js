const gulp = require("gulp");
const nunjucksRender = require("gulp-nunjucks-render");
const sass = require("gulp-sass")(require("sass"));
const postcss = require("gulp-postcss");
const cssnano = require("gulp-cssnano");
const rename = require("gulp-rename");
const bemCss = require("gulp-bem-css");

gulp.task("nunjucks", function () {
  return gulp
    .src("src/templates/pages/*.njk")
    .pipe(
      nunjucksRender({
        path: ["src/templates"],
      })
    )
    .pipe(gulp.dest("dist"));
});

gulp.task("styles", function () {
  return gulp
    .src("src/styles/main.scss")
    .pipe(sass().on("error", sass.logError))
    .pipe(postcss([bemCss]))
    .pipe(cssnano())
    .pipe(rename("style.min.css"))
    .pipe(gulp.dest("dist/css"));
});

gulp.task("watch", function () {
  gulp.watch("src/templates/**/*.njk", gulp.series("nunjucks"));
  gulp.watch("src/styles/**/*.scss", gulp.series("styles"));
});

gulp.task("default", gulp.series("nunjucks", "styles", "watch"));
