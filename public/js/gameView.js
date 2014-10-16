"use strict";

(function () {
  if (typeof Asteroids === "undefined") {
    window.astereoids = {};
  }

  var GameView = Asteroids.GameView = function (ctx, height, width) {
    this.game = new Asteroids.Game(height, width);
    this.ship = this.game.addShip();
    this.ctx = ctx;
  };

  GameView.MOVES = {
    "up":     [0, -5],
    "left":   [-5,  0],
    "down":   [0,  5],
    "right":  [5,  0]
  };

  GameView.prototype.bindKeyHandlers = function () {
    var ship = this.ship;

    Object.keys(GameView.MOVES).forEach(function (k) {
      var move = GameView.MOVES[k];
      key(k, function () {
        ship.power(move);
      });
      key
    });

    key("space", function () {
      ship.fireBullet();
    });
  };

  GameView.prototype.start = function () {
    var gameView = this;

    setInterval( function () {
      gameView.game.step();
      gameView.game.draw(gameView.ctx);
    }, 60 );

    this.bindKeyHandlers();
  };
})();
