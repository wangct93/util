import asyncImport from './async';
const utils = asyncImport({
  base:() => require('./util').default
});

export default {
  getProps,
  setHistory,
  getHistory,
  setDispatch,
  getDispatch
};

function getProps(target){
  return {
    ...target.state,
    ...target.props
  }
}

function setHistory(history){
  this.history = history;
}

function getHistory(){
  return this.history || window.history;
}

function setDispatch(dispatch){
  this.dispatch = dispatch;
}

function getDispatch(modelName = 'global') {
  return (action) => {
    let {type = ''} = action;
    type = type.includes('/') ? type : modelName + '/' + type;
    const typeAry = type.split('/');
    type = typeAry[0] === 'global' ? typeAry[1] : type;
    utils.base.callFunc(this.dispatch,{
      ...action,
      type
    });
  }
}

function loading(func,msg) {
  const dispatch = this.getDispatch();
  dispatch({
    type: 'global/loading',
    message: msg || '正在加载数据，请稍候...'
  });
  utils.base.callFunc(func, () => {
    dispatch({
      type: 'global/loading'
    });
  });
}