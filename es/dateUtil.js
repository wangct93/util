import moment from 'moment';

/**
 * 获取当前时间
 */
export function getNowString(format = 'YYYY-MM-DD HH:mm:ss'){
    return moment().format(format);
}
