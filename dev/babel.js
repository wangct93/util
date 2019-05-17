/**
 * Created by wangct on 2018/12/22.
 */
const Babel = require('wangct-babel');
const t = +new Date();
new Babel({
    src:'es',
    output:'lib',
    success(){
        console.log(`success，用时：${+new Date() - t}ms`);
    }
});