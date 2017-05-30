#global module:false

"use strict"

module.exports = (grunt) ->
  grunt.loadNpmTasks "grunt-bower-task"
  grunt.loadNpmTasks "grunt-contrib-connect"
  grunt.loadNpmTasks "grunt-contrib-copy"
  grunt.loadNpmTasks "grunt-contrib-watch"
  grunt.loadNpmTasks "grunt-exec"

  grunt.initConfig

    copy:
      jquery:
        files: [{
          expand: true
          cwd: "bower_components/jquery/dist/"
          src: "jquery.min.js"
          dest: "source/vendor/js/"
        }]
      materialize:
        files: [{
          expand: true
          cwd: "bower_components/materialize/dist/css/"
          src: "materialize.min.css"
          dest: "source/vendor/css/"
        },
        {
          expand: true
          cwd: "bower_components/materialize/dist/js/"
          src: "materialize.min.js"
          dest: "source/vendor/js/"
        },
        {
          expand: true
          cwd: "bower_components/materialize/dist/fonts/"
          src: "roboto/"
          dest: "source/vendor/fonts/"
        }]

    exec:
      jekyll:
        cmd: "jekyll build --trace"

    watch:
      options:
        livereload: true
      source:
        files: [
          "source/_drafts/**/*"
          "source/_includes/**/*"
          "source/_layouts/**/*"
          "source/_posts/**/*"
          "source/assets/**/*"
          "_config.yml"
          "*.html"
          "*.md"
        ]
        tasks: [
          "exec:jekyll"
        ]

    connect:
      server:
        options:
          port: 4000
          base: 'build'
          livereload: true

  grunt.registerTask "build", [
    "copy"
    "exec:jekyll"
  ]

  grunt.registerTask "serve", [
    "build"
    "connect:server"
    "watch"
  ]

  grunt.registerTask "default", [
    "serve"
  ]
