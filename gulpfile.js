import gulp from "gulp";
import cleanCSS from "gulp-clean-css";
import htmlmin from "gulp-htmlmin";
import fileinclude from "gulp-file-include";
import { exec } from "child_process";
import clean from "gulp-clean";
import terser from "gulp-terser";
import sitemap from "gulp-sitemap";
import webserver from "gulp-webserver";

gulp.task("minify-html", function () {
  return gulp
    .src("./src/views/*.html")
    .pipe(
      fileinclude({
        prefix: "@@",
        basepath: "@file",
      })
    )
    .pipe(htmlmin({ collapseWhitespace: true }))
    .pipe(gulp.dest("dist"));
});

gulp.task("minify-css", function () {
  return gulp
    .src("src/css/*.css")
    .pipe(cleanCSS({ compatibility: "ie8" }))
    .pipe(gulp.dest("dist/css"));
});

gulp.task("minify-js", function () {
  return gulp.src("src/js/*.js").pipe(terser()).pipe(gulp.dest("dist/js"));
});

gulp.task("copy-public", function () {
  return gulp
    .src("src/public/**/*", { dot: true, base: "src/public" })
    .pipe(gulp.dest("dist"));
});

gulp.task("markdown-to-html", function (cb) {
  exec("node scripts/article-gen.js", (err, stderr) => {
    if (err) {
      console.error(err);
      return cb(err);
    }
    console.error(stderr);
    cb();
  });

  exec("node scripts/blog-page-gen.js", (err, stderr) => {
    if (err) {
      console.error(err);
      return cb(err);
    }
    console.error(stderr);
    cb();
  });
});

gulp.task("watch", function () {
  gulp.watch("src/css/*.css", gulp.series("minify-css"));
  gulp.watch("src/views/*.html", gulp.series("minify-html"));
  gulp.watch("src/js/*.js", gulp.series("minify-js"));
  gulp.watch("src/public/*", gulp.series("copy-public"));
  gulp.watch("articles/*.md", gulp.series("markdown-to-html"));
});

gulp.task("clean", function () {
  return gulp.src("./dist/**/*", { read: false, dot: true }).pipe(clean());
});

gulp.task("sitemap", async function () {
  gulp
    .src("dist/**/*.html", {
      read: false,
    })
    .pipe(
      sitemap({
        siteUrl: "http://zachey.space",
      })
    )
    .pipe(gulp.dest("./dist"));
});

gulp.task("webserver", function () {
  gulp.src("dist").pipe(
    webserver({
      livereload: true,
      directoryListing: true,
      open: true,
    })
  );
});

gulp.task(
  "default",
  gulp.series(
    "minify-css",
    "minify-html",
    "minify-js",
    "copy-public",
    "markdown-to-html",
    "sitemap",
    "webserver",
    "watch"
  )
);

gulp.task(
  "build",
  gulp.series(
    "minify-css",
    "minify-html",
    "minify-js",
    "copy-public",
    "markdown-to-html",
    "sitemap"
  )
);
