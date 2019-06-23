import * as util from './util';


const cache = {};

export function getProps(target){
  return {
    ...target.state,
    ...target.props
  }
}

export function setHistory(history){
  cache.history = history;
}

export function getHistory(){
  return cache.history;
}

export function setDispatch(dispatch){
  cache.dispatch = dispatch;
}

export function getDispatch(namespace = 'global') {
  return (action) => {
    const [typespace,funcField] = action.type.split('/');
    util.callFunc(cache.dispatch,{
      ...action,
      type:funcField ? type : namespace + '/' + typespace
    });
  }
}
