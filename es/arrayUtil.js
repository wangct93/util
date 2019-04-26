import asyncImport from './async';
const utils = asyncImport({
    base:() => require('./util').default
});

function isFunc(v){
    return utils.base.isFunc(v);
}

export default {
    toArray(ary){
        return Array.isArray(ary) ? ary : [ary];
    },
    remove(ary, item){
        const index = ary.indexOf(item);
        if (index !== -1) {
            ary.splice(index, 1);
        }
    },
    classify(ary,field = 'type',valueFunc){
        const result = {};
        ary.forEach((item, i) => {
            const key = isFunc(field) ? field(item,i,ary) : item[field];
            const value = isFunc(valueFunc) ? valueFunc(item,i,ary) : item;
            const list = result[key] || [];
            list.push(value);
            result[key] = list;
        });
        return result;
    },
    toObject(ary, field, valueFunc){
        const result = {};
        ary.forEach((item, i) => {
            const key = isFunc(field) ? field(item, i, ary) : item[field];
            result[key] = isFunc(valueFunc) ? valueFunc(item, i, ary) : item;
        });
        return result;
    },
    noRepeat(ary){
        return Array.from(new Set(ary));
    },
    compact(ary){
        return ary.filter(item => item && !isNaN(item))
    },
    findChild(ary,func,childrenField = 'children'){
        func = utils.base.isFunc(func) ? func : (item) => item === func;
        for(let i = 0;i < ary.length;i++){
            const item = ary[i];
            if(func(item)){
                return item;
            }
            const children = item[childrenField] || [];
            const childrenResult = children.length && this.findChild(children,func);
            if(childrenResult){
                return childrenResult;
            }
        }
    },
    findChildren(ary,func,childrenField = 'children'){
        func = utils.base.isFunc(func) ? func : (item) => item === func;
        return ary.map(item => {
            const list = func(item) ? [item] : [];
            const children = item[childrenField] || [];
            const childrenResult = children.length && this.findChild(children,func);
            return childrenResult ? list.concat(childrenResult) : list;
        }).reduce((pv,item) => pv.concat(item),[]);
    }
};
