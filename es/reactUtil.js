import util from './util';

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
    util.callFunc(this.dispatch,{
      ...action,
      type
    });
  }
}