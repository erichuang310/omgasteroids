"use strict";

(function () {
  if (typeof Asteroids === "undefined") {
    window.Asteroids = {};
  }

  var Ship = Asteroids.Ship = function (params) {
    var shipParams = {
      pos: params.pos,
      vel: [-0.1, 0],
      radius: Ship.RADIUS,
      color: Ship.COLOR,
      game: params.game,
      direction: params.direction
    };

    Asteroids.MovingObject.call(this, shipParams);
  };

  Asteroids.Util.inherits(Ship, Asteroids.MovingObject);

  Ship.COLOR = "blue";
  Ship.RADIUS = 35;

  Ship.prototype.turnLeft = function () {
    this.direction -= 0.4;
  };

  Ship.prototype.turnRight = function () {
    this.direction += 0.4;
  };

  Ship.prototype.relocate = function () {
    this.pos = [this.game.width / 2, this.game.height / 2];
    this.vel = [-0.1, 0];
    this.thrust = false;
  };

  Ship.prototype.drawThrust = function (ctx) {
    ctx.save();
    ctx.translate(this.pos[0], this.pos[1]);
    ctx.rotate(this.direction);

    var grd = ctx.createRadialGradient(this.radius * Math.cos(5 * Math.PI / 4), 0, 0, 0, 0, this.radius * 1.5);
    grd.addColorStop(0, Ship.frontColor);
    grd.addColorStop(0.8, this.color);

    ctx.fillStyle = grd;
    ctx.beginPath();
    ctx.moveTo(
      Math.floor(this.radius * Math.cos(5 * Math.PI / 4)),
      Math.floor(this.radius / 2.5)
    );

    ctx.lineTo(-this.radius * 2, 0);

    ctx.lineTo(
      Math.floor(this.radius * Math.cos(5 * Math.PI / 4)),
      Math.floor(-this.radius / 2.5)
    );
    ctx.closePath();
    ctx.fill();

    ctx.restore();
    this.thrust = false;
  };

  Ship.prototype.power = function(impulse) {
    this.thrust = true;
    this.vel[0] += impulse * Math.cos(this.direction);
    this.vel[1] += impulse * Math.sin(this.direction);
  };

  Ship.prototype.fireBullet = function () {
    var norm = Asteroids.Util.norm(this.vel);

    if (norm == 0) {
      // Can't fire unless moving.
      return;
    }

    var relVel = Asteroids.Util.scale(
      Asteroids.Util.dir(this.vel),
      Asteroids.Bullet.SPEED
    );

    var bulletVel = [
      relVel[0] + Math.cos(this.direction) * (Asteroids.Bullet.SPEED + 10),
      relVel[1] + Math.sin(this.direction) * (Asteroids.Bullet.SPEED + 10)
    ];

    var bullet = new Asteroids.Bullet({
      pos: this.pos,
      vel: bulletVel,
      color: this.color,
      game: this.game
    });

    this.game.add(bullet);
  };


  Ship.prototype.drawRotatedImage = function (image, x, y, angle) {
    context.save();
    context.translate(x, y);
    context.rotate(angle * Math.PI/180);
    context.drawImage(image, -(image.width/2), -(image.height/2));
    context.restore();
  }

  Ship.prototype.draw = function (ctx) {
    this.drawRotatedImage(this.image, this.pos[0], this.pos[1], this.direction * 180 / Math.PI);
  };

})();
