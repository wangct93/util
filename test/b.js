/**
 * Created by wangct on 2019/1/27.
 */


const http = require('http');

http.createServer((req,res) => {
  res.end('wangct');
}).listen(8888,() => {
  console.log('started on 8888');
})
