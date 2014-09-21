define([
  'jquery',
  'underscore',
  'micro',
  'backbone',

  'collections/topics',

  'views/topics/word'
], function($, _, µ, Backbone, TopicsCollection, WordView) {


  var CloudView = Backbone.View.extend({
    tagName: 'div',

    el: '#cloud',

    initialize: function(nrsizes, increment) {
      var that = this;

      var collection = new TopicsCollection();

      this.collection = collection;

      this.sizes = µ.genSizes(nrsizes, 1, increment).map(function(size){
        return size + 'em';
      });

      this.collection.on('add', this.calculate, this);
      this.collection.on('sync', this.addTopics, this);

      this.collection.fetch();

      var width = this.$el.width();

      $(window).resize(function() {
        var scale =  that.$el.width() / width;
        that.$el.css('fonz-size', that.$el.width() * scale / 40);
        that.resize(scale);
      });
    },

    resize: function(scale) {
      _.each(this.wordDimensions, function(elem) {
        this.setSize(elem.word);
        elem.word.$el.css({
          left: elem.x * scale,
          top: elem.y * scale
        });
      }, this);
    },

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

    addTopics: function() {
      this.collection.each(function(topic) {
        this.addWordView(topic);
      }, this);
    },

    addWordView: function(topic) {
      var word = new WordView({ model: topic });
      this.setSize(word);
      var $word = word.render().$el;
      this.$el.append($word);
      this.place(word);
    },

    setSize: function(word) {
      var vol = word.model.get('volume');
      var size = this.getSize(vol);
      word.setSize(size);
    },

    getSize: function(vol) {
      var min = this.boundaries.min
        , max = this.boundaries.max
        , len = this.sizes.length;

      var diff = (max - min) / (len - 1);
      var pos = ~~((vol - min) / diff + .5);

      return this.sizes[pos];
    },

    place: function(word) {
      var $word = word.$el;
      var $el = this.$el;

      var center = µ.center($el);
      var disp = µ.displacement($word);
      var start = µ.random(0, 2);
      var collide = µ.batchCollide(this.wordDimensions);

      for (var dist = 0, found = false;
           dist < center.y || found === false;
           dist += 5) {
        if(found) break;
        for (var angle = 0; angle < 2; angle += .5) {
          var pushangle = (angle + start) % 2;
          var point = µ.ellipse(dist, pushangle);
          var pos = disp(point).add(center);

          var dim = new µ.Rect(
            pos.x,
            pos.y,
            $word.outerWidth(),
            $word.outerHeight()
          );

          if(!collide(dim)) {
            found = dim;
            break;
          }
        }
      }

      $word.css({
        left: found.x,
        top: found.y
      });

      found.word = word;

      this.wordDimensions.push(found);
    },

    sizes: null,

    boundaries: {
      min: null,
      max: null
    },

    wordDimensions: []
  });

  return CloudView;
});