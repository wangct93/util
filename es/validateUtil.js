
import {isFunc, isAry, isObj, isStr, isNum, isDef, isRegExp, isDate, isPromise} from "./typeUtil";

/**
 * 校验变量格式
 * @param func
 * @param message
 */
export function validate(func,message = '数据格式不对'){
  const isValid = isFunc(func) ? func() : func;
  if(!isValid){
    throw message;
  }
}

/**
 * 校验日期对象
 * @param data
 * @param message
 */
export function validateDate(data,message = '格式要求：日期对象'){
  validate(isDate(data),message);
}

export function validateDef(data,message = '格式要求：不为null或者undefined'){
  validate(isDef(data),message);
}

export function validatePromise(data,message = '格式要求：Promise对象'){
  validate(isPromise(data),message);
}

export function validateArray(data,message = '格式要求：数组'){
  validate(isAry(data),message);
}

export function validateObject(data,message = '格式要求：对象'){
  validate(isObj(data),message);
}

export function validateString(data,message = '格式要求：字符串'){
  validate(isStr(data),message);
}

export function validateNumber(data,message = '格式要求：数字'){
  validate(isNum(data),message);
}

export function validateFunc(data,message = '格式要求：函数'){
  validate(isFunc(data),message);
}

export function validateRegExp(data,message = '格式要求：正则对象'){
  validate(isRegExp(data),message);
}
