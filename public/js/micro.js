/**
 * The intention of this helper library is to facilitate
 * to the views the arithmetic of the cloud creation.
 */

define(function() {
  /**
   * Point constructor
   *
   * @param x
   * @param y
   * @constructor
   */

  function Point(x, y) {
    this.x = x;
    this.y = y;
  }

  /**
   * Returns a new Point as the result of
   * adding both coordinates
   *
   * @param point
   * @returns {Point}
   */

  Point.prototype.add = function(point) {
    return new Point(this.x + point.x, this.y + point.y);
  };

  /**
   * Rect constructor
   *
   * @param x
   * @param y
   * @param width
   * @param height
   * @constructor
   */

  function Rect(x, y, width, height) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
  }

  /**
   * Uses collide to determine whether or not
   * the passed Rect is overlapping
   *
   * @param rect
   * @returns {boolean}
   */

  Rect.prototype.collide = function(rect) {
    return collide(this, rect);
  };

  /**
   * Determines whether or not two rects are
   * overlapping
   *
   * @param a {Rect}
   * @param b {Rect}
   * @returns {boolean}
   */

  function collide(a, b) {
    // uncomment the following line to check performance
    // window.times = (window.times || 0) + 1;
    var collision =
      !!(a.x < b.x + b.width &&
        a.x + a.width > b.x &&
        a.y < b.y + b.height &&
        a.height + a.y > b.y);
    return collision;
  }

  /**
   * Accepts an array of rects and returns a function
   * that accepts another rect and will compare
   * whether or not a rect collides with any of the
   * ones in the array.
   *
   * @param rects
   * @returns {Function}
   */

  function batchCollide(rects) {
    return function(check) {
      return rects.some(function(rect) {
        if(rect.collide(check)) return true;
      });
    }
  }

  /**
   * Will give the center to an ellipse created
   * with the intention to have double width than height
   * and as wide as the element passed.
   *
   * @param $el
   * @returns {Point}
   */

  function ellipseCenter($el) {
    return new Point(
        $el.width() / 2,
        $el.width() / 4
    );
  }

  /**
   * Returns a function that will compute the displacement
   * needed to move the current object away from a point
   * to let the point be in it's center
   *
   * @param $el
   * @returns {Function}
   */

  function displacement($el) {
    return function (point) {
      return new Point(
        point.x - $el.width() / 2,
        point.y - $el.height() / 2
      );
    };
  }

  /**
   * Returns a random number between the two
   * given
   *
   * @param min
   * @param max
   * @returns {Number}
   */

  function random(min, max) {
    return Math.random() * (max - min) + min;
  }

  /**
   * Returns a point for an ellipse with center
   * 0,0 and double width than height
   * given distance to center and angle in radians
   *
   * @param dist
   * @param angle
   * @returns {Point}
   */

  function ellipse(dist, angle) {
    return new Point(
      dist * 2 * Math.cos(angle * Math.PI),
      dist * Math.sin(angle * Math.PI)
    );
  }

  /**
   * @param nr integer number of sizes
   * @param min integer smallest size
   * @param inc multiplier for size
   * @returns { Integer[] }
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
