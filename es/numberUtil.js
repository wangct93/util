/**
 * 转化为数字
 * @param num
 * @param value
 * @returns {number}
 */
export function toNum(num,value = 0){
    num = parseFloat(num);
    return toNumPrecision(isNaN(num) ? value : num);
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
