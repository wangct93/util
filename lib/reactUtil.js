"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _objectSpread2 = _interopRequireDefault(require("@babel/runtime/helpers/objectSpread"));

var _async = _interopRequireDefault(require("./async"));

var utils = (0, _async["default"])({
  base: function base() {
    return require('./util')["default"];
  }
});
var _default = {
  getProps: getProps,
  setHistory: setHistory,
  getHistory: getHistory,
  setDispatch: setDispatch,
  getDispatch: getDispatch
};
exports["default"] = _default;

function getProps(target) {
  return (0, _objectSpread2["default"])({}, target.state, target.props);
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
    utils.base.callFunc(_this.dispatch, (0, _objectSpread2["default"])({}, action, {
      type: type
    }));
  };
}

function loading(func, msg) {
  var dispatch = this.getDispatch();
  dispatch({
    type: 'global/loading',
    message: msg || '正在加载数据，请稍候...'
  });
  utils.base.callFunc(func, function () {
    dispatch({
      type: 'global/loading'
    });
  });
}