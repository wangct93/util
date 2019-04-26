'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _async = require('./async');

var _async2 = _interopRequireDefault(_async);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var utils = (0, _async2.default)({
    base: function base() {
        return require('./util').default;
    }
});

function isFunc(v) {
    return utils.base.isFunc(v);
}

exports.default = {
    toArray: function toArray(ary) {
        return Array.isArray(ary) ? ary : [ary];
    },
    remove: function remove(ary, item) {
        var index = ary.indexOf(item);
        if (index !== -1) {
            ary.splice(index, 1);
        }
    },
    classify: function classify(ary) {
        var field = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'type';
        var valueFunc = arguments[2];

        var result = {};
        ary.forEach(function (item, i) {
            var key = isFunc(field) ? field(item, i, ary) : item[field];
            var value = isFunc(valueFunc) ? valueFunc(item, i, ary) : item;
            var list = result[key] || [];
            list.push(value);
            result[key] = list;
        });
        return result;
    },
    toObject: function toObject(ary, field, valueFunc) {
        var result = {};
        ary.forEach(function (item, i) {
            var key = isFunc(field) ? field(item, i, ary) : item[field];
            result[key] = isFunc(valueFunc) ? valueFunc(item, i, ary) : item;
        });
        return result;
    },
    noRepeat: function noRepeat(ary) {
        return Array.from(new Set(ary));
    },
    compact: function compact(ary) {
        return ary.filter(function (item) {
            return item && !isNaN(item);
        });
    },
    findChild: function findChild(ary, func) {
        var childrenField = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 'children';

        func = utils.base.isFunc(func) ? func : function (item) {
            return item === func;
        };
        for (var i = 0; i < ary.length; i++) {
            var item = ary[i];
            if (func(item)) {
                return item;
            }
            var children = item[childrenField] || [];
            var childrenResult = children.length && this.findChild(children, func);
            if (childrenResult) {
                return childrenResult;
            }
        }
    },
    findChildren: function findChildren(ary, func) {
        var _this = this;

        var childrenField = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 'children';

        func = utils.base.isFunc(func) ? func : function (item) {
            return item === func;
        };
        return ary.map(function (item) {
            var list = func(item) ? [item] : [];
            var children = item[childrenField] || [];
            var childrenResult = children.length && _this.findChild(children, func);
            return childrenResult ? list.concat(childrenResult) : list;
        }).reduce(function (pv, item) {
            return pv.concat(item);
        }, []);
    }
};