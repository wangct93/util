'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

exports.default = {
  isFunction: function isFunction(target) {
    return typeof target === 'function';
  },
  isObject: function isObject(target) {
    return (typeof target === 'undefined' ? 'undefined' : _typeof(target)) === 'object';
  },
  isBoolean: function isBoolean(target) {
    return typeof target === 'boolean';
  },
  isArray: function isArray(target) {
    return target instanceof Array;
  },
  isNumber: function isNumber(target) {
    return typeof target === 'number';
  },
  isString: function isString(target) {
    return typeof target === 'string';
  },
  isUndefined: function isUndefined(target) {
    return target === undefined;
  },
  isNull: function isNull(target) {
    return target === null;
  }
};