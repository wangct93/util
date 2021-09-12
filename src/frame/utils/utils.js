import {isStr, toPromise} from "@wangct/util";
import React from "react";
import {addFragment, removeFragment} from "./state";
import Loading from "../components/Loading";
import {Modal} from 'antd';
import {catchError, random} from "@wangct/util/lib/util";
import {getConfig, setConfig} from './globalUtil';

/**
 * 获取全局配置
 */
export function getGlobalConfig(key){
  return getConfig(key);
}

/**
 * 设置全局配置
 * @param key
 * @param value
 */
export function setGlobalConfig(key,value){
  setConfig(key,value);
}

/**
 * 显示加载中
 * @param promise
 * @param message
 * @returns {Q.Promise<T> | Promise<any> | Promise<T>}
 */
export function showLoading(promise,message = '操作处理中，请稍候...'){
  const content = <Loading key={random()} loading title={message} />;
  addFragment(content);
  return toPromise(promise).finally(() => {
    removeFragment(content);
  });
}

/**
 * 获取元素
  * @param elem
 * @returns {HTMLElement}
 */
export function getElem(elem){
  return isStr(elem) ? document.getElementById(elem) : elem;
}

/**
 * 确认弹窗
  * @param options
 */
export function openConfirm(options){
  Modal.confirm({
    ...options,
  })
}

/**
 * 设置本地缓存
 * @param key
 * @param value
 */
export function setLocalStore(key,value){
  if(!isStr(value)){
    value = JSON.stringify(value);
  }
  localStorage.setItem(key,value);
}

/**
 * 获取本地缓存
 * @param key
 */
export function getLocalStore(key){
  const value = localStorage.getItem(key);
  return catchError(() => {
    return JSON.parse(value);
  },value);
}

/**
 * 是否为开发环境
 * @author wangchuitong
 */
export function isDevEnv(){
  let isDev = getGlobalConfig('isDev');
  if(isDev == null){
    try{
      isDev = define_isDevEnv;
    }catch(e){

    }
  }
  return isDev;
}
