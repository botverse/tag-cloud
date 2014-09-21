define([
  'jquery',
  'micro',
  'backbone',
  'collections/topics',
  '../../fixtures/topics'
], function($, µ, Backbone, TopicsCollection, fixtures) {
  describe('WordView', function() {
    beforeEach(function () {
      spyOn($, 'ajax').and.callFake(function(options) {
        options.success(fixtures);
      });
      this.collection = new TopicsCollection();
      this.collection.fetch();
    });

    it('should have ordered the elements', function() {
      expect(this.collection.models[0].get('id')).toBe('02__Barcelona');
    });
  });
});