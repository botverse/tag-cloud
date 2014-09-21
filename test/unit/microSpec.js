define(['micro'], function(µ) {
  describe('micro library', function() {
    it('shold have all methods defined', function() {
      expect(µ.Point).toBeDefined();
      expect(µ.Rect).toBeDefined();
      expect(µ.collide).toBeDefined();
      expect(µ.batchCollide).toBeDefined();
      expect(µ.ellipseCenter).toBeDefined();
      expect(µ.displacement).toBeDefined();
      expect(µ.random).toBeDefined();
      expect(µ.genSizes).toBeDefined();
      expect(µ.ellipse).toBeDefined();
    });

    describe('Point', function() {
      beforeEach(function() {
        this.point = new µ.Point(10, 20);
      });

      it('should have x, y properties', function() {
        expect(this.point.x).toBe(10);
        expect(this.point.y).toBe(20);
      });

      it('should be able to add a point', function() {
        var other = this.point.add(new µ.Point(5, 5));
        expect(other.x).toBe(15);
        expect(other.y).toBe(25);
      });
    });

    describe('Rect', function() {
      beforeEach(function() {
        this.rect = new µ.Rect(10, 20, 100, 200);
      });

      it('should have x, y, width and height properties', function() {
        expect(this.rect.x).toBe(10);
        expect(this.rect.y).toBe(20);
        expect(this.rect.width).toBe(100);
        expect(this.rect.height).toBe(200);
      });

      it('should calculate if it overlaps with other rectangle', function() {
        var collision = new µ.Rect(100, 110, 100, 100);
        var nocollision = new µ.Rect(110, 120, 100, 100);
        expect(collision.collide(this.rect)).toBe(true);
        expect(nocollision.collide(this.rect)).toBe(false);
      });
    });

    describe('batchCollide', function() {
      beforeEach(function() {
        this.rect = new µ.Rect(10, 20, 100, 200);
        this.collision = new µ.Rect(100, 110, 100, 100);
        this.nocollision = new µ.Rect(110, 120, 100, 100);
        this.nocollision2 = new µ.Rect(110, 120, 100, 100);

        this.collisionList = [
          this.collision,
          this.nocollision,
          this.nocollision2
        ];

        this.noCollisionList = [
          this.nocollision,
          this.nocollision2
        ]
      });

      it('should return a function', function() {
        var collide = µ.batchCollide(this.collisionList);
        expect(typeof collide).toBe('function');
      });

      it('should find the collision', function() {
        var collide = µ.batchCollide(this.collisionList);
        expect(collide(this.rect)).toBe(true);
      });

      it('should detect no collisions', function() {
        var collide = µ.batchCollide(this.noCollisionList);
        expect(collide(this.rect)).toBe(false);
      });
    });

    describe('ellipseCenter', function() {
      it('should find the center of the ellipse', function() {
        var point = µ.ellipseCenter($('<div>').css({
          width: 200
        }));
        expect(point.x).toBe(100);
        expect(point.y).toBe(50);
      });
    });

    describe('displacement', function() {
      beforeEach(function() {
        this.point = new µ.Point(10, 20);
        this.el = new $('<div></div>').css({
          width: 100,
          height: 200
        });
      });

      it('should return a function', function() {
        var disp = µ.displacement(this.el);
        expect(typeof disp).toBe('function');
      });

      it('should find the position of the element respect to it\'s center', function() {
        var disp = µ.displacement(this.el);
        var point = disp(this.point);
        expect(point.x).toBe(-40);
        expect(point.y).toBe(-80);
      });
    });

    describe('random', function() {
      it('should randomize between 2 numbers', function() {
        spyOn(Math, 'random').and.returnValue(0.1);
        expect(µ.random(10, 20)).toBe(11);
      });
    });

    describe('ellipse', function() {
      it('should create an ellipse given points', function() {
        var right = µ.ellipse(1.0, 0);
        var up = µ.ellipse(1.0, 0.5);
        var left = µ.ellipse(1.0, 1);
        var down = µ.ellipse(1.0, 1.5);
        expect(right.x).toBe(2);
        expect(up.y).toBe(1);
        expect(left.x).toBe(-2);
        expect(down.y).toBe(-1);
      });
    });

    describe('genSizes', function() {
      it('should generate a sizes array based in increment', function() {
        var below = µ.genSizes(2, 1, 1.4);
        var over = µ.genSizes(2, 1, 1.6);
        expect(below).toEqual([1,1]);
        expect(over).toEqual([1,2]);
      });
    });
  });
});