import {isDate} from "./typeUtil";

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

export function diffDays(date,num){
    return diff('Date',date,num);
}

export function diffMonths(date,num){
    return diff('Month',date,num);
}

export function diffYears(date,num){
    return diff('FullYear',date,num);
}

export function diffHours(date,num){
    return diff('Hours',date,num);
}

export function diffMinutes(date,num){
    return diff('Minutes',date,num);
}

export function diffSeconds(date,num){
    return diff('Seconds',date,num);
}

function diff(type,...args){
    const [date,num] = formatArgs(...args);
    const typeAry = ['FullYear','Date','Month','Hours','Minutes','Seconds'];
    const targetDate = new Date(date);
    if(typeAry.indexOf(type) !== -1){
        targetDate[`set${  type}`](targetDate[`get${  type}`]() + num);
    }
    return targetDate;
}

function formatArgs(...args){
    const ary = Array.from(args);
    if(!isDate(ary[0])){
      ary.unshift(new Date());
    }
    return ary;
}
