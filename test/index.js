
const {util,objectUtil,dateUtil,arrayUtil}  = require('../lib');

console.log(dateUtil.format(dateUtil.diffMonths(-1)));

const a = {
  a:1,
  b:{}
};

console.log(util.extend(true,{},a).b === a.b)


const list = [
  {
    name:'p1',
    children:[
      {
        name:'c1'
      },
      {
        name:'c2'
      },
      {
        name:'f'
      }
    ]
  },
  {
    name:'p2',
    children:[
      {
        name:'f'
      },
      {
        name:'2'
      },
      {
        name:'2'
      }
    ]
  }
];

console.log(arrayUtil.findChild(list,(item) => item.children && item.children.find(item => item.name === 'f')))
console.log(arrayUtil.findChildren(list,(item) => item.name === 'f'))