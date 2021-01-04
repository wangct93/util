//url：http：//cloud.huawei.com/item.htm?a=1&b=2&c=&d=xxx&e,请写一段程序提取URL中的各个参数（参数名和参数个数不确定），将其按key-value形式返回到一个json结构中，如{a:'1',b:'2':c:'',d:'xxx',e:undefined}

console.log(getParams('http：//cloud.huawei.com/item.htm?a=1&b=2&c=&d=xxx&e'))

function getParams(url){
  url = url.toString();
  const index = url.indexOf('?');
  const str = url.substr(index + 1,url.length);
  const params = {};
  str.split('&').forEach((item) => {
    const ary = item.split('=');
    params[ary[0]] = ary[1];
  });
  return params;
}
