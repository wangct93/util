import {isObject} from './typeUtil';
import {aryToObject} from "./arrayUtil";


export function toObj(obj){
  return isObject(obj) ? obj : {};
}

export function objForEach(obj,func){
  Object.keys(obj).forEach((key) => {
    func(obj[key],key,obj);
  });
}

export function objClone(obj = {},keys = []){
  return aryToObject(keys,item => item,item => obj[item]);
}

export function objFilter(obj,func){
  return clone(obj,Object.keys(obj).filter((key) => func(obj[key],key,obj)));
}

export function objMap(obj,func){
  return aryToObject(Object.keys(obj),item => item,item => func(obj[item],item,obj));
}

export function objSome(obj,func){
  return Object.keys(obj).some(key => func(obj[key],key,obj));
}

export function objEvery(obj,func){
  return Object.keys(obj).every(key => func(obj[key],key,obj));
}

export function objFind(obj,func){
  return obj[objFindKey(obj,func)];
}

export function objFindKey(obj,func){
  return Object.keys(obj).find(key => func(obj[key],key,obj));
}
