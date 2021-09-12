import {isAry, isDef, isFunc, isUndef} from "./typeUtil";
import {toPromise} from "./promiseUtil";
import {callFunc, loop, loopExec} from "./util";
import {aryRemove, toAry} from "./arrayUtil";
import {strGetRandom} from "./stringUtil";

/**
 * 基础数据类
 */
export class BaseData{

  constructor(props){
    const baseProps = this.getBaseProps ? this.getBaseProps(props) : {};
    props = {
      ...baseProps,
      ...props,
    };
    this.setProps(props);
  }

  setProps(props){
    this.props = {
      ...this.getProps(),
      ...props,
    }
  }

  getProps(){
    return this.props || {};
  }

  prop(key,value){
    if(isUndef(value)){
      return this.getProps()[key];
    }
    this.setProps({
      [key]:value,
    });
  }

  setProp(key,value){
    this.props = {
      ...this.getProps(),
      [key]:value,
    };
  }

  getProp(key){
    return this.getProps()[key];
  }
}

/**
 * 队列类
 * @author wangchuitong
 */
export class Queue extends BaseData{

  constructor(props) {
    super(props);
    if(this.prop('autoStart')){
      this.start();
    }
  }

  getBaseProps(){
    return {
      limit:1,
      autoStart:true,
      interval:10,
      current:0,
      waitList:[],
    };
  }

  start() {
    const {waitList,limit} = this.getProps();
    loopExec(() => {
      this.execItem();
    },Math.max(limit - waitList.length,0));
  }

  getItem(){
    const {data} = this.getProps();
    if(isFunc(data)){
      return data.call(this);
    }else{
      return toAry(data).shift();
    }
  }

  addResult(data){
    const result = toAry(this.prop('result'));
    result.push(data);
    this.prop('result',result);
  }

  clearResult(){
    this.prop('result',[]);
  }

  execItem() {
    const item = this.getItem();
    const props = this.getProps();
    let {func,waitList} = props;
    if(isDef(item)){
      if(!func){
        func = (item) => item;
      }
      const flag = strGetRandom();
      waitList.push(flag);
      toPromise(callFunc.call(this,func,item)).finally(() => {
        aryRemove(waitList,flag);
        setTimeout(() => {
          this.execItem();
        }, props.interval);
      }).then((data) => {
        this.addResult({
          data,
          success:true,
        });
      }).catch((data) => {
        console.error(data);
        this.addResult({
          data,
          success:false,
        });
      });
    }else if(waitList.length === 0){
      callFunc(props.success, props.result);
      this.clearResult();
    }
  }
}

/**
 * 缓存
 */
export class Cache extends BaseData{

  constructor(props){
    super();
    this.setProps(props);
  }

  data(...args){
    return this.prop(...args);
  }

}

export class LinkClass extends BaseData{
  constructor(target){
    super();
    this.setNode(this.getBaseNode(target));
  }

  getBaseNode(target,next,prev){
    return {
      target,
      next,
      prev,
    };
  }

  setNode(node){
    this.node = node;
  }

  getNode(){
    return this.node || {};
  }

  setNext(target){
    this.getNode().next = this.getBaseNode(target);
  }

  getNext(){
    return this.getNode().next;
  }

  setPrev(target){
    this.getNode().prev = this.getBaseNode(target);
  }

  getPrev(){
    return this.getNode().prev;
  }

}

export class QueueClass extends BaseData{
  constructor(list){
    super();
    this.list = toAry(list);
  }

  addItem(...args){
    this.list.push(...args);
  }

  getItem(){
    return this.list.shift();
  }
}

export class StackClass extends BaseData{
  constructor(list){
    super();
    this.list = toAry(list);
  }

  addItem(...args){
    this.list.unshift(...args);
  }

  getItem(){
    return this.list.shift();
  }
}
