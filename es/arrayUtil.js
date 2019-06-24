import {isFunc,isArray,isDef} from './typeUtil';

export function toArray(ary){
    return isArray(ary) ? ary : isDef(ary) ? [ary] : []
}

export function toObject(ary, keyFunc, valueFunc){
    const result = {};
    keyFunc = formatFunc(keyFunc,item => item[keyFunc]);
    valueFunc = formatFunc(valueFunc,item => item);
    ary.forEach((item, i) => {
        result[keyFunc(item,i,ary)] = valueFunc(item,i,ary);
    });
    return result;
}

export function remove(ary, item){
    const index = ary.indexOf(item);
    if (index !== -1) {
        ary.splice(index, 1);
    }
}

export function classify(ary,keyFunc = 'type',valueFunc){
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
    return Array.from(new Set(ary));
}

export function compact(ary){
    return ary.filter(item => isDef(item))
}

export function findChild(ary,func,childrenField = 'children'){
    func = formatFunc(func,item => item === func);
    for(let i = 0;i < ary.length;i++){
        const item = ary[i];
        if(func(item)){
            return item;
        }
        const children = item[childrenField] || [];
        const childrenResult = children.length && findChild(children,func);
        if(childrenResult){
            return childrenResult;
        }
    }
}

export function findChildren(ary,func,childrenField = 'children'){
    func = formatFunc(func,item => item === func);
    return ary.map(item => {
        const list = func(item) ? [item] : [];
        const children = item[childrenField] || [];
        const childrenResult = children.length && findChildren(children,func);
        return childrenResult ? list.concat(childrenResult) : list;
    }).reduce((pv,item) => pv.concat(item),[]);
}

export function formatFunc(func,defaultFunc){
    return isFunc(func) ? func : defaultFunc;
}
