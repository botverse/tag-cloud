define([
  'backbone',
  'models/topic'
], function(Backbone, TopicModel) {
  var TopicsCollection = Backbone.Collection.extend({
    model: TopicModel,

    /**
     * Will be used to sort the collection by
     * volume
     *
     * @param topic
     * @returns {number}
     */

    comparator: function(topic) {
      return -topic.get('volume')
    },

    url: '/api/topics',

    /**
     * The response comes wrapped in a Javascript
     * object, the data is in the topics property
     *
     * @param response
     * @returns {topics|*}
     */

    parse: function(response) {
      return response.topics;
    }
  });

  return TopicsCollection;
});