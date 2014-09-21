define([
  'underscore',
  'config',
  'backbone',

  'models/topic',
  'views/topics/cloud',
  'views/topics/topic'
], function(_, config, Backbone, TopicModel, CloudView, TopicView) {
  var cc = config.CLOUD;

  (new CloudView(cc.nr, cc.inc).render());

  /*!
   * The cloud is a static view,
   * we will generate one TopicView each time the user
   * browses clicking in a word of the cloud
   */
  var AppRouter = Backbone.Router.extend({
    routes: {
      'topics': function() { },

      'topics/:id': function(id) {
        // TODO: Fix possible memory leaks ;-)
        (new TopicView({
          model: new TopicModel({ id: id })
        }));
      },
      
      '*any': function() {
        this.navigate('/topics', true);
      }
    }
  });

  var router = new AppRouter();

  // This won't work in IE9
  Backbone.history.start({ pushState: true });

  return router;
});
