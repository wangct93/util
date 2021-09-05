/**
 * Created by wangct on 2018/12/22.
 */
const babel = require('@wangct/babel');
const {fileDelete} = require("@wangct/node-util/lib/file");
const t = +new Date();

start();

async function start(){
  await clearDir();
  startBabel();
}

function startBabel(){
  babel({
    src: 'es',
    output: 'lib',
    success() {
      console.log(`success，用时：${+new Date() - t}ms`);
    }
  });
}


async function clearDir(){
  fileDelete('lib');
}
