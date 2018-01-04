module.exports = function(grunt) {
	// 项目配置
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),

		clean: {
			build: {
				src: ["tmp/**/*.*"]
			}
		},

		copy: {
			libjs: {
				files: [{
					expand: true,
					cwd: 'js/lib',
					src: '**/*.*',
					dest: 'tmp/js/lib'
				}]
			},
			 others: {
			 	files: [{
			 		expand: true,
			 		cwd: 'images/',
			 		src: '**/*.*',
			 		dest: 'tmp/images/'
			 	}, {
			 		expand: true,
			 		cwd: 'fonts',
			 		src: '**/*.*',
			 		dest: 'tmp/fonts'
			 	}]
			 },
			originjs: {
				files: [{
					expand: true,
					cwd: 'js/',
					src: '**/*.*',
					dest: 'tmp/js/'
				}]
			}
		},

		jshint: {
			options: {
				curly: true,
				eqeqeq: true,
				immed: true,
				latedef: true,
				newcap: true,
				noarg: true,
				sub: true,
				// undef: true,
				unused: false,
				boss: true,
				eqnull: true,
				browser: true,
				node: true,
				globals: {
					jQuery: true
				}
			},
			lib_test: {
				src: ['js/**/*.js',
					'!js/**/template.js',
					'!js/lib/**/*.js'
				]
			}
		},
		tmod: {
			base: {
				src: 'tpls/base/**/*.html',
				dest: 'js/common/template.js',
				options: {
					base: 'tpls/base'
				}
			}
		},
		requirejs: {
			minjs: {
				options: {
					baseUrl: 'js/',
					dir: 'tmp/js/',
					keepBuildDir: true,
					mainConfigFile: 'config.js',
					modules: [{
						name: 'common/base',
						exclude: [
							'jquery'
						]
					}],
					fileExclusionRegExp:/^(lib)$/
				}
			},
			origin: {
				options: {
					baseUrl: 'js/',
					dir: 'tmp/js/',
					keepBuildDir: true,
					mainConfigFile: 'config.js'
				}
			}
		},

		compass: {
			compile: {
				options: {
					sassDir: 'sass/',
					cssDir: 'css/',
					imagesDir: 'images/',
					//httpPath: "..",
					relativeAssets: true,
					//outputStyle: 'compressed',
					environment: 'development' //'development' //production
				}
			},
			publish: {
				options: {
					sassDir: 'sass/',
					cssDir: 'tmp/css/',
					imagesDir: 'images/',
					httpPath: "/static/",
					httpImagesPath: '/static/images/',
					httpGeneratedImagesPath: '/static/images/',
					//relativeAssets: true,
					//outputStyle: 'compressed',
					environment: 'production' //'development' //production
				}
			}
		},

		watch: {
			sass: {
				files: ['sass/**/*.scss'],
				tasks: ['compass'],
				options: {
					spawn: true
				}
			},
			template: {
				files: ['tpls/**/*.html'],
				tasks: ['tmod'],
				options: {
					spawn: true
				}
			}
		}
	});

	//加载插件
	grunt.loadNpmTasks('grunt-tmod'); //模板引擎
	grunt.loadNpmTasks('grunt-contrib-concat'); //合并
	grunt.loadNpmTasks('grunt-contrib-jshint'); //语法检测
	grunt.loadNpmTasks('grunt-contrib-uglify'); //压缩
	grunt.loadNpmTasks('grunt-contrib-watch'); //代码变化监控
	grunt.loadNpmTasks('grunt-contrib-requirejs'); //requirejs打包压缩
	grunt.loadNpmTasks('grunt-contrib-compass'); //压缩compass
	grunt.loadNpmTasks('grunt-contrib-copy');
	grunt.loadNpmTasks('grunt-contrib-clean');

	// 编译测试
	grunt.registerTask('default', ['clean', 'compass:compile', 'tmod:base', 'copy:libjs', 'requirejs:minjs']);
	// 测试环境
	//grunt.registerTask('test', ['clean', 'compass:publish', 'tmod:base', 'copy:others', 'copy:originjs'])
		// 发布
	grunt.registerTask('publish', ['clean', 'compass:publish', 'tmod:base', 'copy:libjs', 'requirejs:minjs', 'copy:others']);
}