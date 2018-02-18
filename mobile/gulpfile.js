var gulp = require('gulp');

gulp.task('default',  function() {
  return gulp.src('../cordova-social-vk/**/*')
        .pipe(gulp.dest('./plugins/cordova-social-vk'))
        .pipe(gulp.dest('./node_modules/cordova-social-vk'));
});