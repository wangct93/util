import stringUtil from './stringUtil';

export default {
    format(...args){
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
                const value = config[key];
                return stringUtil.addZero(value,match.length);
            });
        });
        return result;
    },
    diffDays(date,num){
        return diff('Date',date,num);
    },
    diffMonths(date,num){
        return diff('Month',date,num);
    },
    diffYears(date,num){
        return diff('FullYear',date,num);
    },
    diffHours(date,num){
        return diff('Hours',date,num);
    },
    diffMinutes(date,num){
        return diff('Minutes',date,num);
    },
    diffSeconds(date,num){
        return diff('Seconds',date,num);
    }
};

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
    if(!(ary[0] instanceof Date)){
        ary.unshift(new Date());
    }
    return ary;
}