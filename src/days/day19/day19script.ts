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
        if(array[0] === '|') return array;
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
    return getMatches2(posArray42,posArray31,checkList);
}


function getRuleList2(rulesMap) {
    let pos42 = (rulesMap.get(42)).slice(0);
    let pos31 = (rulesMap.get(31)).slice(0);
    let stringsPos42 = [];
    stringsPos42 = pos42.map(val=>{
        return aaa(val);
    })
    let posArray42 = [''];
    posArray42 = bbb([stringsPos42],posArray42);
    let stringsPos31 = [];
    stringsPos31 = pos31.map(val=>{
        return aaa(val);
    })
    let posArray31 = [''];
    posArray31 = bbb([stringsPos31],posArray31);
    return {posArray42,posArray31};
}

function getMatches2(posArray42,posArray31,checkList) {
    const regexArray42 = [];
    posArray42.forEach(pos42=>{
        regexArray42.push(new RegExp(`^(${pos42})`))
    })
    const regexArray31 = [];
    posArray31.forEach(pos31=>{
        regexArray31.push(new RegExp(`(${pos31})$`))
    })
    checkList = checkList.filter(ele => isValid(ele,regexArray42,regexArray31))
    console.log(checkList)
    return checkList.length;
};

function isValid(string,regexArray42,regexArray31,count42=0,count31=0) {
    let pos 
    if (string === '') {

        if (count31>0 && count42>count31) {
            return true; //string is a match for the rule of 1: 8 11.
        } else {
            return false; //doesnt match and theres no where to go.
        }

    } else { //there a string left to verify
        pos = getAllPosToRemove42(string,regexArray42);
        if (pos.length === 0 ) { //42 didnt match
            if (count42 === 0) {
                return false; //42 was never matched on this and its invalid
            } else {
                if (count31 < count42) { //checking for 31 is relevant
                    pos = getAllPosToRemove31(string,regexArray31);
                    if (pos.length === 0) { 
                        //cant match anything more. (tryed both)
                        return false;
                    } else { //31 is a match
                        return pos.some(string=>{
                            return isValid(string,regexArray42,regexArray31,count42,count31+1)
                        });
                    }
                } else {
                    return false; // cant match anything relevant;
                }
            }
        } else { //42 is a match
            return pos.some(string=>{
                return isValid(string,regexArray42,regexArray31,count42+1,count31)
            })
        }
    }
    

}

function getAllPosToRemove42(string,regexArray42) {
    let pos = [];
    regexArray42.forEach(regex=>{
        let match = string.match(regex)

        if(match) {
            let newString = string.slice(match[0].length);
            pos.push(newString);
        }

    })
    return pos;
}

function getAllPosToRemove31(string,regexArray31) {
    let pos = [];
    regexArray31.forEach(regex=>{
        let match = string.match(regex)

        if(match) {
            let newString = string.slice(0,match.index);
            pos.push(newString);
        }

    })
    return pos;
}