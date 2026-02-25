// ═══════════════════════════════════════════════════════════
// GULPFILE.JS - AUTOMAÇÃO DE TAREFAS
// ═══════════════════════════════════════════════════════════
// Este arquivo configura as tarefas do Gulp para:
// 1. Compilação de SASS
// 2. Compressão de imagens
// 3. Minificação de JavaScript

const gulp = require('gulp');
const gulpSass = require('gulp-sass');
const sass = require('sass');
const imagemin = require('gulp-imagemin');
const uglify = require('gulp-uglify');
const concat = require('gulp-concat');
const sourcemaps = require('gulp-sourcemaps');

// ═══════════════════════════════════════════════════════════
// INJETAR O COMPILADOR SASS EXPLICITAMENTE
// ═══════════════════════════════════════════════════════════
// Necessário para gulp-sass v5+

const sassCompiler = gulpSass(sass);

// ═══════════════════════════════════════════════════════════
// TAREFA 1: COMPILAÇÃO DE SASS
// ═══════════════════════════════════════════════════════════
// Compila arquivos SASS em CSS minificado

function compileSass() {
    return gulp
        .src('src/sass/**/*.scss')
        .pipe(sourcemaps.init())
        .pipe(
            sassCompiler({
                outputStyle: 'compressed'
            }).on('error', sassCompiler.logError)
        )
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest('dist/css'));
}

// ═══════════════════════════════════════════════════════════
// TAREFA 2: COMPRESSÃO DE IMAGENS
// ═══════════════════════════════════════════════════════════
// Otimiza e comprime imagens em PNG, JPG, GIF e SVG

function compressImages() {
    return gulp
        .src('src/images/**/*.{png,jpg,jpeg,gif,svg}')
        .pipe(
            imagemin([
                imagemin.mozjpeg({ quality: 75, progressive: true }),
                imagemin.optipng({ optimizationLevel: 5 }),
                imagemin.svgo({
                    plugins: [
                        {
                            removeViewBox: false
                        }
                    ]
                })
            ])
        )
        .pipe(gulp.dest('dist/images'));
}

// ═══════════════════════════════════════════════════════════
// TAREFA 3: MINIFICAÇÃO DE JAVASCRIPT
// ═══════════════════════════════════════════════════════════
// Concatena e minifica arquivos JavaScript

function minifyJs() {
    return gulp
        .src('src/js/**/*.js')
        .pipe(sourcemaps.init())
        .pipe(concat('main.min.js'))
        .pipe(uglify())
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest('dist/js'));
}

// ═══════════════════════════════════════════════════════════
// TAREFA 4: OBSERVAR MUDANÇAS (WATCH)
// ═══════════════════════════════════════════════════════════
// Monitora alterações nos arquivos e executa as tarefas automaticamente

function watch() {
    gulp.watch('src/sass/**/*.scss', compileSass);
    gulp.watch('src/images/**/*.{png,jpg,jpeg,gif,svg}', compressImages);
    gulp.watch('src/js/**/*.js', minifyJs);
}

// ═══════════════════════════════════════════════════════════
// TAREFA PADRÃO (DEFAULT)
// ═══════════════════════════════════════════════════════════
// Executa todas as tarefas quando 'gulp' é digitado no terminal

const build = gulp.parallel(compileSass, compressImages, minifyJs);
const defaultTask = gulp.series(build, watch);

// ═══════════════════════════════════════════════════════════
// EXPORTAR TAREFAS
// ═══════════════════════════════════════════════════════════

exports.sass = compileSass;
exports.images = compressImages;
exports.js = minifyJs;
exports.watch = watch;
exports.build = build;
exports.default = defaultTask;
