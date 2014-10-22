"use strict";

(function () {
  if (typeof Asteroids === "undefined") {
    window.Asteroids = {};
  }

  var MovingObject = Asteroids.MovingObject = function (params) {
    this.pos = params.pos;
    this.vel = params.vel;
    this.angle = Asteroids.Util.angle(this.vel);
    this.radius = params.radius;
    this.color = params.color;
    this.game = params.game;
    this.direction = params.direction;



    if (this instanceof Asteroids.Ship) {
      this.image = new Image();
      this.image.src = "../public/images/nyan.png";
    } else if (this instanceof Asteroids.Asteroid) {
      var mexiNyan = new Image();
      mexiNyan.src = "../public/images/mexinyan.png";

      var cowNyan = new Image();
      cowNyan.src = "../public/images/cownyan.png";

      var whiteNyan = new Image();
      whiteNyan.src = "../public/images/whitenyan.png";

      var evilNyan = new Image();
      evilNyan.src = "../public/images/evilnyan.png";

      var nyans = [cowNyan, whiteNyan, evilNyan];

      this.image = nyans[Math.floor(Math.random() * nyans.length)];
    } else {
      this.image = new Image();
      this.image.src = "../public/images/rainbow.png"
    }
  };

  MovingObject.prototype.draw = function(ctx) {
      ctx.drawImage(this.image,this.pos[0],this.pos[1]);
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
