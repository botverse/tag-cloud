define([
  'underscore',
  'backbone',
], function(_, Backbone){
  var AppRouter = Backbone.Router.extend({
    routes: {
      '/tags': 'showTags',
      '/tags/:id': 'showTag',
      
      '*actions': 'defaultAction'
    }
  });

  var initialize = function(){
    var app_router = new AppRouter;
    app_router.on('showProjects', function(){

    });

    Backbone.history.start();
  };
  return {
    initialize: initialize
  };
});
