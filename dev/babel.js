/**
 * Created by wangct on 2018/12/22.
 */
const Babel = require('wangct-babel');
const t = +new Date();
new Babel({
    src:'es',
    output:'lib',
    option:{
        presets: ['@babel/preset-react', '@babel/preset-env'],
        plugins: [
            ['@babel/plugin-transform-typescript', {
                isTSX: true,
                allExtensions: true
            }],
            '@babel/plugin-syntax-dynamic-import',
            ['@babel/plugin-proposal-decorators', {legacy: true}],
            ['@babel/plugin-proposal-class-properties',{loose:true}],
            '@babel/plugin-proposal-export-default-from',
        ]
    },
    success(){
        console.log(`success，用时：${+new Date() - t}ms`);
    }
});