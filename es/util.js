import * as objectUtil from './objectUtil';
import {isFunc, isBoolean, isObject, isArray, isUndef, isDef, isString} from "./typeUtil";
import {compact} from "./arrayUtil";
import {stringify, strParse} from "./stringUtil";
import {toPromise} from "./promiseUtil";

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

export function onceQueue(options){
    return new Promise((cb) => {
        new Queue({
            ...options,
            success:cb
        })
    })
}

/**
 * 队列执行，根据数组按顺序执行
 * @param opt       配置项有：       list execFunc limit success
 * @constructor
 */
export class Queue {
    config = {
        limit: 1,
        interval: 10,
        list: [],
        result: [],
    };

    runCount = 0;
    sucResult = [];
    errResult = [];

    constructor(options) {
        this.setConfig(options);
        this.start();
    }

    setConfig(config) {
        this.config = {
            ...this.config,
            ...config
        };
    }

    getConfig(){
        return this.config;
    }

    start() {
        const {limit} = this.getConfig();
        loop(Math.max(limit - this.runCount,0),() => {
            setTimeout(() => {
                this.execItem();
            },0);
        });
        this.runCount = limit;
    }

    execItem() {
        const config = this.getConfig();
        const {getItem} = config;
        const item = isFunc(getItem) ? getItem.call(this) : config.list.shift();
        if (isUndef(item)) {
            this.runCount--;
            if (this.runCount === 0) {
                callFunc(config.success,this.sucResult,this.errResult,this);
                this.sucResult = [];
                this.errResult = [];
            }
        } else {
            const pro = toPromise(callFunc.call(this,config.func,item));
            pro.finally(() => {
                setTimeout(() => {
                    this.execItem();
                }, config.interval);
            })
              .then(data => this.sucResult.push(data))
              .catch(err => this.errResult.push(err));
        }
    }
}

export class Cache{
    config = {
        limit:1000
    };

    data = {};

    static newItem(key,value){
        return {
            key,
            value,
            time:+new Date()
        }
    }

    constructor(options){
        this.setConfig(options);
    }

    setConfig(config){
        this.config = {
            ...this.config,
            ...config
        };
    }

    getConfig(){
        return this.config;
    }

    check(){
        const {data} = this;
        const keys = Object.keys(data);
        if(keys.length > this.getConfig().limit){
            const deleteKey = keys.sort((a,b) => data[a].time - data[b].time)[0];
            delete data[deleteKey];
        }
    }

    getItem(key){
        const item = this.data[key];
        return item && item.value;
    }

    setItem(key,value){
        this.data[key] = Cache.newItem(key,value);
        this.check();
        return this;
    }
}


export function classNames(...args){
    return args.filter(item => isString(item)).join(' ');
}

export function getQsParams(){
    return strParse(window.location.search.substr(1));
}

export function getQsString(params,originParams = {}){
    return stringify({...originParams, ...params});
}

export function cookie(key,value,options = {}){
    if(isDef(value)){
        window.document.cookie = key + '=' + value + ';' + stringify(options,'=',';');
    }else{
        const cookie = strParse(window.document.cookie,'=',';');
        return isDef(key) ? cookie[key] : cookie;
    }
}

export function cloneFunc(v){
    return new Function('return ' + v.toString())()
}

export function extend(deep,...args){
    if(!isBoolean(deep)){
        args.unshift(deep);
        deep = false;
    }
    const target = args[0];
    compact(args.slice(1)).forEach(item => {
        objectUtil.forEach(item,(value,key) => {
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
    });
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

export function loop(count = 0,func){
    new Array(count).fill(true).forEach((item,i) => {
        callFunc(func,i);
    })
}

export function pathJoin(...args){
    return args.join('/').replace(/\/+/g,'/');
}

export function defineValue(value,replaceValue){
    return isDef(value) ? value : replaceValue;
}
