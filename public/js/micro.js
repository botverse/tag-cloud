define(function() {
  function Point(x, y) {
    this.x = x;
    this.y = y;
  }

  Point.prototype.add = function(point) {
    return new Point(this.x + point.x, this.y + point.y);
  };

  function Rect(x, y, width, height) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
  }

  Rect.prototype.collide = function(rect) {
    return collide(this, rect);
  };

  function collide(a, b) {
    window.times = (window.times || 0) + 1;
    var collision =
      !!(a.x < b.x + b.width &&
        a.x + a.width > b.x &&
        a.y < b.y + b.height &&
        a.height + a.y > b.y);
    return collision;
  }

  function batchCollide(rects) {
    return function(check) {
      return rects.some(function(rect) {
        if(rect.collide(check)) return true;
      });
    }
  }

  function ellipseCenter($el) {
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
    ellipseCenter: ellipseCenter,
    displacement: displacement,
    random: random,
    genSizes: genSizes,
    ellipse: ellipse
  }
});
