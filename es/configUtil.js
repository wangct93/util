

let configData = {};

export function setConfig(key,value){
  configData[key] = value;
}

export function getConfig(key){
  return configData[key];
}
