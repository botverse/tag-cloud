define([
  'underscore',
  'config',
  'backbone',

  'views/topics/cloud',
  'views/topics/topic'
], function(_, config, Backbone, CloudView, TopicView) {
  var cc = config.CLOUD;
  var cloud = new CloudView(cc.nr, cc.inc).render();

  var AppRouter = Backbone.Router.extend({
    routes: {
      'topics': function() { },

      'topics/:id': function(id) {
        var topic = new TopicView(id);
      },
      
      '*any': function() {
        this.navigate('/topics', true);
      }
    }
  });

  var router = new AppRouter();

  Backbone.history.start({ pushState: true });

  return router;
});
