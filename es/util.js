import {isFunc, isBol, isObj, isAry, isUndef, isDef, isStr} from "./typeUtil";
import {aryFilterDef} from "./arrayUtil";
import {stringify, strParse} from "./stringUtil";
import {toPromise} from "./promiseUtil";
import {objForEach} from "./objectUtil";
import {Fields} from "./options";

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
 * @param options
 * @returns {Promise<any>}
 */
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

/**
 * 缓存
 */
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

/**
 * 合并class名称
 * @param args
 * @returns {string}
 */
export function classNames(...args){
    return args.filter(item => isStr(item)).join(' ');
}

/**
 * 获取地址参数（对象格式）
 */
export function getQsParams(){
    return strParse(window.location.search.substr(1));
}

/**
 * 转化参数为地址参数
 * @param params
 * @param originParams
 */
export function getQsString(params,originParams = {}){
    return stringify({...originParams, ...params});
}

/**
 * cookie操作
 * @param key
 * @param value
 * @param options
 * @returns {*}
 */
export function cookie(key,value,options = {}){
    if(isDef(value)){
        window.document.cookie = key + '=' + value + ';' + stringify(options,'=',';');
    }else{
        const cookie = strParse(window.document.cookie,'=',';');
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
        deep = false;
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
 * 界面滚动高度
 * @param num
 */
export function scroll(num){
    window.document.documentElement.scrollTop = num;
}

/**
 * 获取随机字符串
 * @param length
 * @returns {string}
 */
export function random(length){
    if(isUndef(length)){
        const preStr = Math.random().toString().substr(3);
        return parseInt(preStr).toString(36);
    }
    return loop(length,() => getRandomChar()).join('');
}

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
    let chars = getConfig(Fields.random);
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
        setConfig(Fields.random,chars);
    }
    return chars;
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
export function catchError(func,defaultValue){
    let result = defaultValue;
    try{
        result = func();
    }catch(e){
        console.error('已捕捉：',e);
        console.log('使用默认值：',defaultValue);
    }
    return result;
}

let _config = {};

/**
 * 设置配置
 * @param key
 * @param value
 */
export function setConfig(key,value){
  if(isUndef(value)){
      _config = key;
  }else{
      _config[key] = value;
  }
}

/**
 * 获取配置
 * @param key
 * @returns {*}
 */
export function getConfig(key){
  return isUndef(key) ? _config : _config[key];
}

/**
 * 只调用一次方法
 * @param type
 * @param func
 * @returns {*}
 */
export function once(type,func){
    let data = getConfig(type);
    if(!data){
        data = {
           value:func(),
        };
        setConfig(type,data);
    }
    return data.value;
}

/**
 * 清除一次调用的缓存
 * @param type
 */
export function clearOnce(type){
  setConfig(type,null);
}

/**
 * 取消冒泡
 * @param e
 * @returns {(() => void) | void}
 */
export function stopPropagation(e){
  return e.stopPropagation && e.stopPropagation();
}

/**
 * 取消默认事件
 * @param e
 * @returns {(() => void) | void}
 */
export function preventDefault(e){
    return e.preventDefault && e.preventDefault();
}
