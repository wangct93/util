import {isAry, isFunc, isObj} from './typeUtil';
import {aryToObject} from "./arrayUtil";

/**
 * 转化为promise
 * @param promise
 * @param args
 * @returns {Promise<any>}
 */
export function toPromise(promise,...args){
  return Promise.resolve(isFunc(promise) ? promise(...args) : promise);
}

/**
 * promise解析
 * @param target
 * @returns {Promise<any[]>|Promise<any>|Promise<{} | [any, any, any, any, any, any, any, any, any, any]>}
 */
export function proParse(target){
  if(isAry(target)){
    return Promise.all(target.map(item => toPromise(item)));
  }else if(isObj(target)){
    const keys = Object.keys(target);
    return Promise.all(keys.map(key => target[key])).then(result => {
      return aryToObject(keys,key => key,(key,index) => result[index]);
    });
  }
  return toPromise(target)
}
