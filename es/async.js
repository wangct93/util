module.exports = function(options){
  return new Async(options).target;
};


class Async{
  constructor(options){
    this._init(options);
  }

  _init(opts){
    this.initConfig(opts);
    this.initModules();
    this.initDefineProperties();
  }

  initConfig(opts){
    this.opts = opts;
    this.target = {};
  }

  getModule(key){
    const module = this.modules[key];
    if(module.target){
      return module.target;
    }
    module.target = module.getTarget();
    return module.target;
  };

  initModules(){
    const modules = {};
    Object.keys(this.opts).forEach(key => {
      modules[key] = {
        loaded:false,
        getTarget:this.opts[key]
      }
    });
    this.modules = modules;
  }

  getTarget(){
    return this.target;
  }

  initDefineProperties(){
    Object.keys(this.opts).forEach(key => {
      Object.defineProperty(this.getTarget(),key,{
        get:() => this.getModule(key)
      })
    })
  }
}