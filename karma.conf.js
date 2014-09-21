// Karma configuration
// Generated on Sun Sep 21 2014 13:17:02 GMT+0100 (BST)

module.exports = function(config) {
  config.set({

    // base path that will be used to resolve all patterns (eg. files, exclude)
    basePath: '',


    // frameworks to use
    // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
    frameworks: ['jasmine', 'requirejs'],


    // list of files / patterns to load in the browser
    files: [
      'test/test-main.js',

      {pattern: 'public/vendor/jquery/dist/jquery.js', included: false},
      {pattern: 'public/vendor/underscore/underscore.js', included: false},
      {pattern: 'public/vendor/backbone/backbone.js', included: false},
      {pattern: 'public/vendor/requirejs-text/text.js', included: false},

      {pattern: 'public/js/**/*.js', included: false},
      {pattern: 'test/**/*Spec.js', included: false},
      {pattern: 'test/fixtures/**/*.js', included: false}
    ],

    reporters: ['progress', 'coverage'],


    // list of files to exclude
    exclude: [
      'public/js/bootstrap.js',
      'public/js/main.js',
      'public/js/router.js'
    ],


    // preprocess matching files before serving them to the browser
    // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
    preprocessors: {
      'public/js/**/*.js': ['coverage']
    },

    coverageReporter: {
      type : 'html',
      dir : 'coverage/'
    },


    // web server port
    port: 9876,


    // enable / disable colors in the output (reporters and logs)
    colors: true,


    // level of logging
    // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
    logLevel: config.LOG_INFO,


    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: true,


    // start these browsers
    // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
    browsers: ['PhantomJS'],


    // Continuous Integration mode
    // if true, Karma captures browsers, runs the tests and exits
    singleRun: false
  });
};
