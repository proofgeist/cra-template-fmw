var inline = require("gulp-inline");
var gulp = require("gulp");

gulp.task("default", function() {
  return gulp
    .src("build/index.html")
    .pipe(
      inline({
        base: "build/"
      })
    )
    .pipe(gulp.dest("inlined/"));
});
