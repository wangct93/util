import {isAry, isDef, isFunc, isUndef} from "./typeUtil";
import {toPromise} from "./promiseUtil";
import {callFunc, loop} from "./util";
import {toAry} from "./arrayUtil";

/**
 * 基础数据类
 */
export class BaseData{

  setProps(props){
    if(this.formatProps){
      props = this.formatProps(props);
    }
    this.props = {
      ...this.props,
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
}

export class Queue extends BaseData{
  constructor(props) {
    super(props);
    this.setProps(props);
    this.init();
  }

  props = {
    limit:1,
    autoStart:true,
    interval:10,
  };

  init(){
    if(this.prop('autoStart')){
      this.start();
    }
  }

  start() {
    const {current,limit} = this.getProps(this);
    loop(Math.max(limit - current,0),() => {
      setTimeout(() => {
        this.execItem();
      },0);
    });
    this.prop('current',limit);
  }

  getItem(){
    const {data} = this.getProps();
    if(isFunc(data)){
      return data.call(this);
    }else if(isAry(data)){
      return data.shift();
    }else{
      return data;
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
    const {func,current} = props;
    if(isDef(item) && func){
      toPromise(callFunc.call(this,func,item)).finally(() => {
        setTimeout(() => {
          this.execItem();
        }, props.interval);
      }).then((data) => {
        this.addResult({
          data,
          success:true,
        });
      }).catch((data) => {
        this.addResult({
          data,
          success:false,
        });
      });
    }else {
      const newCur = current - 1;
      this.prop('current', newCur);
      if (newCur === 0) {
        callFunc(props.success, props.result);
        this.clearResult();
      }
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
