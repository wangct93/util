import {toStr} from "./stringUtil";


function blobToBase64(blob){
  if(!blob){
    return null;
  }
  return new Promise((cb,eb) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      cb(e.target.result);
    };
    reader.onerror = eb;
    reader.readAsDataURL(blob);
  })

}

function isImgFileType(type){
  return type.startsWith('image');
}

function getBase64FileType(base64){
  return toStr(base64).split(';')[0].split(':')[1];
}
