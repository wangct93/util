


const util = require('../lib');

util.onceQueue([1,2,3,4,5,6],(item) => {
  console.log(item,22222222222222222);
  return new Promise(cb => {
    setTimeout(() => {
      console.log(item);
      cb(item);
    },2000);
  })
})
