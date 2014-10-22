"use strict";

(function () {
  if (typeof Asteroids === "undefined") {
    window.Asteroids = {};
  }

  var Util = Asteroids.Util = {};
  Util.inherits = function(childClass, superClass) {
    function Surrogate() { this.constructor = childClass };
    Surrogate.prototype = superClass.prototype;
    childClass.prototype = new Surrogate();
  };

  Util.randomVec = function (length) {
    return [
      Math.floor(length * Math.random()),
      Math.floor(length * Math.random())
    ];
  };

  var angle = Util.angle = function (vec) {
    return Math.atan(vec[1] / vec[0]) * 180 / Math.PI;
  }

  var dir = Util.dir = function (vec) {
    var norm = Util.norm(vec);
    return Util.scale(vec, 1 / norm);
  }

  var norm = Util.norm = function (vec) {
    return Util.dist([0, 0], vec);
  };

  var dist = Util.dist = function (pos1, pos2) {
    return Math.sqrt(
      Math.pow(pos1[0] - pos2[0], 2) + Math.pow(pos1[1] - pos2[1], 2)
    );
  };

  var scale = Util.scale = function (vec, m) {
    return [m * vec[0], m * vec[1]];
  };
})();
