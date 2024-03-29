import {isFunc, isAry, isDef, isNum} from './typeUtil';
import {validateArray} from "./validateUtil";
import {defineFunc} from "./defineUtil";
import {callFunc} from "./util";

/**
 * 转化为数组
 * @param ary
 * @returns {*}
 */
export function toArray(ary){
    return isAry(ary) ? ary : isDef(ary) ? [ary] : [];
}

/**
 * 转化为数组
 * @param ary
 * @returns {*}
 */
export function toAry(ary){
    return toArray(ary);
}

/**
 * 数组转对象
 * @param args
 */
export function aryToObj(...args){
    return aryToObject(...args);
}

/**
 * 数组转对象
 * @param ary
 * @param key
 * @param valueFunc
 */
export function aryToObject(ary, key, valueFunc){
    validateArray(ary);
    const result = {};
    const keyFunc = defineFunc(key,item => item[key]);
    valueFunc = defineFunc(valueFunc,item => item);
    ary.forEach((item, i) => {
        result[keyFunc(item,i,ary)] = valueFunc(item,i,ary);
    });
    return result;
}

/**
 * 数组删除元素
 * @param ary
 * @param func
 */
export function aryRemove(ary, func){
    validateArray(ary);
    if(isFunc(func)){
        for(let i = 0;i < ary.length;i++){
            const item = ary[i];
            if(func(item,i,ary)){
                ary.splice(i,1);
                i--;
            }
        }
    }else{
        const index = ary.indexOf(func);
        if (index !== -1) {
            ary.splice(index, 1);
        }
    }
}

/**
 * 数组分类
 * @param ary
 * @param keyFunc
 * @param valueFunc
 */
export function aryClassify(ary,keyFunc = 'type',valueFunc){
    validateArray(ary);
    const result = {};
    keyFunc = defineFunc(keyFunc,item => item[keyFunc]);
    valueFunc = defineFunc(valueFunc,item => item);
    ary.forEach((item, i) => {
        const key = keyFunc(item,i,ary);
        const value = valueFunc(item,i,ary);
        const list = result[key] || [];
        list.push(value);
        result[key] = list;
    });
    return result;
}

/**
 * 删除重复项
 * @param ary
 * @param fn
 * @returns {any[]}
 */
export function aryRemoveRepeat(ary,fn){
    validateArray(ary);
    if(!fn){
        return Array.from(new Set(ary));
    }
    const temp = [];
    return ary.filter((item,index) => {
        const value = fn(item,index,ary);
        if(temp.includes(value)){
            return false;
        }
        temp.push(value);
        return true;
    });
}

/**
 * 过滤空值
 * @param ary
 * @returns {*}
 */
export function aryFilterDef(ary){
    validateArray(ary);
    return ary.filter(item => isDef(item));
}

/**
 * 找到指定节点
 * @param ary
 * @param func
 * @param childrenField
 * @param parent
 * @param index
 * @returns {number | * | undefined|*}
 */
export function aryFindChild(ary,func,childrenField = 'children',parent = null,index = 0){
    validateArray(ary);
    func = defineFunc(func,item => item === func);
    for(let i = 0;i < ary.length;i++){
        const item = ary[i];
        if(func(item,parent,index)){
            return item;
        }
        const children = item[childrenField] || [];
        const childrenResult = children.length && aryFindChild(children,func,childrenField,item,index + 1);
if(childrenResult){
            return childrenResult;
        }
    }
}

/**
 * 寻找所有匹配子节点
 * @param ary
 * @param func
 * @param childrenField
 * @param parent
 * @param index
 * @returns {Array}
 */
export function aryFindChildren(ary,func,childrenField = 'children',parent = null,index = 0){
    validateArray(ary);
    func = defineFunc(func,item => item === func);
    return ary.map(item => {
        const list = func(item,parent,index) ? [item] : [];
        const children = item[childrenField] || [];
        const childrenResult = children.length && aryFindChildren(children,func,childrenField,item,index + 1);
        return childrenResult ? list.concat(childrenResult) : list;
    }).reduce((pv,item) => pv.concat(item),[]);
}

/**
 * 获取数组中结果为true的一项，并返回结果
 * @param ary
 * @param func
 */
export function aryFindResult(ary,func){
    let result = null;
    toAry(ary).find((item,index) => {
        result = callFunc(func,item,index,ary);
        return !!result;
    });
    return result;
}

export function aryInit(func,length = 1){
    if(isNum(func)){
        length = func;
        func = null;
    }
    return new Array(length).fill(true).map((item,i) => {
        if(func){
            return callFunc(func,i,i);
        }else{
            return i;
        }
    });
}
