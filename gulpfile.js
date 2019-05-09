const gulp = require('gulp'),
    sass = require('gulp-sass'),
    browserSync = require('browser-sync'),
    concat = require('gulp-concat'),
    uglify = require('gulp-uglify-es').default,
    cleanCss = require('gulp-clean-css'),
    imageMin = require('gulp-imagemin'),
    autoPrefixer = require('gulp-autoprefixer'),
    pngQuant = require('imagemin-pngquant'),
    babel = require('gulp-babel'),
    cache = require('gulp-cache');




gulp.task('browserSync', function(){
    browserSync({
        server: {
            baseDir: 'src'
        },
        notify: false
    })
})

gulp.task('sass', function(){
    gulp.src('src/scss/**/*.scss')
    .pipe(sass())
    .pipe(autoPrefixer({
        browsers: ['last 2 version'],
        cascade: false
    }))
    .pipe(gulp.dest('src/css'))
    .pipe(browserSync.reload({
        stream: true
    }))
});

gulp.task('cleanCss', function(){
    gulp.src('src/css/*.css')
    .pipe(cleanCss())
    .pipe(gulp.dest('src/css'))
    .pipe(browserSync.reload({
        stream: true
    }))
});

gulp.task('scripts', function(){
    gulp.src('src/js/assest/*.js')
    .pipe(concat('main.min.js'))
    .pipe(uglify())
    .pipe(gulp.dest('src/js'))
    .pipe(browserSync.reload({
        stream: true
    }))
});


gulp.task('compressImg', () => {
    gulp.src('src/img/*')
    .pipe(cache(imageMin({
        interlaced: true,
        progressive: true,
        use: [pngQuant()]
    })))
    .pipe(gulp.dest('src/img'))
});

gulp.task('babel', () => {
    gulp.src('src/js/main.min.js')
    .pipe(babel({
        presets: ['@babel/env']
    }))
    .pipe(uglify())
    .pipe(gulp.dest('src/js'))
});

gulp.task('watch', ['browserSync', 'sass', 'scripts', 'cleanCss', 'babel'], function() {
    gulp.watch('src/scss/**/*.scss', ['sass'])
    gulp.watch('src/*.html', browserSync.reload)
    gulp.watch('src/js/**/*.js', ['scripts'])
    gulp.watch('src/css/**/*.css', ['cleanCss'])
    gulp.watch('src/js', ['babel'])
});

gulp.task('build', ['scripts', 'cleanCss', 'sass'], function(){
    const buildCss = gulp.src('src/css/*.css')
    .pipe(cleanCss())
    .pipe(gulp.dest('dist/css'))

    const buildJs = gulp.src('src/js/main.min.js')
    .pipe(gulp.dest('dist/js'))

    const buildFonts = gulp.src('src/fonts/**/*')
    .pipe(gulp.dest('dist/fonts'))

    const buildImg = gulp.src('src/img/**/*')
    .pipe(gulp.dest('dist/img'))

    const buildHtml = gulp.src('src/*.html')
    .pipe(gulp.dest('dist'));
});

gulp.task('clearCache', () => {
    return cache.clearAll();
})

gulp.task('default', ['watch']);