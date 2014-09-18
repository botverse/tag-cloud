define([
  'underscore',
  'backbone'
], function(_, Backbone) {
  var TopicModel = Backbone.Model.extend({
    urlRoot: '/api/topics'
  });

  return TopicModel;
});