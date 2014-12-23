module.exports = function(grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    targethtml: {
      dist: {
        files: {
          'index.html': 'index.dev.html'
        }
      }
    }
  });
  
  grunt.loadNpmTasks('grunt-targethtml');
  
  grunt.registerTask('default', ['targethtml']);
  
};