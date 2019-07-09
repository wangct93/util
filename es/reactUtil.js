import {callFunc} from './util';


const self = {};

export function getProps(target,filterFields){
  const props = {
    ...target.state,
    ...target.props
  };
  filterFields.forEach(field => {
    delete props[field];
  });
  return props;
}

export function setHistory(history){
  self.history = history;
}

export function getHistory(){
  return self.history;
}

export function setDispatch(dispatch){
  self.dispatch = dispatch;
}

export function getDispatch(namespace = 'global') {
  return (action) => {
    const [typespace,funcField] = action.type.split('/');
    callFunc(self.dispatch,{
      ...action,
      type:funcField ? type : namespace + '/' + typespace
    });
  }
}

export function showLoading(func,message = '操作处理中...'){
  const dispatch = getDispatch();
  dispatch({
    type:'updateField',
    field:'loading',
    data:message
  });
  callFunc(func,() => {
    dispatch({
      type:'updateField',
      field:'loading'
    });
  })
}