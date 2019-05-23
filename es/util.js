import stringUtil from './stringUtil';

export default {
    /*类型判断*/
    isFalse,
    isTrue,
    isFunc,
    isNum,
    isString,
    isObject,
    isArray,
    isBoolean,
    isRegExp,
    isPromise,
    isDate,
    isDef,
    isUndef,
    isNull,
    /*类型判断*/
    equal,
    queue,
    cache,
    callFunc,
    random,
    classNames,
    getQsParams,
    getQsString,
    cookie,
    cloneFunc,
    extend,
    scroll
};

function _getType(v){
    return Object.prototype.toString.call(v);
}

function isFunc(v){
    return _getType(v) === '[object Function]';
}

function isNum(v){
    return _getType(v) === '[object Number]';
}

function isArray(v){
    return _getType(v) === '[object Array]';
}

function isBoolean(v){
    return _getType(v) === '[object Boolean]';
}

function isObject(v){
    return _getType(v) === '[object Object]';
}

function isString(v){
    return _getType(v) === '[object String]';
}

function isDate(v){
    return _getType(v) === '[object Date]';
}

function isUndef (v) {
    return v === undefined;
}

function isDef (v) {
    return v !== undefined && v !== null;
}

function isTrue (v) {
    return v === true;
}

function isFalse (v) {
    return v === false;
}

function isNull (v) {
    return v === null;
}

function isPromise (v) {
    return isDef(v) && typeof isFunc(v.then) && isFunc(v.catch)
}

function isRegExp(v){
    return _getType(v) === '[object RegExp]';
}

function callFunc(func,...ary) {
    if (isFunc(func)) {
        return func.call(this, ...ary);
    }
}

function equal(self,other) {
    if (_getType(self) === _getType(other) && isDef(self)) {
        const keys = Object.keys(self);
        return keys.length === Object.keys(other).length && keys.every(key => self[key] === other[key])
    } else {
        return self === other;
    }
}

function queue(option){
    return new Queue(option);
}

/**
 * 队列执行，根据数组按顺序执行
 * @param opt       配置项有：       list execFunc limit success
 * @constructor
 */
class Queue {
    state = {
        limit: 1,
        interval: 10,
        runCount: 0,
        list: [],
        result: [],
    };

    constructor(option) {
        this.init(option);
    }

    init(option){
        this.setProps(option);
        this.start();
    }

    setProps(option) {
        this.props = {
            ...this.state,
            ...option
        };
    }

    updateProps(option){
        this.setProps({
            ...this.getProps(),
            ...option
        });
    }

    getProps(){
        return this.props;
    }

    start() {
        const {runCount, limit} = this.getProps();
        new Array(limit - runCount).fill().forEach(() => {
            this.props.runCount++;
            this.exec();
        });
    }

    exec() {
        const props = this.getProps();
        const {getItem, func, success, result} = props;
        const item = isFunc(getItem) ? getItem.call(this) : props.list.shift();
        if (isUndef(item)) {
            let {runCount} = props;
            runCount--;
            this.updateProps({runCount});
            if (runCount === 0) {
                callFunc(success,result);
            }
        } else {
            func(item, (data) => {
                const props = this.getProps();
                props.result.push(data);
                setTimeout(() => {
                    this.exec();
                }, props.interval);
            });
        }
    }
}

function cache(options){
    return new CacheData(options);
}

class CacheData{
    state = {
        limit:100
    };

    cache = {};

    constructor(option){
        this.init(option);
    }

    init(option){
        this.setProps(option);
    }

    setProps(option){
        this.props = {
            ...this.state,
            ...option
        };
    }

    getProps(){
        return this.props;
    }

    getCache(){
        return this.cache;
    }

    setCache(key,value){
        const cache = this.getCache();
        cache[key] = {
            key,
            value,
            time:+new Date()
        };
    }

    check(){
        const cache = this.getCache();
        const keys = Object.keys(cache);
        if(keys.length > this.getProps().limit){
            const deleteKey = keys.sort((a,b) => cache[a].time - cache[b].time)[0];
            delete cache[deleteKey];
        }
    }

    getItem(key){
        const cache = this.getCache();
        const item = cache[key];
        return item && item.value;
    }

    setItem(key,value){
        this.setCache(key,value);
        this.check();
        return this;
    }
}

function random(){
    return parseInt(+Math.random().toString().substr(3) + +new Date()).toString(36)
}

function classNames(){
    return Array.from(arguments).filter(item => !!item).join(' ');
}

function getQsParams(){
    return stringUtil.parse(window.location.search.substr(1));
}

function getQsString(params,originParams = {}){
    return stringUtil.stringify({...originParams, ...params});
}

function cookie(key,value,options = {}){
    if(isDef(value)){
        window.document.cookie = key + '=' + value + ';' + stringUtil.stringify(options,'=',';');
    }else{
        const cookie = stringUtil.parse(window.document.cookie,'=',';');
        return isDef(key) ? cookie[key] : cookie;
    }
}

function cloneFunc(v){
    return new Function('return ' + v.toString())()
}

function extend(){
    const args = Array.from(arguments);
    let deep = false;
    let index = 1;
    let target = args[0];
    if(isBoolean(target)){
        deep = target;
        target = args[1];
        index = 2;
    }
    target = target || {};
    for(;index < args.length;index++){
        const extTarget = args[index];
        if(isDef(extTarget)){
            Object.keys(extTarget).forEach(key => {
                let value = extTarget[key];
                if(deep){
                    if(isFunc(value)){
                        value = cloneFunc(value);
                    }else if(isObject(value)){
                        value = extend(deep,{},value);
                    }else if(isArray(value)){
                        value = extend(deep,[],value);
                    }
                }
                target[key] = value;
            })
        }
    }
    return target;
}

function scroll(num){
    window.document.documentElement.scrollTop = num;
}