define([
  'jquery',
  'underscore',
  'micro',
  'config',
  'backbone'
], function($, _, µ, config, Backbone) {

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
    tagName: 'li',

    pos: new µ.Point(0, 0),

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

    setDims: function(dims) {
      this.dimensions = dims;
    },

    setScale: function(scale) {
      var dim = this.dimensions;
      this.$el.css({
        left: dim.x * scale,
        top: dim.y * scale
      });
    }
  });

  return WordView;
});