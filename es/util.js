import {isFunc, isBol, isObj, isAry, isDef} from "./typeUtil";
import {aryFilterDef, aryInit} from "./arrayUtil";
import {strGetRandom} from "./stringUtil";
import {objForEach} from "./objectUtil";
import {Queue} from "./dataClass";
import {getCookie, setCookie} from "./browserUtil";
import {cloneFunc} from "./funcUtil";

/**
 * 调用函数，过滤错误
 * @param func
 * @param ary
 * @returns {*}
 */
export function callFunc(func,...ary) {
    if (isFunc(func)) {
        return func.call(this, ...ary);
    }
    return func;
}

/**
 * 判断对象值相等
 * @param self
 * @param other
 * @returns {boolean}
 */
export function equal(self,other) {
    if (typeof self === 'object' && typeof other === 'object' && isDef(self) && isDef(other)) {
        const keys = Object.keys(self);
        return keys.length === Object.keys(other).length && keys.every(key => self[key] === other[key])
    } else {
        return self === other;
    }
}

/**
 * 一次队列
 * @param data
 * @param func
 * @param options
 * @returns {Promise<any>}
 */
export function onceQueue(data,func,options){
    return new Promise((cb) => {
        new Queue({
            ...options,
            data,
            func,
            success:cb
        });
    });
}

/**
 * cookie操作
 * @param key
 * @param value
 * @param options
 * @returns {*}
 */
export function cookie(key,value,options = {}) {
    if (isDef(value)) {
        setCookie(key,value,options);
    } else {
        return getCookie(key);
    }
}

/**
 * 继承
 * @param deep
 * @param args
 * @returns {*}
 */
export function extend(deep,...args){
    if(!isBol(deep)){
        args.unshift(deep);
        deep = true;
    }
    const target = args[0];
    aryFilterDef(args.slice(1)).forEach(item => {
        objForEach(item,(value,key) => {
            if(deep){
                if(isFunc(value)){
                    value = cloneFunc(value);
                }else if(isObj(value)){
                    value = extend(deep,{},value);
                }else if(isAry(value)){
                    value = extend(deep,[],value);
                }
            }
            target[key] = value;
        })
    });
    return target;
}

/**
 * 获取随机字符串
 * @param length
 * @returns {string}
 */
export function random(length){
    return strGetRandom(length);
}

/**
 * 循环次数
 */
export function loop(count,func){
    return aryInit(func,count);
}

/**
 * 循环次数
 */
export function loopExec(...args){
    return aryInit(...args);
}

/**
 * 捕捉错误
 * @param func
 * @param defaultValue
 * @param log
 * @returns {*}
 */
export function catchError(func,defaultValue = '',log = false){
    let result = defaultValue;
    try{
        result = func();
    }catch(e){
        if(log){
            console.error('已捕捉：',e);
            console.log('使用默认值：',defaultValue);
        }
    }
    return result;
}
