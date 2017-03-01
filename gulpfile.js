var fs = require('fs');
var gulp =require('gulp');
var replace = require('gulp-replace');


var deleteFolderRecursive = function(path) {
  if( fs.existsSync(path) ) {
    fs.readdirSync(path).forEach(function(file,index){
      var curPath = path + "/" + file;
      if(fs.lstatSync(curPath).isDirectory()) { // recurse
        deleteFolderRecursive(curPath);
      } else { // delete file
        fs.unlinkSync(curPath);
      }
    });
    fs.rmdirSync(path);
  }
};

gulp.task('default', ['rename', 'cleanup']);


gulp.task('rename',function(){
		var newName =process.argv[4];
		console.log(process.argv);
		var className = newName.charAt(0).toUpperCase() + newName.substr(1).replace('-','');

		gulp.src(['**.*','!gulpfile.js','.npmignore','.gitignore' ])
			.pipe(replace('ngx-template', newName))
			.pipe(replace('NGXTemplate', className))
			.pipe(gulp.dest(''));

		gulp.src(['ngx-template/src/app/**.*'])
			.pipe(replace('ngx-template', newName))
			.pipe(replace('NGXTemplate', className))
			.pipe(gulp.dest('ngx-template/src/app/'));


		gulp.src(['demo/src/app/**.*'])
			.pipe(replace('ngx-template', newName))
			.pipe(replace('NGXTemplate', className))
			.pipe(gulp.dest('demo/src/app/'));

		return gulp.src(['ngx-template'])
			.pipe(gulp.dest(newName));


});


gulp.task('cleanup',['rename'],function(){
	deleteFolderRecursive('ngx-template');
})