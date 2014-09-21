define(['config', 'jquery', 'micro', 'views/topics/cloud', '../../../fixtures/topics']
    , function(config, $, µ, CloudView, fixtures) {

  var cc = config.CLOUD;

  describe('Cloud view', function () {
    beforeEach(function () {
      this.container = $('<div><ul id="cloud"></ul></div>');
      $(document.body).append(this.container);
      spyOn($, 'ajax').and.callFake(function(options) {
        options.success(fixtures);
      });
      this.cloud = new CloudView(cc.nr, cc.inc);

      $(window).resize();
    });

    it('should have a collection', function () {
      expect(typeof this.cloud.collection).toBe('object');
    });

    it('should have 2 elements in the collection', function() {
      expect(this.cloud.collection.length).toBe(2);
    });

    it('should have placed two words which don\'n collide', function() {
      var elems = this.container.find('#cloud li');
      var rects = [];
      elems.each(function(i, elem) {
        $elem = $(elem);
        rects.push(new µ.Rect(
          $elem.css('left'),
          $elem.css('top'),
          $elem.css('width'),
          $elem.css('height')
        ));
      });
      expect(rects[0].collide(rects[1])).toBe(false);
    });

    afterEach(function() {
      this.cloud.remove();
      this.container.remove();
    });
  });
});