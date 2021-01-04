/**
 * Created by wangct on 2019/1/27.
 */


// start([100,10,20,70,60,10,50],110);
start([100,10,20,70],110);
function start(num,target){
  console.log(getAllList(num));
}


function getAllList(list,result = [],indexList = []){
  const newItem = addOnce(indexList,list.length);
  console.log(newItem);
  if(!newItem){
    return result;
  }
  // result.push(newItem);
  return getAllList(list,result,newItem);
}

function addOnce(indexList,length){
  if(indexList[indexList.length - 1] < length - 1){
    return [...indexList,getItem(indexList)];
  }
  console.log(indexList);
  return [...indexList.slice(0,indexList.length - 2),indexList[indexList.length - 2] + 1];

  function getItem(list){
    return Math.max(...list) + 1;
  }


}

function getResult(ary,target,options){
  const temp = [...indexResult,index];
  if(result.includes(temp.join('_'))){
    return null;
  }
  const sum = temp.reduce((pv,item) => pv + ary[item],0);
  if(sum === target){
    result.push(temp.join('_'));
    if(indexResult[0] === ary.length - 1){
      return result;
    }
    return null;
  }else if(index >= ary.length - 1){
    return null;
  }else if(sum > target){
    return null;
  }
  const newResult = getResult(ary,target,temp,index + 1,result);
  if(newResult){
    result.push(newResult.join('_'));
    if(indexResult[0] === ary.length - 1){
      return result;
    }
    return newResult;
  }
  return getResult(ary,target,result,index + 1);
}

function getTestResult(ary,target,result = [],index = 0,key,baseIndex = 0){
  const temp = [...result,ary[index]];
  const sum = temp.reduce((pv,item) => pv + item,0);
  if(sum === target){
    return temp;
  }else if(index >= ary.length - 1){
    return null;
  }else if(sum > target){
    return null;
  }
  const newResult = getResult(ary,target,temp,index + 1);
  if(newResult){
    return newResult;
  }
  return getResult(ary,target,result,index + 1);
}
