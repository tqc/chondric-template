"use strict";
var gulp = require('gulp');
var server = require('gulp-develop-server');
var traceur = require("gulp-traceur");
var sourcemaps = require('gulp-sourcemaps');

var path = require("path");

var options = {
    hostSettings: {},
    dev: {},
    uat: {},
    prod: {},
    moduleMappings: {
        app: path.resolve(__dirname, "./clientapp")
    },
    sourceFolder: "./clientapp",
    cssEntryPoint: "./clientapp/css/index.scss",
    imageFolders: ["./clientapp/images"]
};

var tools = require("chondric/buildtools");
tools.init(options);


function buildServerApp() {
    return gulp.src('serverapp/**/*.js')
        .pipe(sourcemaps.init())
        .pipe(traceur({
            modules: 'commonjs',
            "sourceMaps": true,
            //            classes: false
        }))
        .pipe(sourcemaps.write("."))
        .pipe(gulp.dest('build/serverapp'));
}

gulp.task('build:serverapp', buildServerApp);

gulp.task('rebuildserver', function() {
    buildServerApp()
        .on("end", function() {
            server.restart();
        });
});


gulp.task('cordova', function() {
    tools.buildVariation("cordova", "dev", false, "../cordova/www");
});

gulp.task('build', tools.buildTask);

gulp.task('ondeploy', function() {
   buildServerApp();
   tools.buildVariation("web", "dev", false);
});


gulp.task('watch', function() {
    buildServerApp()
        .on("end", function() {
            console.log("Done build");
            server.listen({
                path: 'build/serverapp'
            });
            gulp.watch('serverapp/**/*.js', ["rebuildserver"]);
        });

    tools.buildVariation("web", "dev", true);
//    tools.buildVariation("cordova", "dev", true, "../cordova/www");

    server.listen({
        path: 'server'
    });



});
