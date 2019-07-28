import {isArray, isFunc, isObject} from './typeUtil';
import {aryToObject} from "./arrayUtil";

export function toPromise(promise,...args){
  return Promise.resolve(isFunc(promise) ? promise(...args) : promise);
}

export function proParse(target){
  if(isArray(target)){
    return Promise.all(target.map(item => toPromise(item)));
  }else if(isObject(target)){
    const keys = Object.keys(target);
    return Promise.all(keys.map(key => target[key])).then(result => {
      return aryToObject(keys,key => key,(key,index) => result[index]);
    });
  }
  return toPromise(target)
}
