/**
 * 转化为数字
 */
export function toNum(num,value = 0,digits = 6){
    num = parseFloat(num);
    num = isNaN(num) ? value : num;
    return parseFloat(num.toFixed(digits));
}

/**
 * 数值精度转换
 * @author wangchuitong
 */
export function toNumPrecision(num,digits = 6){
    return toNum(toNum(num).toFixed(digits));
}

export function fromRange(...args){
    return getRangeValue(...args);
}

export function getRangeValue(value,range = [-Infinity,Infinity]){
    return Math.max(Math.min(toNum(value),range[1]),range[0]);
}
