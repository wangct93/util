
import {isFunc, isArray, isObject, isString, isNum} from "./typeUtil";

export function validate(func,message = '数据格式不对'){
  const isValid = isFunc(func) ? func() : func;
  if(!isValid){
    throw new Error(message);
  }
}

export function validateArray(data,message = '期望数据是数组'){
  validate(isArray(data),message);
}

export function validateObject(data,message = '期望数据是对象'){
  validate(isObject(data),message);
}

export function validateString(data,message = '期望数据是字符串'){
  validate(isString(data),message);
}

export function validateNumber(data,message = '期望数据是数字'){
  validate(isNum(data),message);
}
