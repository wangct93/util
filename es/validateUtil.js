
import {isFunc, isArray, isObject} from "./typeUtil";

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