"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

module.exports = function (options) {
  return new Async(options).target;
};

var Async = function () {
  function Async(options) {
    _classCallCheck(this, Async);

    this._init(options);
  }

  _createClass(Async, [{
    key: "_init",
    value: function _init(opts) {
      this.initConfig(opts);
      this.initModules();
      this.initDefineProperties();
    }
  }, {
    key: "initConfig",
    value: function initConfig(opts) {
      this.opts = opts;
      this.target = {};
    }
  }, {
    key: "getModule",
    value: function getModule(key) {
      var module = this.modules[key];
      if (module.target) {
        return module.target;
      }
      module.target = module.getTarget();
      return module.target;
    }
  }, {
    key: "initModules",
    value: function initModules() {
      var _this = this;

      var modules = {};
      Object.keys(this.opts).forEach(function (key) {
        modules[key] = {
          loaded: false,
          getTarget: _this.opts[key]
        };
      });
      this.modules = modules;
    }
  }, {
    key: "getTarget",
    value: function getTarget() {
      return this.target;
    }
  }, {
    key: "initDefineProperties",
    value: function initDefineProperties() {
      var _this2 = this;

      Object.keys(this.opts).forEach(function (key) {
        Object.defineProperty(_this2.getTarget(), key, {
          get: function get() {
            return _this2.getModule(key);
          }
        });
      });
    }
  }]);

  return Async;
}();