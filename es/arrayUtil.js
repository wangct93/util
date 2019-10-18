import {isFunc,isArray,isDef} from './typeUtil';
import {validateArray} from "./validateUtil";

export function toArray(ary){
    return isArray(ary) ? ary : isDef(ary) ? [ary] : [];
}

export function aryToObject(ary, key, valueFunc){
    validateArray(ary);
    const result = {};
    const keyFunc = formatFunc(key,item => item[key]);
    valueFunc = formatFunc(valueFunc,item => item);
    ary.forEach((item, i) => {
        result[keyFunc(item,i,ary)] = valueFunc(item,i,ary);
    });
    return result;
}

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

export function classify(ary,keyFunc = 'type',valueFunc){
    validateArray(ary);
    const result = {};
    keyFunc = formatFunc(keyFunc,item => item[keyFunc]);
    valueFunc = formatFunc(valueFunc,item => item);
    ary.forEach((item, i) => {
        const key = keyFunc(item,i,ary);
        const value = valueFunc(item,i,ary);
        const list = result[key] || [];
        list.push(value);
        result[key] = list;
    });
    return result;
}

export function noRepeat(ary){
    validateArray(ary);
    return Array.from(new Set(ary));
}

export function compact(ary){
    validateArray(ary);
    return ary.filter(item => isDef(item))
}

export function findChild(ary,func,childrenField = 'children',parent = null){
    validateArray(ary);
    func = formatFunc(func,item => item === func);
    for(let i = 0;i < ary.length;i++){
        const item = ary[i];
        if(func(item,parent)){
            return item;
        }
        const children = item[childrenField] || [];
        const childrenResult = children.length && findChild(children,func,childrenField,item);
if(childrenResult){
            return childrenResult;
        }
    }
}

export function findChildren(ary,func,childrenField = 'children',parent = null){
    validateArray(ary);
    func = formatFunc(func,item => item === func);
    return ary.map(item => {
        const list = func(item,parent) ? [item] : [];
        const children = item[childrenField] || [];
        const childrenResult = children.length && findChildren(children,func,childrenField,item);
        return childrenResult ? list.concat(childrenResult) : list;
    }).reduce((pv,item) => pv.concat(item),[]);
}

function formatFunc(func,defaultFunc){
    return isFunc(func) ? func : defaultFunc;
}
