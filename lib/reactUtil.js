"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _util = _interopRequireDefault(require("./util"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var _default = {
  getProps: getProps,
  setHistory: setHistory,
  getHistory: getHistory,
  setDispatch: setDispatch,
  getDispatch: getDispatch
};
exports["default"] = _default;

function getProps(target) {
  return _objectSpread({}, target.state, target.props);
}

function setHistory(history) {
  this.history = history;
}

function getHistory() {
  return this.history || window.history;
}

function setDispatch(dispatch) {
  this.dispatch = dispatch;
}

function getDispatch() {
  var _this = this;

  var modelName = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'global';
  return function (action) {
    var _action$type = action.type,
        type = _action$type === void 0 ? '' : _action$type;
    type = type.includes('/') ? type : modelName + '/' + type;
    var typeAry = type.split('/');
    type = typeAry[0] === 'global' ? typeAry[1] : type;

    _util["default"].callFunc(_this.dispatch, _objectSpread({}, action, {
      type: type
    }));
  };
}