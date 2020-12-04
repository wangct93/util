import {getCache, setCache} from "./util";
import {objForEach} from "./objectUtil";

/**
 * 取消默认事件
 * @param e
 */
export function preventDefault(e){
  if(e && e.preventDefault){
    e.preventDefault();
  }
}

/**
 * 取消冒泡
 * @param e
 */
export function stopPropagation(e){
  if(e && e.stopPropagation){
    e.stopPropagation();
  }
}

/**
 * 取消冒泡跟默认事件
 * @param e
 */
export function stopAndPreventDefault(e){
  stopPropagation(e);
  preventDefault(e);
}

/**
 * 获取当前界面滚动条宽度
 * @author wangchuitong
 */
export function getScrollbarWidth() {
  const scrollbarWidth = getCache('scrollbarWidth');
  if(scrollbarWidth){
    return scrollbarWidth;
  }
  const div = document.createElement('div');
  const styles = {
    width: '100px',
    height: '100px',
    overflowY: 'scroll',
    visibility:'hidden',
    position:'fixed',
    left:0,
    top:0,
  };
  objForEach(styles,(value,key) => {
    div.style[key] = value;
  });
  document.body.appendChild(div);
  const dw = div.offsetWidth - div.clientWidth;
  div.parentNode.removeChild(div);
  setCache('scrollbarWidth',dw);
  return dw;
}

/**
 * 获取元素相对位置
 * @author wangchuitong
 */
export function getElemRelativePos(elem){
  if(!elem){
    return null;
  }
  let parent = elem.parentNode;

  const isStatic = (childElem) => {
    const style = window.getComputedStyle(childElem);
    return style.position === 'static';
  };

  while(isStatic(parent) && parent !== document.body){
    parent = parent.parentNode;
  }
  const rect = elem.getBoundingClientRect();
  const parentRect = parent.getBoundingClientRect();
  return {
    left:rect.left - parentRect.left,
    top:rect.top - parentRect.top,
  };
}

/**
 * 下载blob数据文件
 * @author wangchuitong
 */
export function downloadBlob(blob, fileName = '导出文件') {
  const target = document.createElement("a");
  target.download = fileName;
  target.href = URL.createObjectURL(blob);
  target.click();
}

/**
 * base64转化为blob
 * @author wangchuitong
 */
export function base64ToBlob(base64Data) {
  if(!base64Data){
    return null;
  }
  let byteString;
  if(base64Data.split(',')[0].indexOf('base64') >= 0)
    byteString = atob(base64Data.split(',')[1]);  //base64 解码
  else{
    byteString = unescape(base64Data.split(',')[1]);
  }
  //mime类型 -- image/png
  const mimeString = base64Data.split(',')[0].split(':')[1].split(';')[0];
  const uintAry = new Uint8Array(byteString.length);//创建视图
  for(let i = 0; i < byteString.length; i++) {
    uintAry[i] = byteString.charCodeAt(i);
  }
  return new Blob([uintAry], {
    type: mimeString,
  });
}

/**
 * 将文件转化为base64
 * @author wangchuitong
 */
export function readFileToBase64(file){
  return new Promise((cb,eb) => {
    const reader = new FileReader();
    reader.onload = (result) => {
      cb(result.target.result);
    };
    reader.onerror = eb;
    reader.readAsDataURL(file);
  });
}
