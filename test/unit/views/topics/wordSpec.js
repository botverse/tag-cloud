define([
  'jquery',
  'micro',
  'backbone',
  'views/topics/word',
  'models/topic',
  '../../../fixtures/topics'
], function($, µ, Backbone, WordView, TopicModel, fixtures) {
  describe('WordView', function() {
    beforeEach(function() {
      var model = new TopicModel(fixtures.topics[1]);
      this.view = new WordView({
        model: model
      });
    });

    it('should be a li element', function() {
      expect(this.view.el.tagName.toLowerCase()).toBe('li');
    });

    it('should change the size', function() {
      this.view.setSize('100px');
      expect(this.view.$el.css('font-size')).toBe('100px');
    });

    it('should relocate itself', function() {
      this.view.setDims(new µ.Rect(10, 10, 100, 100));
      this.view.setScale(0.5);
      expect(this.view.$el.css('left')).toBe('5px');
      expect(this.view.$el.css('top')).toBe('5px');
    });

    it('should change history on click', function() {
      spyOn(Backbone.history, 'navigate');
      this.view.$el.click();
      expect(Backbone.history.navigate).toHaveBeenCalledWith('/topics/02__Barcelona', true);
    });
  });
});