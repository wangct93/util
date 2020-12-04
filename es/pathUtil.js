import {toStr} from "./stringUtil";

/**
 * 合并路径
 */
export function pathJoin(...args){
  return Array.from(args).join('/').replace(/\/+/g,'/');
}

/**
 * 路径匹配
 * @author wangchuitong
 */
export function pathMatch(targetPath, pathname) {
  return pathname && targetPath && (toStr(pathname) + '/').startsWith(toStr(targetPath) + '/');
}
