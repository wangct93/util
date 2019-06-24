import * as stringUtil from './stringUtil';
import * as objectUtil from './objectUtil';
import {isFunc,isBoolean,isObject,isArray,isUndef,isDef} from "./typeUtil";

export * from './typeUtil';

export function callFunc(func,...ary) {
    if (isFunc(func)) {
        return func.call(this, ...ary);
    }
}

export function equal(self,other) {
    if (typeof self === 'object' && typeof other === 'object' && isDef(self) && isDef(other)) {
        const keys = Object.keys(self);
        return keys.length === Object.keys(other).length && keys.every(key => self[key] === other[key])
    } else {
        return self === other;
    }
}

export function queue(option){
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

export function cache(options){
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


export function classNames(){
    return Array.from(arguments).filter(item => !!item).join(' ');
}

export function getQsParams(){
    return stringUtil.parse(window.location.search.substr(1));
}

export function getQsString(params,originParams = {}){
    return stringUtil.stringify({...originParams, ...params});
}

export function cookie(key,value,options = {}){
    if(isDef(value)){
        window.document.cookie = key + '=' + value + ';' + stringUtil.stringify(options,'=',';');
    }else{
        const cookie = stringUtil.parse(window.document.cookie,'=',';');
        return isDef(key) ? cookie[key] : cookie;
    }
}

export function cloneFunc(v){
    return new Function('return ' + v.toString())()
}

export function extend(){
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

export function scroll(num){
    window.document.documentElement.scrollTop = num;
}



const randomChars = [];
initRandomChars();

export function random(length){
    if(isUndef(length)){
        return parseInt(+Math.random().toString().substr(3) + +new Date()).toString(36);
    }
    return new Array(length).fill(0).map(() => getRandomChar()).join('');
}

function getRandomChar(){
    return randomChars[Math.floor(Math.random() * randomChars.length)];
}


function initRandomChars(){
    const temp = {
        '0':10,
        'aA':26,
    };
    objectUtil.forEach(temp,(value,key) => {
        key.split('').forEach(char => {
            const baseCode = char.charCodeAt(0);
            new Array(value).fill(0).forEach((v,i) => {
                randomChars.push(String.fromCharCode(baseCode + i));
            });
        });
    });
}

export async function promise(func){
    return isFunc(func) ? func() : func;
}
