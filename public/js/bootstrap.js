require.config({
  paths: {
    jquery: '/vendor/jquery/dist/jquery',
    underscore: '/vendor/underscore/underscore',
    backbone: '/vendor/backbone/backbone',
    text: '/vendor/requirejs-text/text'
  }
});

require([
  'app'
], function(App) {
  // Initialization technique similar to
  // http://backbonetutorials.com/organizing-backbone-using-modules/
  App.initialize();
});
