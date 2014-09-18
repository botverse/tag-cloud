define([
  'underscore',
  'config',
  'backbone',
  'router',
  'views/topics/cloud'
], function(_, config, Backbone, router, CloudView) {
  var initialize = function() {
    router.initialize();
  };

  return {
    initialize: initialize
  };
});
