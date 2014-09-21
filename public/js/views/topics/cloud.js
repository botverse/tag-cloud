define([
  'jquery',
  'underscore',
  'micro',
  'backbone',

  'collections/topics',

  'views/topics/word'
], function($, _, µ, Backbone, TopicsCollection, WordView) {

  /**
   * To create an instance of the CloudView,
   * just pass the number of different sizes
   * and the multiplier between them.
   *
   * @constructor
   */
  var CloudView = Backbone.View.extend({
    tagName: 'div',

    el: '#cloud',

    initialize: function(nrsizes, increment) {
      var that = this;

      // TODO: would be reusable if the collection is passed,
      // or at least the url
      var collection = new TopicsCollection();

      this.collection = collection;

      // we need an array with the different sizes
      this.sizes = µ.genSizes(nrsizes, 1, increment).map(function(size){
        return size + 'em';
      });

      // everytime we add a word, we check if pushes
      // the boundaries of the min and max volume
      this.collection.on('add', this.calculate, this);
      // all of them are here, so let's do the trick
      this.collection.on('sync', this.addTopics, this);

      this.collection.fetch();

      // this is handy for resizing
      this.originalWidth = this.$el.width();

      // the minimum font size is determined by the cloud
      // container width
      this.$el.parent().css('font-size', this.originalWidth / 35);

      $(window).resize(function() {
        that.resize();
      });
    },

    /**
     * set the new scale to all words
     */

    resize: function() {
      var scale =  this.$el.width() / this.originalWidth;
      this.$el.css('font-size', scale + "em");
      _.each(this.words, function(word) {
        word.setScale(scale)
      });
    },

    /**
     * Check if the topic has a volume out
     * of boundaries
     *
     * @param topic
     */

    calculate: function(topic) {
      var boundaries = this.boundaries
        , min = boundaries.min
        , max = boundaries.max;

      var vol = topic.get('volume');

      if(min == null || min > vol) {
        boundaries.min = vol;
      }

      if(max == null || max < vol) {
        boundaries.max = vol;
      }
    },

    /**
     * Add all the topics and resize after
     */

    addTopics: function() {
      this.collection.each(function(topic) {
        this.addWordView(topic);
      }, this);
      this.resize();
    },

    /**
     * Create a view from every topic received.
     * Finds the size by it's segment in the collection,
     * and injects the element in this view
     *
     * @param topic
     */

    addWordView: function(topic) {
      var word = new WordView({ model: topic });
      var vol = word.model.get('volume');
      var size = this.getSize(vol);
      word.setSize(size);
      var $word = word.render().$el;
      this.$el.append($word);
      this.place(word);
    },

    /**
     * Finds out which is the corresponding
     * size in the size array.
     *
     * @param vol
     * @returns {Number}
     */

    getSize: function(vol) {
      var min = this.boundaries.min
        , max = this.boundaries.max
        , len = this.sizes.length;

      var diff = (max - min) / (len - 1);
      var pos = ~~((vol - min) / diff + .5);

      return this.sizes[pos];
    },

    /**
     * Relocates the word in the cloud.
     * It will draw concentric circles until finds a gap.
     *
     * @param word
     */

    place: function(word) {
      var $word = word.$el;
      var $el = this.$el;

      var center = µ.ellipseCenter($el);
      var disp = µ.displacement($word);
      var start = µ.random(0, 2);

      var rects = this.words.map(function(word) {
        return word.dimensions;
      });
      var collide = µ.batchCollide(rects);

      for (var dist = 0, found = false;
           dist < center.y || found === false;
           dist += 10) {

        if(found) break;

        for (var angle = 0; angle < 2; angle += .3) {
          var pushangle = (angle + start) % 2;
          var point = µ.ellipse(dist, pushangle);
          var pos = disp(point).add(center);

          var dim = new µ.Rect(
            pos.x,
            pos.y,
            $word.outerWidth(),
            $word.height()
          );

          if(!collide(dim)) {
            found = dim;
            break;
          }
        }
      }

      word.setDims(found);

      this.words.push(word);
    },

    sizes: null,

    boundaries: {
      min: null,
      max: null
    },

    words: [],

    originalWidth: null
  });

  return CloudView;
});
