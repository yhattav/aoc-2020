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
    const checkList = useExample ? eCheckList : iCheckList;

    let _res 
    _res = run2(usedInput,checkList);
    return _res;
}

function run(rulesArray,checkList){
    const rulesMap = createRulesMap(rulesArray);
    console.warn(rulesMap);
    link(rulesMap);
    let rules = getRuleList(rulesMap)
    const allowedMessages = checkList.filter(element => rules.includes(element));
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
                let tested = rule
                if (regex.test(tested)){
                    pos[index] = rulesMap.get(Number(tested));
                } else {
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
        return [aaa(array[0]),array[1],aaa(array[2])]
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
            if(typeof val[0] === 'string' ) {
                posArray = posArray.map(pos=>{
                    return pos + val[0];
                })
            } else {
                posArray = bbb(val,posArray);
            }
        } else if (val.length === 2){
            posArray = bbb(val,posArray);
        } else if(val.length ===3){
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

function run2(rulesArray,checkList){
    const rulesMap = createRulesMap(rulesArray);
    link(rulesMap);
    const {posArray42,posArray31} = getRuleList2(rulesMap)
    const regexArray8 = [];
    posArray42.forEach(pos42=>{
        regexArray8.push(new RegExp(`^(${pos42})+`))

    })
    let processedCheckList8 = []
    checkList.filter(element => {
        return regexArray8.some(regex=>{
            let match = element.match(regex)
            if(match) {
                let newEle = element.slice(match[0].length);
                processedCheckList8.push(newEle);
            }
            return !!match;
        
        })
    
    });

    const regexArray11 = [];

    posArray42.forEach(pos42=>{
        posArray31.forEach(pos31=>{
        regexArray11.push(new RegExp(`^${pos42}${pos31}$`))
        regexArray11.push(new RegExp(`^${pos42}${pos42}${pos31}${pos31}$`))
        regexArray11.push(new RegExp(`^${pos42}${pos42}${pos42}${pos31}${pos31}${pos31}$`))
        regexArray11.push(new RegExp(`^${pos42}${pos42}${pos42}${pos42}${pos31}${pos31}${pos31}${pos31}$`))
    })
})

let processedCheckList11 = []
processedCheckList8.filter(element => {
    return regexArray11.some(regex=>{
        let match = element.match(regex)
        if(match) {
            processedCheckList11.push(element);
        }
        return !!match;
    
    })

});
console.warn(processedCheckList11);
debugger;
process11(regexArray11,processedCheckList8);

    debugger;
    // return allowedMessages.length;
}


function getRuleList2(rulesMap) {
    let pos42 = (rulesMap.get(42))[0].slice(0);
    let pos31 = (rulesMap.get(31))[0].slice(0);
    let stringsPos42 = [];
    stringsPos42 = pos42.map(val=>{
        return aaa(val);
    })
    let posArray42 = [''];
    posArray42 = bbb(stringsPos42,posArray42);
    let stringsPos31 = [];
    stringsPos31 = pos31.map(val=>{
        return aaa(val);
    })
    let posArray31 = [''];
    posArray31 = bbb(stringsPos31,posArray31);
    return {posArray42,posArray31};
}

function process11(regexArray, checkList) {

    let list = checkList.slice(0);
    let should = true;
    let count = 0;
    let x= 0;
    do {
        should = false;
        list = list.map(element => {
            let newVal
            regexArray.forEach(regex=>{
                let match = element.match(regex)
                if(match) {
                    should = true;
                    let newEle = element.replace(match[0],'');
                    if(newEle.length === 0) { 
                        count++;
                    } else if (match.index === 0) { 
                        debugger;
                    }
                    newVal = newEle;
                    }
            newVal = element;
            })
            return newVal;
        });
        console.log(count,list)
        debugger;



    x++;
    } while (should && x<10)
}