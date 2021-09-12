import {PureComponent} from "react";
import {toAry, toPromise} from "@wangct/util";
import {callFunc, equal} from "@wangct/util/lib/util";

/**
 * 自定义组件
 */
export default class DefineComponent extends PureComponent {

  componentDidMount() {
    this.init();
  }

  init(){
    this.initValue();
    this.initOptions();
    this.initData();
  }

  initOptions(){
    const {optionsPromise} = this;
    if(optionsPromise){
      toPromise(optionsPromise).then((options) => {
        this.setOptions(options);
      });
    }
  }

  checkProp(prevProps,field,func){
    return this.checkField(prevProps,field,func);
  }

  checkField(prevProps,field,func){
    if(!equal(prevProps[field],this.props[field])){
      callFunc.call(this,func);
    }
  }

  getOptions(){
    return toAry(this.getProp('options'));
  }

  getValue(){
    return this.getProp('value');
  }

  getData(){
    return this.getProp('data') || {};
  }

  setData(data){
    this.setState({
      data,
    });
    callFunc(this.props.onData,data);
  }

  getTextField(){
    return this.getProp('textField') || 'text';
  }

  getValueField(){
    return this.getProp('valueField') || 'value';
  }

  getItemValue(item){
    const {valueFormatter} = this.props;
    const value = item && item[this.getValueField()];
    return valueFormatter ? valueFormatter(value,item) : value;
  }

  getItemText(item){
    const {textFormatter} = this.props;
    const text = item && item[this.getTextField()];
    return textFormatter ? textFormatter(text,item) : text;
  }

  setElem = (elem) => {
    this.elem = elem;
  };

  getElem(){
    return this.elem;
  }

  setTarget = (target) => {
    this.refTarget = target;
  };

  getTarget(){
    return this.refTarget;
  }

  setSubTarget = (target) => {
    this.refSubTarget = target;
  };

  getSubTarget(){
    return this.refSubTarget;
  }

  getProps(filterKeys = []){
    const props = {
      ...this.state,
      ...this.props,
    };
    toAry(filterKeys).forEach((key) => {
      delete props[key];
    });
    return props;
  }

  getProp(key){
    if(key in this.props){
      return this.props[key];
    }
    return this.getState()[key];
  }

  getState(){
    return this.state || {};
  }

  setForm = (form) => {
    this.form = form;
  };

  getForm(){
    return this.form;
  }

  formChange = (formValue) => {
    this.setState({
      formValue
    });
    callFunc(this.props.formChange,formValue);
  };

  formFieldChange = (field,value) => {
    this.formChange({
      ...this.getValue(),
      [field]:value,
    });
  };

  onChange = (value,...args) => {
    this.setState({
      value,
    });
    callFunc(this.props.onChange,value,...args);
  };

  getFormValue(){
    return this.getProp('formValue') || {};
  }

  getSelectedKey(){
    return this.getProp('selectedKey');
  }

  setSelectedKey = (key) => {
    this.setState({
      selectedKey:key,
    });
    callFunc(this.props.onSelect,key);
  };

  setSelectedKeys = (keys,list) => {
    this.setState({
      selectedKeys:keys,
    });
    callFunc(this.props.onSelect,keys,list);
  };

  getSelectedKeys(){
    return this.getAryByField('selectedKeys');
  }

  setSelectedRows = (list) => {
    this.setState({
      selectedRows:list,
    });
  };

  getSelectedRows(){
    return this.getAryByField('selectedRows');
  }

  rowSelectionChange(keys,rows){
    this.setSelectedKeys(keys,rows);
    this.getSelectedRows(rows);
    this.setState({
      rowSelection:{
        selectedKeys:keys,
        selectedRows:rows,
      },
    });
    callFunc(this.props.rowSelectionChange,keys,rows);
  }

  isDisabled(){
    return this.getProp('disabled');
  }

  isReadonly(){
    return this.getProp('readonly') || this.getProp('readOnly');
  }

  isReadOnly(){
    return this.isReadonly();
  }

  getColumns(){
    return toAry(this.getProp('columns'));
  }

  initValue(){
    const defaultValue = this.getProp('defaultValue');
    if(this.getProp('value') == null && defaultValue != null){
      this.onChange(defaultValue);
    }
    if(this.valuePromise){
      toPromise(this.valuePromise).then((value) => {
        this.onChange(value);
      });
    }
  }

  initData(){
    if(this.dataPromise){
      toPromise(this.dataPromise).then((data) => {
        this.setData(data);
      });
    }
  }

  getPathParams(){
    return this.props.match && this.props.match.params || {};
  }

  setOptions(options){
    options = toAry(options);
    this.setState({
      options,
    });
    callFunc(this.props.onOptionsChange,options);
    callFunc(this.props.optionsChange,options);
  }

  fieldChange = (field,value) => {
    this.setState({
      [field]:value,
    });
  };

  setStateElem = (elem) => {
    this.setState({
      _elem:elem,
    });
  };

  getStateElem(){
    return this.state && this.state._elem;
  }

  setTable = (table) => {
    this.table = table;
  };

  getTable(){
    return this.table;
  }

  tableSearch(params){
    const table = this.getTable();
    if(table && table.doSearch){
      table.doSearch(params);
    }
  }

  tableReload(){
    const table = this.getTable();
    if(table && table.doReload){
      table.doReload();
    }
  }

  focus = () => {
    const elem = this.getElem();
    if(elem && elem.focus){
      elem.focus();
    }
  };

  componentDidCatch(error, errorInfo) {
    console.error(error);
    // this.setState({
    //   _isError:true,
    // });
    // @ts-ignore
    // this.normalRender = this.render;
    // this.render = () => {
    //   return <div>error</div>;
    // };
  }

  getFilterOptions(){
    return this.getAryByField('filterOptions');
  }

  getAryByField(field){
    return toAry(this.getProp(field));
  }

  getList(){
    return this.getAryByField('list');
  }

  /**
   * 获取div的属性
   */
  getDivProps(){
    const fields = ['column','verticalCenter','wrap','draw','data','showList','showPreview'];
    return this.getProps(fields);
  }

}
