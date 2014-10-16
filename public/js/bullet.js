"use strict";

(function () {
  if (typeof Asteroids === "undefined") {
    window.Asteroids = {};
  }

  var Bullet = Asteroids.Bullet = function (options) {
  	options.radius = Bullet.RADIUS;

    Asteroids.MovingObject.call(this, options);
  };

  Asteroids.Util.inherits(Bullet, Asteroids.MovingObject);

  Bullet.SPEED = 15;
  Bullet.RADIUS = 2;

  Bullet.prototype.isWrappable = false;

  Bullet.prototype.collideWith = function (otherObj) {
  	if (otherObj instanceof Asteroids.Asteroid) {
		this.remove();
		otherObj.remove();
  	}
  };
})();