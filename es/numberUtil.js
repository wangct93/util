

export default {
    toNumber(num,value = 0){
        num = parseFloat(num);
        return isNaN(num) ? value : num
    }
};