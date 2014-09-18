define([
  'jquery',
  'underscore',
  'config',
  'backbone',
  'router'
], function($, _, config, Backbone) {

  function getColor(sentiment) {
    var colors = config.CLOUD.colors;
    var color = colors[0];

    _.keys(colors).some(function(key) {
      if(key > sentiment) return true;
      color = colors[key];
    });

    return color;
  }

  var WordView = Backbone.View.extend({
    tagName: 'span',

    initialize: function() {
      var $el = this.$el
        , model = this.model;

      var data = _.clone(model.attributes);

      $el.addClass(getColor(data.sentimentScore));

      $el.html(data.label);

      return this;
    },

    events: {
      'click': function() {
        var id = encodeURIComponent(this.model.get('id'));
        var url = '/topics/' + id;
        Backbone.history.navigate(url, true)
      }
    },

    setSize: function(size) {
      this.$el.css('font-size', size);
    },

    cloudView: null
  });

  return WordView;
});