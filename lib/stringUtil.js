'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

exports.default = {
  toString: function toString(str) {
    return str ? str + '' : '';
  },
  computeDiff: function computeDiff() {
    var self = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
    var other = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';

    var len = Math.max(self.length, other.length);
    var selfNum = 0;
    var otherNum = 0;
    var n = 4;
    new Array(len).fill().forEach(function (m, i) {
      selfNum += self[i] ? self.charCodeAt(i) / Math.pow(100, i - n) : 0;
      otherNum += other[i] ? other.charCodeAt(i) / Math.pow(100, i - n) : 0;
    });
    return selfNum - otherNum;
  },
  addZero: function addZero(str, len) {
    var prefix = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;

    var fstr = str.toString();
    var extStr = '0'.repeat(len - fstr.length);
    return prefix ? extStr + fstr : fstr + extStr;
  },
  toMoneyFormat: function toMoneyFormat() {
    var str = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '0';

    return parseInt(this.toNumber(str, 0), 10).toString().replace(/\B(?=(\d{3})+$)/g, ',');
  },
  decodeHtml: function decodeHtml() {
    var str = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';

    var config = {
      amp: '&',
      apos: '\'',
      lt: '<',
      gt: '>',
      quot: '"',
      nbsp: '\xa0',
      middot: '·',
      rdquo: '”',
      ldquo: '“',
      mdash: '—',
      deg: '°',
      bull: '•',
      auml: 'ä',
      sup1: '¹',
      eacute: 'é',
      ccedil: 'ç',
      frac34: '¾',
      egrave: 'è',
      acute: '´',
      sect: '§',
      raquo: '»',
      aelig: 'æ',
      iexcl: '¡',
      yen: '¥',
      aring: 'å',
      curren: '¤',
      copy: '©',
      iuml: 'ï',
      frac14: '¼',
      ordm: 'º',
      not: '¬',
      iquest: '¿',
      cedil: '¸',
      pound: '£',
      reg: '®',
      shy: '­',
      sup3: '³',
      macr: '¯',
      plusmn: '±',
      laquo: '«',
      frac12: '½',
      sup2: '²',
      brvbar: '¦',
      cent: '¢',
      para: '¶',
      ordf: 'ª'
    };
    var re = /&([a-z0-9]+);/ig;
    var newStr = str.replace(re, function (match, matchKey) {
      var key = matchKey.toLowerCase();
      return config[key] ? config[key] : match;
    });
    return newStr === str ? newStr : this.decodeHtml(newStr);
  },
  parse: function parse() {
    var str = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
    var equalSep = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '=';
    var linkSep = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : '&';

    var result = {};
    str.split(linkSep).forEach(function (item) {
      var _item$split = item.split(equalSep),
          _item$split2 = _slicedToArray(_item$split, 2),
          _item$split2$ = _item$split2[0],
          key = _item$split2$ === undefined ? '' : _item$split2$,
          _item$split2$2 = _item$split2[1],
          value = _item$split2$2 === undefined ? '' : _item$split2$2;

      if (key && value) {
        result[key.trim()] = decodeURIComponent(value.trim());
      }
    });
    return result;
  },
  stringify: function stringify(data) {
    var equalSep = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '=';
    var linkSep = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : '&';

    return Object.keys(data).filter(function (key) {
      return data[key] !== undefined;
    }).map(function (key) {
      return '' + key + equalSep + data[key];
    }).join(linkSep);
  }
};