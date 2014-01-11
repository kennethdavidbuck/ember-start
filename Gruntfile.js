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
                'app/core/views/*.js',
                'app/core/models/*.js',
                'app/core/controllers/*.js',
				'app/**/views/**/*.js',
				'app/**/routes/**/*.js',
				'app/**/models/**/*.js',
				'app/modules/**/*.js'
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
					$:true,
					App:true,
					JQ:true,
					RL:true
				}
			}
		},
		concat: {
			debug: {
				src:[
					//
					'vendor/modernizr/modernizr.js',
					'vendor/jquery/jquery.js',
					'vendor/jquery.transit/jquery.transit.js',
					'vendor/handlebars/handlebars.js',
					'vendor/ember/ember.js',
					'vendor/ember-restless/dist/ember-restless.js',
					'vendor/moment/moment.js',
                    'vendor/retina.js/src/retina.js',

					// Mixins / Helpers
					'app/mixins/*.js',
					'app/helpers/*.js',

					// App Instantiation
					'app/app.js',
					'app/router.js',
                    'app/data/adapter.js',
					'app/data/store.js',
					
					// Core MVC
					'app/core/mixins/*.js',
					'app/core/models/*.js',
					'app/core/controllers/*.js',
					'app/core/views/*.js',
					
					// App MVC
					'app/models/*.js',
					'app/models/user/*.js',
					'app/controllers/*.js',
					'app/views/*.js',
					
					// Initializers
					'app/initializers.js',
					
					// Modules
					'app/modules/**/routes/*.js',
					'app/modules/**/models/*.js',
					'app/modules/**/controllers/*.js',
					'app/modules/**/views/*.js',
					
					// compiled templates
					'app/templates/templates.js',
					
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
		emberTemplates: {
			compile: {
				options: {
					templateName: function(sourceFile) {
						var pieces = sourceFile.split("/");
						pieces = pieces[pieces.length - 1]; // output: _header.hbs
						return pieces.replace("&","/");
					}
				},
				files: {
					"app/templates/templates.js": [
						"app/**/*.hbs"
					]
				}
			}
		},
		less: {
			development: {
				options: {
					paths: [
						"app/less/imports",
						"app/less/imports/**"
					]
				},
				files: {
					"debug/app.css": "app/less/style.less"
				}
			}
		},

		clean: ["debug/images/", "release/images/"],
		copy: {
			main: {
				files: [
					{expand:true, cwd:'app/images/', src: ['**'], dest: 'debug/images/'},
					{expand:true, cwd:'app/images/', src: ['**'], dest: 'release/images/'},
					
					// public 
					{expand:true, cwd:'app/public/', src: ['**'], dest: 'debug/'},
					{expand:true, cwd:'app/public/', src: ['**'], dest: 'release/'}
				]
			}
		},
		uglify: {
			build: {
				src: 'debug/app.js',
				dest:'release/app.js'
			}
		},
		watch: {
			scripts: {
				files: [
					'app/**/*.js',
					'app/**/*.hbs',
					'app/**/*.less',
					'Gruntfile.js'
				],
				tasks: ['jshint','emberTemplates','less','concat','qunit','yuidoc'],
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
		cssmin: {
			minify: {
				src: 'debug/app.css',
				dest: 'release/app.css'
			}
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
			},
			release: {
				options: {
					port: 9094,
					base:'release'
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
	grunt.loadNpmTasks('grunt-ember-templates');
    grunt.loadNpmTasks('grunt-contrib-connect');
    grunt.loadNpmTasks('grunt-contrib-qunit');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-cssmin');


	grunt.registerTask('default', ['jshint','emberTemplates','concat','less','clean','copy','connect','qunit','yuidoc','watch']);
	grunt.registerTask('release', ['uglify','cssmin','clean','copy']);
};
