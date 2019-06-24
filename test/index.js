
const util = require('../lib');




function t(){
  return new Promise(cb => {
    setTimeout(() => {
      cb('w')
    },2000);
  })
}

util.util.promise(t).then(d => {
  console.log(d);
})

util.util.promise('d').then(d => {
  console.log(d);
})
