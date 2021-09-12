import './styles/global.less';
import React from 'react';
import {render} from 'react-dom';
import {getElem} from "./utils/utils";
import {setStore} from "./utils/state";
import RouterMod from "./components/Router";
import {createStore} from "./modules/store";

export DefineComponent from './components/DefineComponent';
export history from './modules/history';
export * from './utils/request';
export * from './utils/utils';
export * from './utils/path';
export * from './utils/state';
export * from './utils/alert';
export * from './utils/domUtil';
export * from './utils/hooks';
export * from './utils/modalUtil';

/**
 * 渲染方法
 */
export async function appStart(elem = 'root'){
  const models = await import('./models').then(mod => mod.default);
  elem = getElem(elem);
  const store = createStore(models);
  setStore(store);
  render(<RouterMod store={store} />,elem);
  await new Promise((cb) => {
    setTimeout(cb,0);
  });
}






