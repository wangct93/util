"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

module.exports = function (options) {
  return new Async(options).target;
};

var Async =
/*#__PURE__*/
function () {
  function Async(options) {
    (0, _classCallCheck2["default"])(this, Async);

    this._init(options);
  }

  (0, _createClass2["default"])(Async, [{
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