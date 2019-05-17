"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));

var _async = _interopRequireDefault(require("./async"));

var utils = (0, _async["default"])({
  string: function string() {
    return require('./stringUtil')["default"];
  }
});
var _default = {
  format: function format() {
    var _formatArgs = formatArgs.apply(void 0, arguments),
        _formatArgs2 = (0, _slicedToArray2["default"])(_formatArgs, 2),
        date = _formatArgs2[0],
        _formatArgs2$ = _formatArgs2[1],
        format = _formatArgs2$ === void 0 ? 'YYYY-MM-DD hh:mm:ss' : _formatArgs2$;

    var config = {
      Y: date.getFullYear(),
      M: date.getMonth() + 1,
      D: date.getDate(),
      h: date.getHours(),
      m: date.getMinutes(),
      s: date.getSeconds()
    };
    var result = format;
    Object.keys(config).forEach(function (key) {
      result = result.replace(new RegExp("".concat(key, "+"), 'g'), function (match) {
        var value = config[key];
        return utils.string.addZero(value, match.length);
      });
    });
    return result;
  },
  diffDays: function diffDays(date, num) {
    return diff('Date', date, num);
  },
  diffMonths: function diffMonths(date, num) {
    return diff('Month', date, num);
  },
  diffYears: function diffYears(date, num) {
    return diff('FullYear', date, num);
  },
  diffHours: function diffHours(date, num) {
    return diff('Hours', date, num);
  },
  diffMinutes: function diffMinutes(date, num) {
    return diff('Minutes', date, num);
  },
  diffSeconds: function diffSeconds(date, num) {
    return diff('Seconds', date, num);
  }
};
exports["default"] = _default;

function diff(type) {
  for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    args[_key - 1] = arguments[_key];
  }

  var _formatArgs3 = formatArgs.apply(void 0, args),
      _formatArgs4 = (0, _slicedToArray2["default"])(_formatArgs3, 2),
      date = _formatArgs4[0],
      num = _formatArgs4[1];

  var typeAry = ['FullYear', 'Date', 'Month', 'Hours', 'Minutes', 'Seconds'];
  var targetDate = new Date(date);

  if (typeAry.indexOf(type) !== -1) {
    targetDate["set".concat(type)](targetDate["get".concat(type)]() + num);
  }

  return targetDate;
}

function formatArgs() {
  for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
    args[_key2] = arguments[_key2];
  }

  var ary = Array.from(args);

  if (!(ary[0] instanceof Date)) {
    ary.unshift(new Date());
  }

  return ary;
}