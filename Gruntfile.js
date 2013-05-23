module.exports = function(grunt) {
	'use strict';
	//All grunt related functions
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
	
		jshint: {
			files: [
				'gruntfile.js',
				'app/**/controllers/*.js',
				'app/*.js',
				'app/**/views/*.js',
				'app/**/routes/*.js',
				'app/**/models/*.js'
			],
			options: {
				eqeqeq:true,
				eqnull:true,
				strict:true,
				latedef:true,
				undef:true,
				globals: {
					window:true,
					force:true,
					jQuery: true,
					console:true,
					module:true,
					document:true,
					Ember:true,
					Em:true,
					Highcharts:true,
					$:true,
					App:true,
					JQ:true,
					DRILL:true,
					DS:true
				}
			}
		},
		concat: {
			dist: {
				src:[
					// Core Library
					'app/core/library/jquery-1.9.1.js',
					'app/core/library/jquery.transit.js',
					'app/core/library/handlebars-rc3.js',
					'app/core/library/ember-rc3.js',
					'app/core/library/ember-data.js',
					'app/core/library/moment-2.0.0.js',
					
					// Vendor
					'app/library/*.js',
					'app/library/jquery-ui-1.10.0/js/jquery-ui-1.10.0.custom.js',
					'app/library/highcharts/js/highcharts.js',
					'app/library/highcharts/js/highcharts-more.js',

					// Mixins / Helpers
					'app/mixins/*.js',
					'app/helpers/*.js',

					// App Instantiation
					'app/app.js',
					'app/router.js',
					'app/store.js',
					
					// Core MVC
					'app/core/mixins/*.js',
					'app/core/models/*.js',
					'app/core/controllers/*.js',
					'app/core/views/*.js',
					
					// App MVC
					'app/models/*.js',
					'app/models/user/*.js',
					'app/controllers/*.js',
					'debug/templates.js',
					'app/views/*.js',
					
					// Bootstrap
					'app/bootstrap.js',
					
					// Modules
					'app/modules/**/routes/*.js',
					'app/modules/**/models/*.js',
					'app/modules/**/controllers/*.js',
					'debug/module_templates.js',
					'app/modules/**/views/*.js',
					
					//
					'app/routes/*.js'
				],
				dest:'debug/app.js'
			},
			test: {
				src:['app/tests/*.js'],
				dest:'qunit/tests.js'
			}
		},
		ember_templates: {
			compile: {
				options: {
					templateName: function(sourceFile) {
						var pieces = sourceFile.split("/");
						return pieces[pieces.length - 1]; // output: _header.hbs
					}
				},
				files: {
					"debug/templates.js": [
						"app/**/*.hbs"
					]
				}
			}
		},
		less: {
			development: {
				options: {
					paths: [
						"app/css/imports",
						"app/css/imports/**"
					]
				},
				files: {
					"debug/app.css": "app/css/style.less"
				}
			},
			production: {
				options: {
					paths: [
						"app/css/imports",
						"app/css/imports/**"
					],
					yuicompress: true
				},
				files: {
					"release/app.css": "app/css/style.less"
				}
			}
		},

		clean: ["debug/images/", "release/images/"],
		copy: {
			main: {
				files: [
					{expand:true, cwd:'app/images/', src: ['**'], dest: 'debug/images/'},
					{expand:true, cwd:'app/images/', src: ['**'], dest: 'release/images/'}
				]
			}
		},
		uglify: {
			build: {
				src: 'debug/app.js',
				dest:'release/app.min.js'
			}
		},
		cssmin: {
			compress: {
				files: {
					"release/app.min.css":["debug/app.css"]
				}
			}
		},
		watch: {
			scripts: {
				files: [
					'app/**/*.js',
					'app/**/*.hbs',
					'app/**/*.less'	
				],
				tasks: ['jshint','ember_templates','less','concat','qunit','yuidoc'],
				options: {
					debounceDelay:300
				}
			},
			images: {
				files: ['app/images/*'],
				tasks:['clean', 'copy'],
				options: {
					debounceDelay:300
				}
			}
		},
		qunit: {
			all: ['qunit/index.html']
		},
		
		yuidoc: {
			compile: {
				name: 'Project Name',
				description: 'Project Description',
				version: '1.0',
				url: 'http://www.example.com',
				options: {
					paths: [
						'app/controllers/',
						'app/models/',
						'app/views/',
						'app/modules/',
						'app/routes/',
						'app/core/controllers/',
						'app/core/models/',
						'app/core/views/'
					],
					outdir: 'docs/'
				}
			}
		},
		connect: {
			debug: {
				options: {
					port:9091,
					base:'debug'
				}
			},
			test: {
				options: {
					port:9092,
					base:'qunit'
				}
			},
			docs: {
				options: {
					port: 9093,
					base:'docs'
				}
			}
		}
	});

    grunt.loadNpmTasks('grunt-contrib-yuidoc');
	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-less');
	grunt.loadNpmTasks('grunt-contrib-cssmin');
	grunt.loadNpmTasks('grunt-contrib-handlebars');
	grunt.loadNpmTasks('grunt-ember-templates');
    grunt.loadNpmTasks('grunt-contrib-connect');
    grunt.loadNpmTasks('grunt-contrib-qunit');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-copy');

	grunt.registerTask('default', ['jshint','ember_templates','concat','less','clean','copy','connect','qunit','yuidoc','watch']);
	grunt.registerTask('release', ['uglify','less','cssmin','clean','copy']);
};
