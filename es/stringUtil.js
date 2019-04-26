
export default {
  toString(str){
    return str ? str + '' : '';
  },
  computeDiff(self = '',other = ''){
    const len = Math.max(self.length,other.length);
    let selfNum = 0;
    let otherNum = 0;
    const n = 4;
    new Array(len).fill().forEach((m,i) => {
      selfNum += self[i] ? self.charCodeAt(i) / (100 ** (i - n)) : 0;
      otherNum += other[i] ? other.charCodeAt(i) / (100 ** (i - n)) : 0;
    });
    return selfNum - otherNum;
  },
  addZero(str,len,prefix = true){
    const fstr = str.toString();
    const extStr = '0'.repeat(len - fstr.length);
    return prefix ? extStr + fstr : fstr + extStr;
  },
  toMoneyFormat(str = '0'){
    return parseInt(this.toNumber(str,0),10).toString().replace(/\B(?=(\d{3})+$)/g,',')
  },
  decodeHtml(str = ''){
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
    return newStr === str ? newStr : this.decodeHtml(newStr);
  },
  parse(str = '',equalSep = '=',linkSep = '&'){
    const result = {};
    str.split(linkSep).forEach(item => {
      const [key = '',value = ''] = item.split(equalSep);
      if(key && value){
        result[key.trim()] = decodeURIComponent(value.trim());
      }
    });
    return result;
  },
  stringify(data,equalSep = '=',linkSep = '&'){
    return Object.keys(data).filter(key => data[key] !== undefined).map(key => `${key}${equalSep}${data[key]}`).join(linkSep);
  }
};