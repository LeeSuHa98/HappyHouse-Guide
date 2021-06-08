module.exports = (grunt) ->

  grunt.initConfig

    coffee:
      app:
        options:
          bare: false
          join: true
        files:
          'index.js': ['index.coffee']

    browserify:
      basic:
        src: ['demo/index-pre-browserify.js']
        dest: 'demo/index.js'

    watch:
      coffee:
        files: ['index.coffee']
        tasks: ['coffee']
      browserify:
        files: ['index.js', 'demo/index-pre-browserify.js']
        tasks: ['browserify']

  grunt.loadNpmTasks 'grunt-browserify'
  grunt.loadNpmTasks 'grunt-contrib-coffee'
  grunt.loadNpmTasks 'grunt-contrib-watch'
  grunt.registerTask 'default', ['watch']