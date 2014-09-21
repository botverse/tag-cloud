define([
  'backbone',
  'models/topic'
], function(Backbone, TopicModel) {
  var TopicsCollection = Backbone.Collection.extend({
    model: TopicModel,
    comparator: function(topic) { return -topic.get('volume') },
    url: '/api/topics',
    parse: function(response) {
      return response.topics;
    }
  });

  return TopicsCollection;
});