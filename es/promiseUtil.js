import {isArray, isObject} from './typeUtil';
import {callFunc} from './util';
import * as arrayUtil from "./arrayUtil";

export function toPromise(promise){
  return Promise.resolve(promise);
}

export function parse(target){
  if(isArray(target)){
    return Promise.all(target.map(item => parseItem(item)));
  }else if(isObject(target)){
    const keys = Object.keys(target);
    return Promise.all(keys.map(key => target[key])).then(result => {
      return arrayUtil.toObject(keys,key => key,(key,index) => result[index]);
    });
  }
  return parseItem(target)
}

function parseItem(promise){
  return toPromise(callFunc(promise) || promise);
}