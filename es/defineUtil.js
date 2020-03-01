import {isDef, isFunc} from "./typeUtil";

/**
 * 自定义函数
 * @param func
 * @param defaultFunc
 * @returns {*}
 */
export function defineFunc(func,defaultFunc){
  return isFunc(func) ? func : defaultFunc;
}

/**
 * 自定义变量
 * @param value
 * @param defaultValue
 * @returns {*}
 */
export function defineValue(value,defaultValue){
  return isDef(func) ? value : defaultValue;
}
