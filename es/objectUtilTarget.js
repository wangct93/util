import {isObject} from './typeUtil';
import {aryToObject} from "./arrayUtil";


export function toObject(obj){
  return isObject(obj) ? obj : {};
}

export function forEach(obj,func){
  Object.keys(obj).forEach((key) => {
    func(obj[key],key,obj);
  });
}

export function clone(obj = {},keys = []){
  return aryToObject(keys,item => item,item => obj[item]);
}

export function filter(obj,func){
  return clone(obj,Object.keys(obj).filter((key) => func(obj[key],key,obj)));
}

export function map(obj,func){
  return aryToObject(Object.keys(obj),item => item,item => func(obj[item],item,obj));
}

export function some(obj,func){
  return Object.keys(obj).some(key => func(obj[key],key,obj));
}

export function every(obj,func){
  return Object.keys(obj).every(key => func(obj[key],key,obj));
}

export function find(obj,func){
  return obj[findKey(obj,func)];
}

export function findKey(obj,func){
  return Object.keys(obj).find(key => func(obj[key],key,obj));
}
