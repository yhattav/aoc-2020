import {exampleArray, inputArray, eCheckList, iCheckList} from './day19Input'
export async function script1(useExample: boolean) {
    const usedInput = useExample ? exampleArray : inputArray;
    const checkList = useExample ? eCheckList : iCheckList;
    let _res 
    try {

        _res = run(usedInput,checkList);
    } catch (err) {
        console.error(err)
    }
    return _res;
}
export async function script2(useExample: boolean) {
    const usedInput = useExample ? exampleArray : inputArray;
    let _res 
    _res = (usedInput);
    return _res;
}

function run(rulesArray,checkList){
    const rulesMap = createRulesMap(rulesArray);
    console.warn(rulesMap);
    debugger;
    link(rulesMap);
    let rules = getRuleList(rulesMap)
    let allowedMessages = checkList.filter(message=>{
        return (rules.findIndex(rule => rule === message) !== -1)
    })
    return allowedMessages.length;
}

function createRulesMap(rulesArray){
    const res = new Map();
    rulesArray.forEach((value,index)=>{
        res.set(index,value);
    });
    return res;
}

function link(rulesMap) {
    const regex = /[0-9]+/
    rulesMap.forEach((value,key)=> {
        value.forEach((pos)=>{
            pos.map((rule,index)=>{
                let tested = rule[0]
                if (regex.test(tested)){
                    pos[index] = rulesMap.get(Number(tested));
                }
            })
        })
    })
}


function getRuleList(rulesMap) {
    let first = (rulesMap.get(0))[0].slice(0);
    let stringsPos = [];
    stringsPos = first.map(val=>{
        return aaa(val);
    })
    let posArray = [''];
    posArray = bbb(stringsPos,posArray);
    return posArray;
}

function aaa(array) {
    if(array.length === 3 && array[1][0] === '|') {
        return [aaa(array[0]),aaa(array[2])]
    } else if (array.length === 1 && typeof array[0][0] === 'string') {
        return array[0];
    } else {
        return array.map(val=>{
            return aaa(val);
        })
    }
}

function bbb(array,posArray) {
    array.forEach(val => {
        if (val.length === 1) {
            posArray = posArray.map(pos=>{
                return pos + val[0];
            })
        } else {
            let pos1 = posArray.slice(0);
            let pos2 = posArray.slice(0);
            if(val[1][0] !== '|') debugger;
            pos1 = bbb(val[0],pos1);
            pos2 = bbb(val[2],pos2);
            return posArray = pos1.concat(pos2);
        }
    })
    return posArray;
    
}