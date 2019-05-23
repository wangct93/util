import arrayUtil from './arrayUtil';

export default {
  toObject(obj){
    return new Object(obj);
  },
  forEach(obj,fn){
    Object.keys(obj).forEach((key) => {
      fn(obj[key],key,obj);
    });
  },
  clone(obj = {},keys = []){
    return arrayUtil.toObject(keys,item => item,item => obj[item]);
  },
  filter(obj,fn){
    return this.clone(obj,Object.keys(obj).filter((key) => fn(obj[key],key,obj)));
  },
  map(obj,fn){
    return arrayUtil.toObject(Object.keys(obj),item => item,item => fn(obj[item],item,obj));
  },
  some(obj,func){
    return Object.keys(obj).some(key => func(obj[key],key,obj));
  },
  every(obj,func){
    return Object.keys(obj).every(key => func(obj[key],key,obj));
  },
  find(obj,func){
    return Object.keys(obj).find(key => func(obj[key],key,obj));
  },
  findIndex(obj,func){
    return Object.keys(obj).findIndex(key => func(obj[key],key,obj));
  }
};