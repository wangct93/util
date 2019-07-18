
const util = require('../lib');




const cache = new util.Cache();


cache.setItem('key','wangct');

console.log(cache.getItem('key'),cache);
