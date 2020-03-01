import {isObj} from './typeUtil';
import {aryToObject} from "./arrayUtil";


/**
 * 转化为对象
 * @param obj
 * @returns {{}}
 */
export function toObj(obj){
  return isObj(obj) ? obj : {};
}

/**
 * 遍历
 * @param obj
 * @param func
 */
export function objForEach(obj,func){
  Object.keys(obj).forEach((key) => {
    func(obj[key],key,obj);
  });
}

/**
 * 克隆
 * @param obj
 * @param keys
 * @returns {{}}
 */
export function objClone(obj = {},keys = []){
  return aryToObject(keys,item => item,item => obj[item]);
}

/**
 * 过滤
 * @param obj
 * @param func
 * @returns {*}
 */
export function objFilter(obj,func){
  return clone(obj,Object.keys(obj).filter((key) => func(obj[key],key,obj)));
}

/**
 * 返回对应结果
 * @param obj
 * @param func
 * @returns {{}}
 */
export function objMap(obj,func){
  return aryToObject(Object.keys(obj),item => item,item => func(obj[item],item,obj));
}

/**
 * 存在判断
 * @param obj
 * @param func
 * @returns {boolean}
 */
export function objSome(obj,func){
  return Object.keys(obj).some(key => func(obj[key],key,obj));
}

/**
 * 所有判断
 * @param obj
 * @param func
 * @returns {boolean}
 */
export function objEvery(obj,func){
  return Object.keys(obj).every(key => func(obj[key],key,obj));
}

/**
 * 找到指定值
 * @param obj
 * @param func
 * @returns {*}
 */
export function objFind(obj,func){
  return obj[objFindKey(obj,func)];
}

/**
 * 找到指定键
 * @param obj
 * @param func
 * @returns {string}
 */
export function objFindKey(obj,func){
  return Object.keys(obj).find(key => func(obj[key],key,obj));
}
