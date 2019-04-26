'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _async = require('./async');

var _async2 = _interopRequireDefault(_async);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var utils = (0, _async2.default)({
  base: function base() {
    return require('./util').default;
  }
});

exports.default = {
  getProps: getProps,
  setHistory: setHistory,
  getHistory: getHistory,
  setDispatch: setDispatch,
  getDispatch: getDispatch
};


function getProps(target) {
  return _extends({}, target.state, target.props);
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
        type = _action$type === undefined ? '' : _action$type;

    type = type.includes('/') ? type : modelName + '/' + type;
    var typeAry = type.split('/');
    type = typeAry[0] === 'global' ? typeAry[1] : type;
    utils.base.callFunc(_this.dispatch, _extends({}, action, {
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