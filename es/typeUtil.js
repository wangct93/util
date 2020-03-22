/**
 * 获取变量类型
 * @param v
 * @returns {string}
 * @private
 */
function _getType(v){
  return Object.prototype.toString.call(v);
}

/**
 * 判断是否为函数
 * @param v
 * @returns {boolean}
 */
export function isFunc(v){
  return typeof v === 'function';
}

/**
 * 判断是否为异步函数
 * @param v
 * @returns {boolean}
 */
export function isAsyncFunc(v){
  return _getType(v) === '[object AsyncFunction]';
}

/**
 * 判断是否为数字
 * @param v
 * @returns {boolean}
 */
export function isNum(v){
  return _getType(v) === '[object Number]';
}

/**
 * 判断是否为数组
 * @param v
 * @returns {boolean}
 */
export function isArray(v){
  return _getType(v) === '[object Array]';
}

/**
 * 判断是否为数组
 * @param v
 * @returns {boolean}
 */
export function isAry(v){
  return isArray(v);
}

/**
 * 判断是否为布尔值
 * @param v
 * @returns {boolean}
 */
export function isBoolean(v){
  return _getType(v) === '[object Boolean]';
}

/**
 * 判断是否为布尔值
 * @param v
 * @returns {boolean}
 */
export function isBol(v){
  return isBoolean(v);
}

/**
 * 判断是否为对象
 * @param v
 * @returns {*}
 */
export function isObject(v){
  return _getType(v) === '[object Object]';
}

/**
 * 判断是否为对象
 * @param v
 * @returns {*}
 */
export function isObj(v){
  return isObject(v);
}

/**
 * 判断是否为字符串
 * @param v
 * @returns {*}
 */
export function isString(v){
  return _getType(v) === '[object String]';
}

/**
 * 判断是否为字符串
 * @param v
 * @returns {*}
 */
export function isStr(v){
  return isString(v);
}

/**
 * 判断是否为日期对象
 * @param v
 * @returns {boolean}
 */
export function isDate(v){
  return _getType(v) === '[object Date]';
}

/**
 * 判断是否未定义
 * @param v
 * @returns {boolean}
 */
export function isUndef (v) {
  return v === undefined;
}

/**
 * 判断是否未定义或者null
 * @param v
 * @returns {boolean}
 */
export function isUndefNull(v){
  return isUndef(v) || isNull(v);
}

/**
 * 判断是否为定义变量
 * @param v
 * @returns {boolean}
 */
export function isDef (v) {
  return v !== undefined && v !== null;
}

/**
 * 判断是否为true
 * @param v
 * @returns {boolean}
 */
export function isTrue (v) {
  return v === true;
}

/**
 * 判断是否为false
 * @param v
 * @returns {boolean}
 */
export function isFalse (v) {
  return v === false;
}

/**
 * 判断是否为null
 * @param v
 * @returns {boolean}
 */
export function isNull (v) {
  return v === null;
}

/**
 * 判断是否为promise对象
 * @param v
 * @returns {*|"undefined"|"object"|"boolean"|"number"|"string"|"function"|"symbol"|"bigint"}
 */
export function isPromise (v) {
  return isDef(v) && typeof isFunc(v.then) && isFunc(v.catch)
}

/**
 * 判断是否为正则表达式
 * @param v
 * @returns {boolean}
 */
export function isRegExp(v){
  return _getType(v) === '[object RegExp]';
}
