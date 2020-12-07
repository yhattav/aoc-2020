import {exampleArray, inputArray} from './day7Input'
import {countUnique} from '../../utils/utils'
let map = {};
export async function script1(useExample: boolean) {
    const usedInput = useExample ? exampleArray : inputArray;
    let _res 
    _res = findNumOfWrappers(usedInput);
    return _res;
}
export async function script2(useExample: boolean) {
    const usedInput = useExample ? exampleArray : inputArray;
    let _res 
    _res = findTotal(usedInput);
    return _res;
}

function createMap(inputArray) {
    inputArray.forEach(input=>{
        let bags = {};
        for(let i=1;i<input.length;i++) {
            let bag = input[i];
            bag = bag.split(' ');
            if(bag.length === 3) {
                bags[bag[1] +' '+ bag[2]] = Number(bag[0]);
            } else {
                bags[bag[0] +' '+ bag[1]] = 1;
            };
        }
        
        map[input[0]] = bags
    });
    return map;
}

function goOver(map) {
    let shouldKeepGoing = true;
    let list = [];
    do{
        let newInfo = false;
        for (const [key, value] of Object.entries(map)) {
            if (list.some(item => item === key)) continue;
            if (Object.keys(value).some(key =>key === 'shiny gold')) {newInfo = true; list.push(key);}
            list.forEach(item=>{
                if (Object.keys(value).some(key =>key === item)) {newInfo = true; list.push(key);}
            })
        }
        shouldKeepGoing = newInfo;
    } while (shouldKeepGoing);

    return countUnique(list);
}

function findNumOfWrappers(inputArray){
    let map = createMap(inputArray);
    return goOver(map);
}


function findTotal(inputArray){
    map = createMap(inputArray);
    return findNumOfBagsWhithing('shiny gold');
}

function goOver2(map) {

}

function findNumOfBagsWhithing(bagName):number {
    let bags = map[bagName];
    let res:number = 0;
    if (!bags) return 0;
    for (const [key, value] of Object.entries(bags)) {
        if(key === 'no other') {
        } else {
            let num :number = value;
            res += (num + num*findNumOfBagsWhithing(key));
        }
    }
    return res;
}