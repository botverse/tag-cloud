define([
  'jquery',
  'underscore',
  'config',
  'backbone',

  'models/topic'
], function($, _, config, Backbone, TopicModel) {

  var TopicView = Backbone.View.extend({
    el: $('#topic'),

    template: _.template($('#topic-template').html()),

    initialize: function(topicId) {
      this.model = new TopicModel({ id: topicId });

      this.model.on('sync', this.render, this);

      this.model.fetch();
    },

    render: function() {
      var $el = this.$el
        , model = this.model;

      var data = _.clone(model.attributes);

      $el.html(this.template(data));

      return this;
    }
  });

  return TopicView;
});