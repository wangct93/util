

const spawn = require('cross-spawn');



const cs = spawn('npm',['run','babel']);


cs.on('close',(code) => {
  console.log('结束',code);
});
