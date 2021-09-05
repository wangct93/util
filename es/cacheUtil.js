import {Cache} from "./dataClass";
import {callFunc} from "./util";


const cacheData = new Cache();

/**
 * 缓存方法
 * @author wangchuitong
 */
function cache(...args){
  return cacheData.data(...args);
}

/**
 * 设置缓存
 * @author wangchuitong
 */
export function setCache(key,value){
  cache(key,value);
}

/**
 * 读取缓存
 * @author wangchuitong
 */
export function getCache(key){
  return cache(key);
}

/**
 * 删除缓存
 * @author wangchuitong
 */
export function clearCache(key){
  return cache(key,null);
}

/**
 * 缓存方法结果
 * @param type
 * @param func
 */
export function getFuncCache(type,func){
  let result = getCache(type);
  if(result){
    return result;
  }
  result = callFunc(func);
  setCache(type,result);
  return result;
}
