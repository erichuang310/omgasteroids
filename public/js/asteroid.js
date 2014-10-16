"use strict";

(function () {
  if (typeof Asteroids === "undefined") {
    window.Asteroids = {};
  }
  
  var Asteroid = Asteroids.Asteroid = function (params) {    
    var newParams = {
      pos: params.pos,
      vel: Asteroids.Util.randomVec(20),
      radius: Asteroid.RADIUS,
      color: Asteroid.COLOR,
      game: params.game
    };
  
    Asteroids.MovingObject.call(this, newParams);
  };
  
  Asteroids.Util.inherits(Asteroid, Asteroids.MovingObject);
  
  Asteroid.COLOR = "#FF00FF";
  Asteroid.RADIUS = 25;

  Asteroid.prototype.collideWith = function (otherObject) {
    if (otherObject instanceof Asteroids.Ship) {
      otherObject.relocate();
    }
  };
})();
