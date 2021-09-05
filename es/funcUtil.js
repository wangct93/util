import {callFunc} from "./util";


/**
 * 获取节流函数
 * @author wangchuitong
 */
export function getThrottleFunc(func,interval = 30){
  let sign = +new Date();
  return (...args) => {
    const now = +new Date();
    if(now - sign > interval){
      sign = now;
      return callFunc(func,...args);
    }
  }
}

/**
 * 获取防抖函数
 * @author wangchuitong
 */
export function getShakeProofFunc(func,interval = 30){
  let timer = null;
  return (...args) => {
    clearInterval(timer);
    timer = setTimeout(() => {
      callFunc(func,...args);
    },interval);
  }
}


/**
 * 获取只调用一次方法
 * @param func
 * @returns {*}
 */
export function getOnceFunc(func){
  let flag = false;
  return (...args) => {
    if(flag){
      return;
    }
    flag = true;
    return callFunc(func,...args);
  }
}

/**
 * 克隆方法
 * @param v
 * @returns {never}
 */
export function cloneFunc(v){
  return new Function('return ' + v.toString())();
}
