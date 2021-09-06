import {toAry} from "./arrayUtil";
import {callFunc, catchError} from "./util";
import {isDef, isStr} from "./typeUtil";
import {stringify, strParse, toStr} from "./stringUtil";

/**
 * 加载js
 * @param list
 * @returns {Promise<any[]>}
 */
export async function loadScripts(list){
  return Promise.all(toAry(list).map((item) => {
    return new Promise((cb,eb) => {
      const script = document.createElement('script');
      script.src = item;
      script.onload = cb;
      script.onerror = eb;
      document.head.appendChild(script);
    })
  }));
}


/**
 * 全屏方法
 */
export function fullScreen(elem = window.document.documentElement){
  const func = elem.requestFullscreen || elem.mozRequestFullScreen || elem.webkitRequestFullscreen || elem.msRequestFullscreen;
  callFunc.call(elem,func);
}

/**
 * 退出全屏方法
 */
export function exitFullScreen(doc = window.document){
  const func = doc.exitFullscreen || doc.msExitFullscreen || doc.mozCancelFullScreen || doc.webkitCancelFullScreen;
  callFunc.call(doc,func);
}

/**
 * 判断是否全屏
 */
export function isFullScreen(screen = window.screen){
  return screen.height === window.innerHeight && screen.width === window.innerWidth;
}


/**
 * cookie操作
 * @param key
 * @param value
 * @param options
 * @returns {*}
 */
export function setCookie(key,value,options = {}) {
  window.document.cookie = key + '=' + value + ';' + stringify(options, '=', ';');
}


/**
 * cookie操作
 * @param key
 * @returns {*}
 */
export function getCookie(key) {
  const cookie = strParse(window.document.cookie, '=', ';');
  return isDef(key) ? cookie[key] : cookie;
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
 * 选择文件
  * @param options
 * @returns {Promise<any>}
 */
export function selectFile(options = {}){
  const isMultiple = options.multiple;
  return new Promise((cb,eb) => {
    const input = document.createElement('input');
    input.type = 'file';
    const style = {
      position:'absolute',
      left:'-1000px',
      top:'0px',
      visibility:'hidden',
    };
    Object.keys(style).forEach((key) => {
      input.style[key] = style[key];
    });
    document.body.appendChild(input);
    Object.keys(options).forEach((key) => {
      input.setAttribute(key,options[key]);
    });
    input.onchange = (e) => {
      cb(isMultiple ? input.files : input.files[0]);
      document.body.removeChild(input);
    };
    input.click();
  })
}


/**
 * 设置本地缓存
 */
export function setLocalStore(key,value,store = localStorage){
  if(!isStr(value)){
    value = JSON.stringify(value);
  }
  store.setItem(key,value);
}

/**
 * 获取本地缓存
 */
export function getLocalStore(key,store = localStorage){
  const value = store.getItem(key);
  return catchError(() => {
    return JSON.parse(value);
  },value);
}

/**
 * 拖拽事件
 * @param e
 * @param options
 */
export function elemDragStart(e,options = {}){
  const isTouchEvent = isTouch(e);
  e = getDragEvent(e);
  const ox = e.clientX;
  const oy = e.clientY;
  let moveX = 0;
  let moveY = 0;
  const moveLimit = 10;
  let isMove = false;
  const moveName = isTouchEvent ? 'touchmove' : 'mousemove';
  const upName = isTouchEvent ? 'touchend' : 'mouseup';
  const mousemove = (moveEvent) => {
    const event = getDragEvent(moveEvent);
    if(isMove){
      const dx = event.clientX - ox;
      const dy = event.clientY - oy;
      callFunc(options.onMove,moveEvent,dx,dy,dx - moveX,dy - moveY);
      moveX = dx;
      moveY = dy;
    }else if(Math.abs(event.clientX - ox) > moveLimit || Math.abs(event.clientY - oy) > moveLimit){
      isMove = true;
    }
  };
  const mouseup = (upEvent) => {
    const event = getDragEvent(upEvent);
    if(!isMove){
      callFunc(options.onClick,upEvent);
    }else{
      callFunc(options.onUp,upEvent,event.clientX - ox,event.clientY - oy);
    }
    document.removeEventListener(moveName,mousemove);
    document.removeEventListener(upName,mouseup);
  };
  document.addEventListener(moveName,mousemove);
  document.addEventListener(upName,mouseup);
}


/**
 * 获取移动的事件对象
 * @author wangchuitong
 */
function getDragEvent(e){
  return isTouch(e) ? e.changedTouches[e.changedTouches.length - 1] : e;
}

/**
 * 是否为移动滑动事件
 * @author wangchuitong
 */
function isTouch(e){
  return toStr(e.type).includes('touch');
}
