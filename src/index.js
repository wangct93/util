import {onceQueue, random} from "../es";

onceQueue([1,2,3],(item) => {
  console.log(1111,item);
});

console.log(random());
