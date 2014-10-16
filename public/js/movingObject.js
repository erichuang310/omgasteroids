"use strict";

(function () {
  if (typeof Asteroids === "undefined") {
    window.Asteroids = {};
  }

  var MovingObject = Asteroids.MovingObject = function (params) {
    this.pos = params.pos;
    this.vel = params.vel;
    this.radius = params.radius;
    this.color = params.color;
    this.game = params.game;
  };

  MovingObject.prototype.draw = function(ctx) {
    ctx.strokeStyle = this.color;
    ctx.beginPath();

    ctx.arc(
      this.pos[0],
      this.pos[1],
      this.radius,
      0,
      2 * Math.PI,
      false
    );

    ctx.stroke();
  };

  MovingObject.prototype.isWrappable = true;

  MovingObject.prototype.move = function() {
    if (this instanceof Asteroids.Ship) {
      this.vel = Asteroids.Util.scale(this.vel, 0.9);
      this.pos = [this.pos[0] + this.vel[0], this.pos[1] + this.vel[1]];
    } else {
      this.pos = [this.pos[0] + this.vel[0], this.pos[1] + this.vel[1]];
    }
    
    if (this.game.isOutOfBounds(this.pos)) {
      if (this.isWrappable) {
        this.pos = this.game.wrap(this.pos);
      } else {
        this.remove();
      }
    }
  };

 MovingObject.prototype.isCollidedWith = function (otherObject) {
    var centerDist = Asteroids.Util.dist(this.pos, otherObject.pos);
    return centerDist < (this.radius + otherObject.radius);
  };

  MovingObject.prototype.collideWith = function (otherObject) {
    // Not needed. Overrided in Asteroid class
  };

  MovingObject.prototype.remove = function () {
    this.game.remove(this);
  };
})();
