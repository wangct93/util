import {isFunc, isBol, isObj, isAry, isUndef, isDef, isStr, isEmpty} from "./typeUtil";
import {aryFilterDef} from "./arrayUtil";
import {stringify, strParse} from "./stringUtil";
import {objForEach} from "./objectUtil";
import {Fields} from "./options";
import {Queue,Cache} from "./dataClass";
import {toNum} from "./numberUtil";

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
 * 合并class名称
 * @param args
 * @returns {string}
 */
export function classNames(...args){
    return args.filter(item => isStr(item)).join(' ');
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
        window.document.cookie = key + '=' + value + ';' + stringify(options, '=', ';');
    } else {
        const cookie = strParse(window.document.cookie, '=', ';');
        return isDef(key) ? cookie[key] : cookie;
    }
}

/**
 * 克隆方法
 * @param v
 * @returns {never}
 */
export function cloneFunc(v){
    return new Function('return ' + v.toString())();
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
    /**
     * 获取随机字符
     * @returns {*}
     */
    function getRandomChar(){
        const chars = getRandomChars();
        return chars[Math.floor(Math.random() * chars.length)];
    }


    /**
     * 获取随机字符串列表
     */
    function getRandomChars(){
        let chars = cache(Fields.random);
        if(!chars){
            chars = [];
            const mapData = {
                '0':10,
                'aA':26,
            };
            objForEach(mapData,(value,key) => {
                key.split('').forEach(char => {
                    const baseCode = char.charCodeAt(0);
                    loop(value,(item,index) => {
                        chars.push(String.fromCharCode(baseCode + index));
                    });
                });
            });
            cache(Fields.random,chars);
        }
        return chars;
    }
    if(isUndef(length)){
        const preStr = Math.random().toString().substr(3);
        return parseInt(preStr).toString(36);
    }
    return loop(length,() => getRandomChar()).join('');
}

/**
 * 循环次数
 * @param count
 * @param func
 */
export function loop(count = 0,func){
    return new Array(count).fill(true).map((item,i) => {
        return callFunc(func,i);
    });
}

/**
 * 路径合并
 * @param args
 * @returns {string}
 */
export function pathJoin(...args){
    return args.join('/').replace(/\/+/g,'/');
}

/**
 * 字符串对等比较
 * @param first
 * @param second
 * @returns {boolean}
 */
export function strEqual(first,second){
    return first + '' === second + '';
}

/**
 * 捕捉错误
 * @param func
 * @param defaultValue
 * @returns {*}
 */
export function catchError(func,defaultValue = ''){
    let result = defaultValue;
    try{
        result = func();
    }catch(e){
        console.error('已捕捉：',e);
        console.log('使用默认值：',defaultValue);
    }
    return result;
}

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
 * 获取只调用一次方法
 * @param func
 * @returns {*}
 */
export function getOnceFunc(func){
    let flag = false;
    return (...args) => {
        if(flag){
            return;
        }
        flag = true;
        return callFunc(func,...args);
    }
}

/**
 * 获取节流函数
 * @author wangchuitong
 */
export function getThrottleFunc(func,interval = 1000){
    let sign = +new Date();
    return (...args) => {
        const now = +new Date();
        if(now - sign > interval){
            sign = now;
            return callFunc(func,...args);
        }
    }
}

/**
 * 获取防抖函数
 * @author wangchuitong
 */
export function getShakeProofFunc(func,interval = 1000){
    let timer = null;
    return (...args) => {
        clearInterval(timer);
        timer = setTimeout(() => {
            callFunc(func,...args);
        },interval);
    }
}

/**
 * 数值精度转换
 * @author wangchuitong
 */
export function toNumPrecision(num){
    return toNum(toNum(num).toFixed(12));
}
