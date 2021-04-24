/**
 * Created by wangct on 2018/12/22.
 */
const babel = require('@wangct/babel');
const t = +new Date();
babel({
  src: 'es',
  output: 'lib',
  success() {
    console.log(`success，用时：${+new Date() - t}ms`);
  }
});
