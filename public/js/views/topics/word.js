define([
  'jquery',
  'underscore',
  'micro',
  'config',
  'backbone'
], function($, _, µ, config, Backbone) {

  /**
   * Will decide which is the corresponding color based
   * in the configuration
   *
   * @param sentiment
   * @returns {String|Number}
   */

  function getColor(sentiment) {
    var colors = config.CLOUD.colors;
    var color = colors[0];

    _.keys(colors).some(function(key) {
      if(key > sentiment) return true;
      color = colors[key];
    });

    return color;
  }

  /**
   * Creates the view of the Word in the cloud
   *
   * @constructor
   */

  var WordView = Backbone.View.extend({
    tagName: 'li',

    pos: new µ.Point(0, 0),

    initialize: function() {
      var $el = this.$el
        , model = this.model;

      var data = _.clone(model.attributes);

      // assign the right color
      $el.addClass(getColor(data.sentimentScore));

      $el.html(data.label);

      return this;
    },

    events: {

      /**
       * Tells to Backbone to navigate to
       * the view of the corresponding topic
       */

      'click': function() {
        var id = encodeURIComponent(this.model.get('id'));
        var url = '/topics/' + id;
        Backbone.history.navigate(url, true)
      }
    },

    /**
     * Set the size of the text
     *
     * @param size
     */

    setSize: function(size) {
      // this cannot be done out of here as
      // the list of all the sizes is in the cloud view
      this.$el.css('font-size', size);
    },

    /**
     * Set the position and size of this object
     *
     * @param dims
     */

    setDims: function(dims) {
      this.dimensions = dims;
    },

    /**
     * Scale the word
     *
     * @param scale
     */

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