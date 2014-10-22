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

  GameView.prototype.checkKeysPressed = function () {
    var ship = this.ship;

    if (key.isPressed('up')) { ship.power(0.8); }
    if (key.isPressed('left')) { ship.turnLeft(); }
    if (key.isPressed('down')) { ship.power(-0.8); }
    if (key.isPressed('right')) { ship.turnRight(); }
    if (key.isPressed('space')) { ship.fireBullet(); }
  };

  GameView.prototype.start = function () {
    var gameView = this;

    setInterval( function () {
      gameView.checkKeysPressed();
      gameView.game.step();
      gameView.game.draw(gameView.ctx);
    }, 45 );
  };
})();
