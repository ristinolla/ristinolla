module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    concat: {
      options: {
        // define a string to put between each file in the concatenated output
        separator: ';'
      },
      scripts: {
        // the files to concatenate
        src: ['src/js/main.js'],
        dest: 'assets/js/<%= pkg.slug %>.js'
      },
      libs: {
        src: ['bower_components/jquery/dist/jquery.js',
              'bower_components/retina.js/dist/retina.js',
              'bower_components/bootstrap/dist/bootstrap.js'],
        dest: 'assets/js/<%= pkg.slug %>.libs.js'
      }
    },

    jshint: {
      beforeconcat: ['src/js/<%= pkg.slug %>.js'],
      afterconcat: ['assets/js/<%= pkg.slug %>.js']
    },


    uglify: {
      options: {
       banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
      },
        dist: {
          files: {
            'assets/js/<%= pkg.slug %>.min.js': ['<%= concat.scripts.dest %>'],
            'assets/js/<%= pkg.slug %>.libs.min.js': ['<%= concat.libs.dest %>']
          }
        }
    },



    less: {
      development: {
        files: {
          "assets/css/<%= pkg.slug %>.css": "src/less/main.less",
        }
      },
      production: {
        options: {
          paths: ["assets/css"],
          cleancss: true,
          modifyVars: {
            imgPath: '"http://mycdn.com/path/to/images"',
          }
        },
        files: {
          "assets/css/<%= pkg.slug %>.css": "src/less/main.less"
        }
      }
    },

    cssmin: {
      combine: {
        files: {
          'assets/css/<%= pkg.slug %>.libs.css': [
                      'bower_components/normalize.css/normalize.css',
                      'assets/css/main.css' ]
        }
      },
      minify: {
        expand: true,
        cwd: 'assets/css/',
        src: ['*.css', '!*.min.css'],
        dest: 'assets/css/',
        ext: '.min.css'
      }
    },

    jade: {
      compile: {
        options: {
          pretty: true
        },
        data: {
          pluginVersion: '<%= pkg.version %>'
        },
        files: {
          'index.html' : 'src/index.jade'
        }
      }
    },




    watch: {
      styles: {
        // Which files to watch (all .less files recursively in the less directory)
        files: ['src/less/**/*.less'],
        tasks: ['less:development'],
        options: {
          nospawn: true
        }
      },
      jade: {
        files: 'src/**/*.jade',
        tasks: ['jade:compile']
      }

    }
  });

  // Load the plugin that provides the "uglify" task.
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-jade');
  grunt.loadNpmTasks('grunt-contrib-less');
  grunt.loadNpmTasks('grunt-contrib-cssmin');

  // Default task(s).
  grunt.registerTask('default', ['uglify', 'jade', 'less']);
  grunt.registerTask('build', [ 'concat','less:production', 'jade', 'cssmin', 'uglify']);
};
