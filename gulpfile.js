var fs = require('fs');
var gulp = require('gulp');
var replace = require('gulp-replace');
var rename = require("gulp-rename");

var deleteFolderRecursive = function (path) {
	if (fs.existsSync(path)) {
		fs.readdirSync(path).forEach(function (file, index) {
			var curPath = path + "/" + file;
			if (fs.lstatSync(curPath).isDirectory()) { // recurse
				deleteFolderRecursive(curPath);
			} else { // delete file
				fs.unlinkSync(curPath);
			}
		});
		fs.rmdirSync(path);
	}
};

gulp.task('startSetup', ['find-and-replace-in-root-files', 'find-and-replace-in-project-files', 'find-and-replace-in-demo-files', 'rename-files-1', 'rename-files-2','move', 'cleanup']);


gulp.task('find-and-replace-in-root-files', function () {
	var newName = process.argv[4];
	var className = newName.charAt(0).toUpperCase() + newName.substr(1).replace('-', '');
	return gulp.src(['**.*', '!gulpfile.js', '.npmignore', '.gitignore'])
		.pipe(replace('ngx-template', newName))
		.pipe(replace('NGXTemplate', className))
		.pipe(gulp.dest(''));

});
gulp.task('find-and-replace-in-project-files', ['find-and-replace-in-root-files'], function () {
	var newName = process.argv[4];
	var className = newName.charAt(0).toUpperCase() + newName.substr(1).replace('-', '');

	return gulp.src(['ngx-template/src/app/**.*'])
		.pipe(replace('ngx-template', newName))
		.pipe(replace('NGXTemplate', className))
		.pipe(gulp.dest('ngx-template/src/app/'));

});

gulp.task('find-and-replace-in-demo-files', ['find-and-replace-in-root-files', 'find-and-replace-in-project-files'], function () {
	var newName = process.argv[4];
	var className = newName.charAt(0).toUpperCase() + newName.substr(1).replace('-', '');

	gulp.src(['demo/src/app/**.*'])
		.pipe(replace('ngx-template', newName))
		.pipe(replace('NGXTemplate', className))
		.pipe(gulp.dest('demo/src/app/'));

});
gulp.task('rename-files-1', ['find-and-replace-in-root-files', 'find-and-replace-in-project-files', 'find-and-replace-in-demo-files'], function () {
	var newName = process.argv[4];
	var className = newName.charAt(0).toUpperCase() + newName.substr(1).replace('-', '');

	return gulp.src(['./ngx-template/src/app/ngx-template.component.ts'])
		.pipe(rename(newName + '.component.ts'))
		.pipe(gulp.dest('./ngx-template/src/app/'));

});

gulp.task('rename-files-2', ['find-and-replace-in-root-files', 'find-and-replace-in-project-files', 'find-and-replace-in-demo-files'], function () {
	var newName = process.argv[4];
	var className = newName.charAt(0).toUpperCase() + newName.substr(1).replace('-', '');

	return gulp.src(['./ngx-template/src/app/ngx-template.module.ts'])
		.pipe(rename(newName + '.module.ts'))
		.pipe(gulp.dest('./ngx-template/src/app/'));

});

gulp.task('move', ['find-and-replace-in-root-files', 'find-and-replace-in-project-files', 'find-and-replace-in-demo-files', 'rename-files-1', 'rename-files-2',], function () {
	var newName = process.argv[4];
	return gulp.src(['ngx-template/**/*', '!ngx-template/src/app/ngx-template.*'])
		.pipe(gulp.dest(newName));
});


gulp.task('cleanup', ['find-and-replace-in-root-files', 'find-and-replace-in-project-files', 'find-and-replace-in-demo-files', 'rename-files-1', 'rename-files-2','move',], function () {
	deleteFolderRecursive('ngx-template');
})