module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    uglify: {
      options: {
        banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
      },
      build: {
        src: 'src/<%= pkg.name %>.js',
        dest: 'build/<%= pkg.name %>.min.js'
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
      jade: {
        files: 'src/**/*.jade',
        tasks: ['jade:compile']
      }
    }   
  });

  // Load the plugin that provides the "uglify" task.
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-jade');

  // Default task(s).
  grunt.registerTask('default', ['uglify, jade']);
};