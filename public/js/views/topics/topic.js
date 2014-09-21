define([
  'jquery',
  'underscore',
  'config',
  'backbone',

  'models/topic'
], function($, _, config, Backbone) {

  /**
   * The view representing the Topic data
   *
   * @constructor
   */

  var TopicView = Backbone.View.extend({
    el: $('#topic'),

    template: _.template($('#topic-template').html()),

    initialize: function() {
      this.model.on('sync', this.render, this);
      this.model.fetch();
    },

    render: function() {
      var attrs = _.clone(this.model.attributes);
      this.$el.html(this.template(attrs));
    }
  });

  return TopicView;
});