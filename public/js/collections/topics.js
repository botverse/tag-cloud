define([
  'underscore',
  'backbone',
  'models/topic'
], function(_, Backbone, TopicModel) {
  var TopicCollection = Backbone.Collection.extend({
    model: TopicModel,
    comparator: function(topic) { return -topic.get('volume') },
    url: '/api/topics',
    parse: function(response) {
      return response.topics;
    }
  });

  return TopicCollection;
});