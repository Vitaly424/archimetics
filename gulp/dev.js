const gulp = require('gulp')
const pug = require('gulp-pug')
// HTML
const fileInclude = require('gulp-file-include')
const sass = require('gulp-sass')(require('sass'))
const sassGlob = require('gulp-sass-glob')
const server = require('gulp-server-livereload')
const clean = require('gulp-clean')
const fs = require('fs')
const sourceMaps = require('gulp-sourcemaps')
const plumber = require('gulp-plumber')
const notify = require('gulp-notify')
const webpack = require('webpack-stream')
const babel = require('gulp-babel')
const imagemin = require('gulp-imagemin')
const changed = require('gulp-changed')
const typograf = require('gulp-typograf')
const svgsprite = require('gulp-svg-sprite')
const replace = require('gulp-replace')
const webpHTML = require('gulp-webp-retina-html')
const imageminWebp = require('imagemin-webp')
const rename = require('gulp-rename')
const prettier = require('@bdchauvette/gulp-prettier')

const path = require('path')

gulp.task('clean:dev', function(done) {
	if (fs.existsSync('./build/')) {
		return gulp
			.src('./build/', { read: false })
			.pipe(clean({ force: true }))
	}
	done()
})

const fileIncludeSetting = {
	prefix: '@@',
	basepath: '@file',
}

function loadJsonFiles(directory) {
	const files = fs.readdirSync(directory)
	const jsonFiles = files.filter(file => path.extname(file) === '.json')
	const jsonData = {}

	jsonFiles.forEach(file => {
		const filePath = path.join(directory, file)
		const fileName = path.basename(file, '.json')
		jsonData[fileName] = JSON.parse(fs.readFileSync(filePath, 'utf8'))
	})

	return jsonData
}

const plumberNotify = title => {
	return {
		errorHandler: notify.onError({
			title: title,
			message: 'Error <%= error.message %>',
			sound: false,
		}),
	}
}

gulp.task('pug:dev', function() {
	const jsonData = loadJsonFiles(path.resolve(__dirname, '../src/data/'))

	return (
		gulp
			.src([
				'./src/pug/pages/*.pug',
				'!./**/blocks/**/*.*',
				'!./src/pug/docs/**/*.*',
			])
			.pipe(changed('./build/', { hasChanged: changed.compareContents }))

			.pipe(plumber(plumberNotify('Pug')))
			.pipe(
				pug({
					locals: {
						...jsonData,
					},
					pretty: true,
				})
			)
			// .pipe(fileInclude(fileIncludeSetting))
			.pipe(
				replace(/<img(?:.|\n|\r)*?>/g, function(match) {
					return match
						.replace(/\r?\n|\r/g, '')
						.replace(/\s{2,}/g, ' ')
				})
			) //удаляет лишние пробелы и переводы строк внутри тега <img>
			.pipe(
				replace(
					/(?<=src=|href=|srcset=)(['"])(\.(\.)?\/)*(img|images|fonts|css|scss|sass|js|files|audio|video)(\/[^\/'"]+(\/))?([^'"]*)\1/gi,
					'$1./$4$5$7$1'
				)
			)
			.pipe(
				typograf({
					locale: ['ru', 'en-US'],
					htmlEntity: { type: 'digit' },
					safeTags: [
						['<\\?php', '\\?>'],
						['<no-typography>', '</no-typography>'],
					],
				})
			)
			.pipe(
				webpHTML({
					extensions: ['jpg', 'jpeg', 'png', 'gif', 'webp'],
				})
			)
			.pipe(
				prettier({
					tabWidth: 4,
					useTabs: true,
					printWidth: 182,
					trailingComma: 'es5',
					bracketSpacing: false,
				})
			)
			.pipe(gulp.dest('./build/'))
	)
})

gulp.task('sass:dev', function() {
	return gulp
		.src('./src/scss/*.scss')
		.pipe(changed('./build/css/'))
		.pipe(plumber(plumberNotify('SCSS')))
		.pipe(sourceMaps.init())
		.pipe(sassGlob())
		.pipe(sass())
		.pipe(
			replace(
				/(['"]?)(\.\.\/)+(img|images|fonts|css|scss|sass|js|files|audio|video)(\/[^\/'"]+(\/))?([^'"]*)\1/gi,
				'$1$2$3$4$6$1'
			)
		)
		.pipe(sourceMaps.write())
		.pipe(gulp.dest('./build/css/'))
})

gulp.task('images:dev', function() {
	return (
		gulp
			.src([
				'./src/img/**/*',
				'!./src/img/svgicons/**/*',
				'!./src/img/icons/**/*',
				'!./src/img/favicons/**/*',
			])
			.pipe(changed('./build/img/'))
			.pipe(
				imagemin([
					imageminWebp({
						quality: 85,
					}),
				])
			)

			.pipe(
				rename(function(path) {
					if (path.extname) {
						path.extname = '.webp'
					}
				})
			)
			.pipe(gulp.dest('./build/img/'))
			.pipe(gulp.src(['./src/img/**/*', '!./src/img/svgicons/**/*']))
			.pipe(changed('./build/img/'))
			// .pipe(imagemin({ verbose: true }))
			.pipe(gulp.dest('./build/img/'))
	)
})

const svgStack = {
	mode: {
		stack: {
			example: true,
		},
	},
	shape: {
		transform: [
			{
				svgo: {
					js2svg: { indent: 4, pretty: true },
				},
			},
		],
	},
}

const svgSymbol = {
	mode: {
		symbol: {
			sprite: '../sprite.symbol.svg',
		},
	},
	shape: {
		transform: [
			{
				svgo: {
					js2svg: { indent: 4, pretty: true },
					plugins: [
						{
							name: 'removeAttrs',
							params: {
								attrs: '(fill|stroke)',
							},
						},
					],
				},
			},
		],
	},
}

gulp.task('svgStack:dev', function() {
	return gulp
		.src('./src/img/svgicons/**/*.svg')
		.pipe(plumber(plumberNotify('SVG:dev')))
		.pipe(svgsprite(svgStack))
		.pipe(gulp.dest('./build/img/svgsprite/'))
})

gulp.task('svgSymbol:dev', function() {
	return gulp
		.src('./src/img/svgicons/**/*.svg')
		.pipe(plumber(plumberNotify('SVG:dev')))
		.pipe(svgsprite(svgSymbol))
		.pipe(gulp.dest('./build/img/svgsprite/'))
})

gulp.task('files:dev', function() {
	return gulp
		.src('./src/files/**/*')
		.pipe(changed('./build/files/'))
		.pipe(gulp.dest('./build/files/'))
})

gulp.task('js:dev', function() {
	return (
		gulp
			.src('./src/js/*.js')
			.pipe(changed('./build/js/'))
			.pipe(plumber(plumberNotify('JS')))
			// .pipe(babel())
			.pipe(webpack(require('./../webpack.config.js')))
			.pipe(gulp.dest('./build/js/'))
	)
})

const serverOptions = {
	livereload: true,
	open: true,
}

gulp.task('server:dev', function() {
	return gulp.src('./build/').pipe(server(serverOptions))
})

gulp.task('watch:dev', function() {
	gulp.watch('./src/scss/**/*.scss', gulp.parallel('sass:dev'))
	gulp.watch('./src/pug/**/*.scss', gulp.parallel('sass:dev'))
	gulp.watch(
		['./src/pug/**/*.pug', './src/pug/**/*.json'],
		gulp.parallel('pug:dev')
	)
	gulp.watch('./src/img/**/*', gulp.parallel('images:dev'))
	gulp.watch('./src/files/**/*', gulp.parallel('files:dev'))
	gulp.watch('./src/js/**/*.js', gulp.parallel('js:dev'))
	gulp.watch(
		'./src/img/svgicons/*',
		gulp.series('svgStack:dev', 'svgSymbol:dev')
	)
})
