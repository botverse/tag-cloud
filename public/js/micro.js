define(function() {
  function Point(x, y) {
    this.x = x;
    this.y = y;
    this.add = function(point) {
      this.x = x + point.x;
      this.y = y + point.y;
      return this;
    };
  }

  function Rect(x, y, width, height) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
  }

  function collide(rect1, rect2) {
    var collision =
      !!(rect1.x < rect2.x + rect2.width &&
        rect1.x + rect1.width > rect2.x &&
        rect1.y < rect2.y + rect2.height &&
        rect1.height + rect1.y > rect2.y);
    return collision;
  }

  function batchCollide(rects) {
    return function(check) {
      return rects.some(function(rect) {
        if(collide(rect, check)) return true;
      });
    }
  }

  function center($el) {
    return new Point(
        $el.width() / 2,
        $el.width() / 4
    );
  }

  function displacement($el) {
    return function (point) {
      return new Point(
        point.x - $el.width() / 2,
        point.y - $el.height() / 2
      );
    };
  }

  function random(min, max) {
    return Math.random() * (max - min) + min;
  }

  function ellipse(dist, angle) {
    window.times = (window.times || 0)+1;
    return new Point(
      dist * 2 * Math.cos(angle * Math.PI),
      dist * Math.sin(angle * Math.PI)
    );
  }

  /**
   *
   * @param nr integer number of sizes
   * @param min integer smallest size
   * @param inc multiplier for size
   * @returns { [ Integer ] }
   */

  function genSizes(nr, min, inc) {
    function next(cumul) {
      if(cumul.length >= nr) {
        return cumul.map(function(size) {
          return ~~(size + .5);
        });
      }
      var last = cumul.slice(-1)[0];
      var current = last * inc;

      return next(cumul.concat([current]));
    }

    return next([min]);
  }

  return {
    Point: Point,
    Rect: Rect,
    collide: collide,
    batchCollide: batchCollide,
    center: center,
    displacement: displacement,
    random: random,
    genSizes: genSizes,
    ellipse: ellipse
  }
});