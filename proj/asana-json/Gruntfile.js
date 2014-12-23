module.exports = function(grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    targethtml: {
      dist: {
        files: {
          'index.html': 'index.dev.html'
        }
      }
    },
    react: {
      files: {
        expand: true,
        cwd: 'src/',
        src: ['**/*.jsx'],
        dest: 'build/',
        ext: '.js'
      }
    },
    watch: {
      devindex: {
        files: 'index.dev.html',
        tasks: ['targethtml'],
      },
      react: {
        files: 'src/**/*.jsx',
        tasks: ['react']
      }
    },
  });
  
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-targethtml');
  grunt.loadNpmTasks('grunt-react');
  
  grunt.registerTask('default', ['targethtml','react','watch']);
  
};