const gulp = require("gulp");
const tslint = require("gulp-tslint");
const ts = require("gulp-typescript");
const tsProject = ts.createProject("tsconfig.json");

gulp.task("build", function () {
    return tsProject.src()
        .pipe(tsProject())
        .js.pipe(gulp.dest("server/dist"));
});

gulp.task("tslint", function() {
    return tsProject.src()
        .pipe(tslint({
            formatter: "prose"
        }))
        .pipe(tslint.report({
            emitError: false
        }));
});

gulp.task('watch', ['build'], function() {
    gulp.watch('server/src/**/*.ts', ['build']);
});