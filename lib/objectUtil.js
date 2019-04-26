'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _async = require('./async');

var _async2 = _interopRequireDefault(_async);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var utils = (0, _async2.default)({
  array: function array() {
    return require('./arrayUtil').default;
  }
});

exports.default = {
  toObject: function toObject(obj) {
    return new Object(obj);
  },
  forEach: function forEach(obj, fn) {
    Object.keys(obj).forEach(function (key) {
      fn(obj[key], key, obj);
    });
  },
  clone: function clone() {
    var obj = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    var keys = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];

    return utils.array.toObject(keys, function (item) {
      return item;
    }, function (item) {
      return obj[item];
    });
  },
  filter: function filter(obj, fn) {
    return this.clone(obj, Object.keys(obj).filter(function (key) {
      return fn(obj[key], key, obj);
    }));
  },
  map: function map(obj, fn) {
    return utils.array.toObject(Object.keys(obj), function (item) {
      return item;
    }, function (item) {
      return fn(obj[item], item, obj);
    });
  },
  some: function some(obj, func) {
    return Object.keys(obj).some(function (key) {
      return func(obj[key], key, obj);
    });
  },
  every: function every(obj, func) {
    return Object.keys(obj).every(function (key) {
      return func(obj[key], key, obj);
    });
  },
  find: function find(obj, func) {
    return Object.keys(obj).find(function (key) {
      return func(obj[key], key, obj);
    });
  },
  findIndex: function findIndex(obj, func) {
    return Object.keys(obj).findIndex(function (key) {
      return func(obj[key], key, obj);
    });
  }
};