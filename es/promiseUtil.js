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
 * @returns {Promise<unknown[]>|Promise<{}>|Promise<any>}
 */
export function proParse(target){
  if(isAry(target)){
    return Promise.all(target.map(item => toPromise(item)));
  }
  if(isObj(target)){
    const keys = Object.keys(target);
    const proList = keys.map(key => toPromise(target[key]));
    return Promise.all(proList).then(result => {
      return aryToObject(keys,key => key,(key,index) => result[index]);
    });
  }
  return toPromise(target);
}
