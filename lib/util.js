'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _async = require('./async');

var _async2 = _interopRequireDefault(_async);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var utils = (0, _async2.default)({
    string: function string() {
        return require('./stringUtil').default;
    }
});

exports.default = {
    /*类型判断*/
    isFalse: isFalse,
    isTrue: isTrue,
    isFunc: isFunc,
    isNum: isNum,
    isString: isString,
    isObject: isObject,
    isArray: isArray,
    isBoolean: isBoolean,
    isRegExp: isRegExp,
    isPromise: isPromise,
    isDate: isDate,
    isDef: isDef,
    isUndef: isUndef,
    isNull: isNull,
    /*类型判断*/
    equal: equal,
    queue: queue,
    cache: cache,
    callFunc: callFunc,
    random: random,
    classNames: classNames,
    asyncImport: _async2.default,
    getQsParams: getQsParams,
    getQsString: getQsString,
    cookie: cookie,
    cloneFunc: cloneFunc,
    extend: extend,
    scroll: scroll
};


function _getType(v) {
    return Object.prototype.toString.call(v);
}

function isFunc(v) {
    return _getType(v) === '[object Function]';
}

function isNum(v) {
    return _getType(v) === '[object Number]';
}

function isArray(v) {
    return _getType(v) === '[object Array]';
}

function isBoolean(v) {
    return _getType(v) === '[object Boolean]';
}

function isObject(v) {
    return _getType(v) === '[object Object]';
}

function isString(v) {
    return _getType(v) === '[object String]';
}

function isDate(v) {
    return _getType(v) === '[object Date]';
}

function isUndef(v) {
    return v === undefined;
}

function isDef(v) {
    return v !== undefined && v !== null;
}

function isTrue(v) {
    return v === true;
}

function isFalse(v) {
    return v === false;
}

function isNull(v) {
    return v === null;
}

function isPromise(v) {
    return isDef(v) && _typeof(isFunc(v.then)) && isFunc(v.catch);
}

function isRegExp(v) {
    return _getType(v) === '[object RegExp]';
}

function callFunc(func) {
    if (isFunc(func)) {
        for (var _len = arguments.length, ary = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
            ary[_key - 1] = arguments[_key];
        }

        return func.call.apply(func, [this].concat(ary));
    }
}

function equal(self, other) {
    if (_getType(self) === _getType(other) && isDef(self)) {
        var keys = Object.keys(self);
        return keys.length === Object.keys(other).length && keys.every(function (key) {
            return self[key] === other[key];
        });
    } else {
        return self === other;
    }
}

function queue(option) {
    return new Queue(option);
}

/**
 * 队列执行，根据数组按顺序执行
 * @param opt       配置项有：       list execFunc limit success
 * @constructor
 */

var Queue = function () {
    function Queue(option) {
        _classCallCheck(this, Queue);

        this.state = {
            limit: 1,
            interval: 10,
            runCount: 0,
            list: [],
            result: []
        };

        this.init(option);
    }

    _createClass(Queue, [{
        key: 'init',
        value: function init(option) {
            this.setProps(option);
            this.start();
        }
    }, {
        key: 'setProps',
        value: function setProps(option) {
            this.props = _extends({}, this.state, option);
        }
    }, {
        key: 'updateProps',
        value: function updateProps(option) {
            this.setProps(_extends({}, this.getProps(), option));
        }
    }, {
        key: 'getProps',
        value: function getProps() {
            return this.props;
        }
    }, {
        key: 'start',
        value: function start() {
            var _this = this;

            var _getProps = this.getProps(),
                runCount = _getProps.runCount,
                limit = _getProps.limit;

            new Array(limit - runCount).fill().forEach(function () {
                _this.props.runCount++;
                _this.exec();
            });
        }
    }, {
        key: 'exec',
        value: function exec() {
            var _this2 = this;

            var props = this.getProps();
            var getItem = props.getItem,
                func = props.func,
                success = props.success,
                result = props.result;

            var item = isFunc(getItem) ? getItem.call(this) : props.list.shift();
            if (isUndef(item)) {
                var runCount = props.runCount;

                runCount--;
                this.updateProps({ runCount: runCount });
                if (runCount === 0) {
                    callFunc(success, result);
                }
            } else {
                func(item, function (data) {
                    var props = _this2.getProps();
                    props.result.push(data);
                    setTimeout(function () {
                        _this2.exec();
                    }, props.interval);
                });
            }
        }
    }]);

    return Queue;
}();

function cache(options) {
    return new CacheData(options);
}

var CacheData = function () {
    function CacheData(option) {
        _classCallCheck(this, CacheData);

        this.state = {
            limit: 100
        };
        this.cache = {};

        this.init(option);
    }

    _createClass(CacheData, [{
        key: 'init',
        value: function init(option) {
            this.setProps(option);
        }
    }, {
        key: 'setProps',
        value: function setProps(option) {
            this.props = _extends({}, this.state, option);
        }
    }, {
        key: 'getProps',
        value: function getProps() {
            return this.props;
        }
    }, {
        key: 'getCache',
        value: function getCache() {
            return this.cache;
        }
    }, {
        key: 'setCache',
        value: function setCache(key, value) {
            var cache = this.getCache();
            cache[key] = {
                key: key,
                value: value,
                time: +new Date()
            };
        }
    }, {
        key: 'check',
        value: function check() {
            var cache = this.getCache();
            var keys = Object.keys(cache);
            if (keys.length > this.getProps().limit) {
                var deleteKey = keys.sort(function (a, b) {
                    return cache[a].time - cache[b].time;
                })[0];
                delete allCache[deleteKey];
            }
        }
    }, {
        key: 'getItem',
        value: function getItem(key) {
            var cache = this.getCache();
            var item = cache[key];
            return item && item.value;
        }
    }, {
        key: 'setItem',
        value: function setItem(key, value) {
            this.setCache(key, value);
            this.check();
            return this;
        }
    }]);

    return CacheData;
}();

function random() {
    return parseInt(+Math.random().toString().substr(3) + +new Date()).toString(36);
}

function classNames() {
    return Array.from(arguments).filter(function (item) {
        return !!item;
    }).join(' ');
}

function getQsParams() {
    return utils.string.parse(window.location.search.substr(1));
}

function getQsString(params) {
    var originParams = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    return utils.string.stringify(_extends({}, originParams, params));
}

function cookie(key, value) {
    var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

    if (isDef(value)) {
        window.document.cookie = key + '=' + value + ';' + utils.string.stringify(options, '=', ';');
    } else {
        return utils.string.parse(window.document.cookie, '=', ';');
    }
}

function cloneFunc(v) {
    return new Function('return ' + v.toString())();
}

function extend() {
    var args = Array.from(arguments);
    var deep = false;
    var index = 1;
    var target = args[0];
    if (isBoolean(target)) {
        deep = target;
        target = args[1];
        index = 2;
    }
    target = target || {};

    var _loop = function _loop() {
        var extTarget = args[index];
        if (isDef(extTarget)) {
            Object.keys(extTarget).forEach(function (key) {
                var value = extTarget[key];
                if (deep) {
                    if (isFunc(value)) {
                        value = cloneFunc(value);
                    } else if (isObject(value)) {
                        value = extend(deep, {}, value);
                    } else if (isArray(value)) {
                        value = extend(deep, [], value);
                    }
                }
                target[key] = value;
            });
        }
    };

    for (; index < args.length; index++) {
        _loop();
    }
    return target;
}

function scroll(num) {
    window.document.documentElement.scrollTop = num;
}