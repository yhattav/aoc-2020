import {exampleArray, inputArray} from './day6Input'
import {countUnique} from '../../utils/utils'
export async function script1(useExample: boolean) {
    const usedInput = useExample ? exampleArray : inputArray;
    let _res 
    const regex = /,,/gm;
const regex2 =  /,/gm;
    _res = countThem(usedInput.replace(regex,'=').replace(regex2,'').split('=').map(value=>value.split('')));
    return _res;
}
export async function script2(useExample: boolean) {
    const usedInput = useExample ? exampleArray : inputArray;
    let _res 
    const regex = /,,/gm;
const regex2 =  /,/gm;
    _res = countThem2(usedInput.replace(regex,'=').split('=').map(value=>value.split(',')));
    return _res;
}

function countThem(inputArray) {
    let res = 0;
    inputArray.forEach(group=>{
        res += countUnique(group);
    });
    return res;
}

function countThem2(inputArray) {
    let res = 0;
    inputArray.forEach(group=>{
        res += countEveryoneInGroup(group);
    });
    return res;
}

// function countEveryoneInGroup(groupArray){
//     console.log(groupArray)
//     groupArray.map(group=>{
//         return new Set(group)
//     })
//     console.log(groupArray)
//     debugger
//     const pplInGroup = groupArray.length;
//     let allAnswers = groupArray.join('').split('').sort().join('');
//     console.log(allAnswers);
//     let str1 = `[abcdefghijklmnopqrstuvwxyz]{${pplInGroup}}`
//     console.log(str1)
//     var re = new RegExp(str1, "gm");
//     let matches = allAnswers.match(re);
//     debugger;
//     const reducer = (accumulator, currentValue) => accumulator + (countUnique(currentValue) === 1 ? 1 : 0);
//     let num = matches.reduce(reducer, 0);
//     return num;
// }


function countEveryoneInGroup(groupArray){
    let res = 0;
    for (let i = 97; i <= 122; i++) {
        let tested = String.fromCharCode(i)
        let reducer = (accumulator, currentValue) => accumulator + (currentValue.split('').some(value => value === tested) ? 1 : 0);
        if (groupArray.reduce(reducer, 0) === groupArray.length) res++;
        
    }
    return res;
}