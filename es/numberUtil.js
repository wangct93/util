/**
 * 转化为数字
 * @param num
 * @param value
 * @returns {number}
 */
export function toNum(num,value = 0){
    num = parseFloat(num);
    return isNaN(num) ? value : num
}
