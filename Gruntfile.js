/**
 * grunt-boiler
 * 
 * ** 開発開始手順
 * 
 * $ npm install
 * $ grunt sprite
 * $ grunt
 * 
 * ** 開発watchコマンド
 * 
 * $ grunt watch
 * 
 * ** testコマンド
 * 
 * $ grunt test
 * 
 * ---------------------------------------------------------------------- */

module.exports = function (grunt) {

    // manage
    require('time-grunt')(grunt);
    require('jit-grunt')(grunt, {
        // sprite
        sprite: 'grunt-spritesmith'
    });


    // process
    grunt.initConfig({

        path: {
            src: 'src/',
            dist: 'dist/',
            tmp: 'tmp/',
            html_src: 'src/hbs/',
            scss_src: 'src/scss/',
            js_src: 'src/js/',
            sprite_src: 'src/sprite/'
        },

        pkg: grunt.file.readJSON('package.json'),

        clean: ['<%= path.tmp %>', '<%= path.dist %>'],

        sprite: {
            sample: {
                src: '<%= path.sprite_src %>sprite-sample/*.png',
                dest: '<%= path.dist %>img/sprite-sample.png',
                imgPath: '../img/sprite-sample.png',
                destCss: '<%= path.scss_src %>all/module/sprite-sample.scss',
                padding: 5
            }
        },

        sass: {
            all: {
                options: {
                    style: 'compact',
                    sourcemap: 'none',
                    noCache: true
                },
                files: {
                    '<%= path.tmp %>css/all.css': '<%= path.scss_src %>all/import.scss'
                }
            }
        },

        autoprefixer: {
            options: {
                browsers: ['last 2 version', 'ie 7', 'ie 8', 'ie 9']
            },
            file: {
                src: '<%= path.tmp %>css/all.css',
                dest: '<%= path.tmp %>css/all.css'
            },
        },

        csscomb: {
            app: {
                files: {
                    '<%= path.tmp %>css/all.css': '<%= path.tmp %>css/all.css'
                }
            }
        },

        csso: {
            app: {
                options: {
                    restructure: false
                },
                files: {
                    '<%= path.dist %>css/all.css': '<%= path.tmp %>css/all.css'
                }
            }
        },

        copy: {
            js_lib: {
                files: [
                    {
                        expand: true,
                        cwd: '<%= path.js_src %>',
                        src: ['lib.js'],
                        dest: '<%= path.dist %>js'
          }
        ]
            }
        },

        concat: {
            options: {
                banner : [
                    '(function(WIN, $, PROJECTNAMESPACE){',
                    "  'use strict';",
                    '  PROJECTNAMESPACE = PROJECTNAMESPACE || {};',
                    '',
                    ''
                ].join('\n'),
                footer : [
                    '',
                    '',
                    '})(window, window.jQuery, window.PROJECTNAMESPACE);'
                ].join('\n')
            },
            all: {
                src: [
          '<%= path.js_src %>all/utility.js',
          '<%= path.js_src %>all/sample_a.js',
          '<%= path.js_src %>all/sample_b.js'
        ],
                dest: '<%= path.tmp %>js/all.js'
            }
        },

        uglify: {
            options: {
                compress: {
                    drop_console: false
                }
            },
            app: {
                files: {
                    '<%= path.dist %>js/all.js': '<%= path.tmp %>js/all.js'
                }
            }
        },

        assemble: {
            options: {
                data: ['<%= path.html_src %>data/*.json'],
                layoutdir: '<%= path.html_src %>layout/',
                partials: '<%= path.html_src %>include/*.hbs',
                pkg: '<%= pkg %>',
                assets: ''
            },
            files: {
                expand: true,
                cwd: '<%= path.html_src %>html/',
                src: '**/*.hbs',
                dest: '<%= path.dist %>'
            }
        },

        watch: {
            css: {
                files: ['src/**/*.scss'],
                tasks: ['build:css'],
                options: {
                    livereload: true
                }
            },
            js: {
                files: ['src/**/*.js'],
                tasks: ['build:js']
            },
            html: {
                files: ['src/**/*.hbs', 'src/**/*.json'],
                tasks: ['build:html']
            },
            options: {
                livereload: true
            }
        },

        jshint: {
            all: ['Gruntfile.js', '<%= path.js_src %>all/*.js']
        },

    });


    grunt.registerTask('build:html', ['assemble']);
    grunt.registerTask('build:css', ['sass', 'autoprefixer', 'csscomb', 'csso']);
    grunt.registerTask('build:js', ['copy', 'concat', 'uglify']);
    grunt.registerTask('build', ['clean', 'build:html', 'build:css', 'build:js']);
    grunt.registerTask('test', ['jshint']);
    grunt.registerTask('styleguide', ['build', 'styledocco']);
    grunt.registerTask('default', 'build');
};
