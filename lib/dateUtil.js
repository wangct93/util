'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _async = require('./async');

var _async2 = _interopRequireDefault(_async);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var utils = (0, _async2.default)({
    string: function string() {
        return require('./stringUtil').default;
    }
});

exports.default = {
    format: function format() {
        var _formatArgs = formatArgs.apply(undefined, arguments),
            _formatArgs2 = _slicedToArray(_formatArgs, 2),
            date = _formatArgs2[0],
            _formatArgs2$ = _formatArgs2[1],
            format = _formatArgs2$ === undefined ? 'YYYY-MM-DD hh:mm:ss' : _formatArgs2$;

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
            result = result.replace(new RegExp(key + '+', 'g'), function (match) {
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


function diff(type) {
    for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
        args[_key - 1] = arguments[_key];
    }

    var _formatArgs3 = formatArgs.apply(undefined, args),
        _formatArgs4 = _slicedToArray(_formatArgs3, 2),
        date = _formatArgs4[0],
        num = _formatArgs4[1];

    var typeAry = ['FullYear', 'Date', 'Month', 'Hours', 'Minutes', 'Seconds'];
    var targetDate = new Date(date);
    if (typeAry.indexOf(type) !== -1) {
        targetDate['set' + type](targetDate['get' + type]() + num);
    }
    return targetDate;
}

function formatArgs() {
    for (var _len2 = arguments.length, args = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
        args[_key2] = arguments[_key2];
    }

    var ary = Array.from(args);
    if (!(ary[0] instanceof Date)) {
        ary.unshift(new Date());
    }
    return ary;
}