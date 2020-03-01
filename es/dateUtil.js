import {isDate} from "./typeUtil";

/**
 * 日期格式化
 * @param args
 * @returns {string}
 */
export function dateFormat(...args){
    const [date,format = 'YYYY-MM-DD hh:mm:ss'] = formatArgs(...args);
    const config = {
        Y: date.getFullYear(),
        M: date.getMonth() + 1,
        D: date.getDate(),
        h: date.getHours(),
        m: date.getMinutes(),
        s: date.getSeconds()
    };
    let result = format;
    Object.keys(config).forEach(key => {
        result = result.replace(new RegExp(`${key  }+`,'g'),(match) => {
            const value = config[key] + '';
            return value.padStart(match.length,'0');
        });
    });
    return result;
}

/**
 * 差异天数
 * @param date
 * @param num
 * @returns {Date}
 */
export function diffDays(date,num){
    return diff('Date',date,num);
}

/**
 * 差异月份
 * @param date
 * @param num
 * @returns {Date}
 */
export function diffMonths(date,num){
    return diff('Month',date,num);
}

/**
 * 差异年份
 * @param date
 * @param num
 * @returns {Date}
 */
export function diffYears(date,num){
    return diff('FullYear',date,num);
}

/**
 * 差异小时
 * @param date
 * @param num
 * @returns {Date}
 */
export function diffHours(date,num){
    return diff('Hours',date,num);
}

/**
 * 差异分钟
 * @param date
 * @param num
 * @returns {Date}
 */
export function diffMinutes(date,num){
    return diff('Minutes',date,num);
}

/**
 * 差异秒数
 * @param date
 * @param num
 * @returns {Date}
 */
export function diffSeconds(date,num){
    return diff('Seconds',date,num);
}

/**
 * 差异方法
 * @param type
 * @param args
 * @returns {Date}
 */
function diff(type,...args){
    const [date,num] = formatArgs(...args);
    const typeAry = ['FullYear','Date','Month','Hours','Minutes','Seconds'];
    const targetDate = new Date(date);
    if(typeAry.indexOf(type) !== -1){
        targetDate[`set${  type}`](targetDate[`get${  type}`]() + num);
    }
    return targetDate;
}

/**
 * 格式化参数
 * @param args
 * @returns {*[]}
 */
function formatArgs(...args){
    const ary = Array.from(args);
    if(!isDate(ary[0])){
      ary.unshift(new Date());
    }
    return ary;
}
