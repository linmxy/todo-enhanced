/**
 *
 *  Web Starter Kit
 *  Copyright 2014 Google Inc. All rights reserved.
 *
 *  Licensed under the Apache License, Version 2.0 (the "License");
 *  you may not use this file except in compliance with the License.
 *  You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 *  Unless required by applicable law or agreed to in writing, software
 *  distributed under the License is distributed on an "AS IS" BASIS,
 *  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *  See the License for the specific language governing permissions and
 *  limitations under the License
 *
 */

/**
 * customized google web starter kit building file
 */


'use strict';

var gulp = require('gulp');
var $ = require('gulp-load-plugins')();
var del = require('del');
var runSequence = require('run-sequence');
var browserSync = require('browser-sync');
var pagespeed = require('psi');
var reload = browserSync.reload;

var AUTOPREFIXER_BROWSERS = [
    'ie >= 10',
    'ie_mob >= 10',
    'ff >= 30',
    'chrome >= 34',
    'safari >= 7',
    'opera >= 23',
    'ios >= 7',
    'android >= 4.4',
    'bb >= 10'
];

// Copy All Files At The Root Level (src)
gulp.task('copy', function () {
    return gulp.src([
        'src/*',
        '!src/*.html',
        '!src/sass'
    ], {
        dot: true
    }).pipe(gulp.dest('public'))
        .pipe($.size({title: 'copy'}));
});

// Lint JavaScript
gulp.task('jshint', function () {
    return gulp.src(['src/js/**/*.js', '!src/js/lib/**'])
        .pipe(reload({stream: true, once: true}))
        .pipe($.jshint())
        .pipe($.jshint.reporter('jshint-stylish'))
        .pipe($.if(!browserSync.active, $.jshint.reporter('fail')));
});

// Optimize Images
gulp.task('images', function () {
    return gulp.src('src/img/**/*')
        .pipe($.cache($.imagemin({
            progressive: true,
            interlaced: true
        })))
        .pipe(gulp.dest('public/img'))
        .pipe($.size({title: 'img'}));
});

gulp.task('javascripts', function () {
    return gulp.src([
            'src/js/**/*',
            '!src/js/lib/**'
        ])
        .pipe($.if('*.js', $.uglify({preserveComments: 'some'})))
        .pipe(gulp.dest('public/js'));
});

gulp.task('styles', function () {
    // For best performance, don't add Sass partials to `gulp.src`
    return gulp.src([
            'src/sass/*.sass',
            'src/css/**/*.css'
        ])
        .pipe($.changed('sass', {extension: '.sass'}))
        .pipe($.rubySass({
            style: 'expanded',
            precision: 10
        })
            .on('error', console.error.bind(console))
        )
        .pipe($.autoprefixer(AUTOPREFIXER_BROWSERS))
        .pipe(gulp.dest('.tmp/css'))
        .pipe($.if('*.css', $.csso()))
        .pipe(gulp.dest('public/css'))
        .pipe($.size({title: 'styles'}));
});

// Scan Your HTML For Assets & Optimize Them
gulp.task('html', function () {
    var assets = $.useref.assets({searchPath: '{.tmp,src}'});

    return gulp.src(['src/**/*.html', '!src/js/lib/**'])
        .pipe(assets)
        .pipe($.if('*.js', $.uglify({preserveComments: 'some'})))
        .pipe($.if('*.css', $.csso()))
        .pipe(assets.restore())
        .pipe($.useref())
//        .pipe($.replace('todo.css', 'todo.min.css'))
        .pipe($.if('*.html', $.minifyHtml()))
        .pipe(gulp.dest('public'))
        .pipe($.size({title: 'html'}));
});


gulp.task('bower', function() {
    return $.bower()
        .pipe(gulp.dest('public/js/lib/'))
});

gulp.task('clean', del.bind(null, ['.tmp', 'public']));

gulp.task('serve', ['styles'], function () {
    browserSync({
        notify: false,
        server: {
            baseDir: ['.tmp', 'src']
        }
    });

    gulp.watch(['src/**/*.html'], reload);
    gulp.watch(['src/sass/**/*.sass'], ['styles', reload]);
    gulp.watch(['src/css/**/*.css'], ['styles', reload]);
    gulp.watch(['src/js/**/*.js', '!src/js/lib/**'], ['jshint']);
    gulp.watch(['src/img/**/*'], reload);
});

gulp.task('serve:dist', ['default'], function () {
    browserSync({
        notify: false,
        server: {
            baseDir: 'public'
        }

    });
});

gulp.task('default', ['clean'], function (cb) {
    runSequence('styles', ['jshint','javascripts', 'html', 'images', 'bower', 'copy'], cb);
});

gulp.task('pagespeed', pagespeed.bind(null, {
    url: 'https://www.google.com',
    strategy: 'mobile'
}));

//// Load custom tasks from the `tasks` directory
//try {
//    require('require-dir')('tasks');
//} catch (err) {
//}