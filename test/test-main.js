var allTestFiles = [];
var TEST_REGEXP = /(spec|test)\.js$/i;

var testPathToModule = function(path) {
  return path.replace(/^\/base\//, '../../').replace(/\.js$/, '');
};

Object.keys(window.__karma__.files).forEach(function(file) {
  if (TEST_REGEXP.test(file)) {
    // Normalize paths to RequireJS module names.
    allTestFiles.push(testPathToModule(file));
  }
});

require.config({
  // Karma serves files under /base, which is the basePath from your config file
  baseUrl: '/base/public/js',

  paths: {
    jquery: '../vendor/jquery/dist/jquery',
    underscore: '../vendor/underscore/underscore',
    backbone: '../vendor/backbone/backbone'
  },

  // dynamically load all test files
  deps: allTestFiles,

  // we have to kickoff jasmine, as it is asynchronous
  callback: window.__karma__.start
});
