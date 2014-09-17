require.config({
  paths: {
    underscore: '/public/vendor/underscore/underscore',
    backbone: '/public/vendor/backbone/backbone'
  }
});

require([
  'app',
], function(App){
  App.initialize();
});
