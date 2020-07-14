import {defineValue} from "./defineUtil";

/**
 * 转化为字符串
 * @param str
 * @returns {string}
 */
export function toStr(str){
  return defineValue(str,'') + '';
}

/**
 * 解析html字符串
 * @param str
 * @returns {string}
 */
export function decodeHtml(str = ''){
  const config = {
    amp: '&',
    apos: '\'',
    lt: '<',
    gt: '>',
    quot: '"',
    nbsp: '\xa0',
    middot: '·',
    rdquo: '”',
    ldquo: '“',
    mdash: '—',
    deg:'°',
    bull:'•',
    auml:'ä',
    sup1:'¹',
    eacute:'é',
    ccedil:'ç',
    frac34:'¾',
    egrave:'è',
    acute:'´',
    sect:'§',
    raquo:'»',
    aelig:'æ',
    iexcl:'¡',
    yen:'¥',
    aring:'å',
    curren:'¤',
    copy:'©',
    iuml:'ï',
    frac14:'¼',
    ordm:'º',
    not:'¬',
    iquest:'¿',
    cedil:'¸',
    pound:'£',
    reg:'®',
    shy:'­',
    sup3:'³',
    macr:'¯',
    plusmn:'±',
    laquo:'«',
    frac12:'½',
    sup2:'²',
    brvbar:'¦',
    cent:'¢',
    para:'¶',
    ordf:'ª'
  };
  const re = /&([a-z0-9]+);/ig;
  const newStr = str.replace(re, (match, matchKey) => {
    const key = matchKey.toLowerCase();
    return config[key] ? config[key] : match;
  });
  return newStr === str ? newStr : decodeHtml(newStr);
}

/**
 * 字符串解析
 * @param str
 * @param equalSep
 * @param linkSep
 */
export function strParse(str = '',equalSep = '=',linkSep = '&'){
  const result = {};
  str.split(linkSep).forEach(item => {
    const [key = '',value = ''] = item.split(equalSep);
    if(key && value){
      result[key.trim()] = decodeURIComponent(value.trim());
    }
  });
  return result;
}

/**
 * 对象字符串
 * @param data
 * @param equalSep
 * @param linkSep
 * @returns {string}
 */
export function stringify(data,equalSep = '=',linkSep = '&'){
  return Object.keys(data).filter(key => data[key] !== undefined).map(key => `${key}${equalSep}${data[key]}`).join(linkSep);
}

/**
 * 地址栏参数转化
  * @param params
 * @returns {string}
 */
export function queryString(params){
  if(params){
    return stringify(params);
  }
  return strParse(window.location.search.substr(1));
}
