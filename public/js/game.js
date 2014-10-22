"use strict";

(function () {
  if (typeof Asteroids === "undefined") {
    window.Asteroids = {};
  }
  var MIN_NUM_ASTEROIDS = 10;
  var NUM_ASTEROIDS = 15;

  var Game = Asteroids.Game = function (height, width) {
    this.height = height;
    this.width = width;
    this.asteroids = [];
    this.bullets = [];
    this.ships = [];
    this.score = 0;

    this.addAsteroids();
  };

  Game.prototype.add = function (object) {
    if (object instanceof Asteroids.Asteroid) {
      this.asteroids.push(object);
    } else if (object instanceof Asteroids.Bullet) {
      this.bullets.push(object);
    } else if (object instanceof Asteroids.Ship) {
      this.ships.push(object);
    } else {
      console.log("WTF?");
    }
  }

  Game.prototype.remove = function (object) {
    if (object instanceof Asteroids.Asteroid) {
      this.asteroids.splice(this.asteroids.indexOf(object), 1);
    } else if (object instanceof Asteroids.Bullet) {
      this.bullets.splice(this.bullets.indexOf(object), 1);
    } else if (object instanceof Asteroids.Ship) {
      this.ships.splice(this.ships.indexOf(object), 1);
    } else {
      console.log("WTF?");
    }
  }

  Game.prototype.allObjects = function () {
    return this.asteroids.concat(this.ships).concat(this.bullets);
  };

  Game.prototype.addAsteroids = function () {
    for (var i = this.asteroids.length; i < NUM_ASTEROIDS; i++) {
      var asteroid = new Asteroids.Asteroid({
        pos: this.randomPosition(),
        game: this
      });

      this.add(asteroid);
    }
  };

  Game.prototype.addShip = function () {
    var ship = new Asteroids.Ship( {
      pos: this.randomPosition(),
      game: this,
      direction: 0
    });

    this.add(ship);
    return ship;
  };

  Game.prototype.randomPosition = function () {
    var pos = [
      Math.floor(this.width * Math.random()),
      Math.floor(this.height * Math.random())
    ];
    return pos;
  };

  Game.prototype.draw = function (ctx) {
    ctx.clearRect(0, 0, this.width, this.height);
    for (var i = 0; i < this.allObjects().length; i++) {
      this.allObjects()[i].draw(ctx);
    }
  };

  Game.prototype.moveObjects = function () {
    this.allObjects().forEach(function (object) {
      object.move();
    });
  };

  Game.prototype.wrap = function (pos) {
    var newPos = pos;

    if (pos[0] > this.width) {
      newPos[0] = pos[0] - this.width;
    } else if (pos[0] < 0) {
      newPos[0] = this.width;
    }

    if (pos[1] > this.height) {
      newPos[1] = pos[1] - this.height;
    } else if (pos[1] < 0) {
      newPos[1] = this.height;
    };

    return newPos;
  };

  Game.prototype.checkCollisions = function () {
    var game = this;

    this.allObjects().forEach(function (obj1) {
      game.allObjects().forEach(function (obj2) {
        if (obj1 == obj2) {
          // don't allow self-collision
          return;
        }

        if (obj1.isCollidedWith(obj2)) {
          obj1.collideWith(obj2);
        }
      });
    });
  };

  Game.prototype.isOutOfBounds = function (pos) {
    return pos[0] < 0 || pos[0] > this.width || pos[1] < 0 || pos[1] > this.height;
  };

  Game.prototype.step = function () {
    this.moveObjects();
    this.checkCollisions();
    if (this.asteroids.length <= MIN_NUM_ASTEROIDS) {
      this.addAsteroids();
    };
    console.log(this.score);
  };
})();
