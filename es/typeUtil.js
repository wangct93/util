


function _getType(v){
  return Object.prototype.toString.call(v);
}

export function isFunc(v){
  return typeof v === 'function';
}

export function isAsyncFunc(v){
  return _getType(v) === '[object AsyncFunction]';
}

export function isNum(v){
  return _getType(v) === '[object Number]';
}

export function isArray(v){
  return _getType(v) === '[object Array]';
}

export function isBoolean(v){
  return _getType(v) === '[object Boolean]';
}

export function isObject(v){
  return _getType(v) === '[object Object]';
}

export function isString(v){
  return _getType(v) === '[object String]';
}

export function isDate(v){
  return _getType(v) === '[object Date]';
}

export function isUndef (v) {
  return v === undefined;
}

export function isDef (v) {
  return v !== undefined && v !== null;
}

export function isTrue (v) {
  return v === true;
}

export function isFalse (v) {
  return v === false;
}

export function isNull (v) {
  return v === null;
}

export function isPromise (v) {
  return isDef(v) && typeof isFunc(v.then) && isFunc(v.catch)
}

export function isRegExp(v){
  return _getType(v) === '[object RegExp]';
}