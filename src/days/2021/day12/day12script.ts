
import {exampleArray, inputArray} from './day12Input'
import { deepCopyMultiDimensionalArray, isLowerCase } from '../../../utils/utils';
export async function script1(useExample: boolean) {
    const usedInput = useExample ? exampleArray : inputArray;
    storyFunction = doesntvisitSmallTwice
    let _res 
    _res = run(usedInput);
    return _res;
}
export async function script2(useExample: boolean) {
    storyFunction = dontVisitSameSmallTwiceTwice;
    const usedInput = useExample ? exampleArray : inputArray;
    let _res 
    _res = run(usedInput);
    return _res;
}
var storyFunction = (array)=>true;
const run = (input) => {
    //onces
    let store = [];
    let reversed = deepCopyMultiDimensionalArray(input).map(el=>el.reverse())
    let whole = input.concat(reversed)
    let startArrays = whole.filter(el=>el[0]==='START');
    let counter = 0
    let arr = startArrays;
    while (counter < 10000 && arr.length >0) {
        counter ++;
        arr = deepCopyMultiDimensionalArray(step(arr,whole));
        store = store.concat(arr.filter(isFull))
        arr = arr.filter(path => !isFull(path));
    }
    return store.length;

}

const doesntvisitSmallTwice = (array) => {
    let acc = [];
    array.map(el=>{
        if(isLowerCase(el)) {
            acc.push(el)
        };
    });

    let unique = [...new Set(acc)];

    return unique.length === acc.length;
}

const dontVisitSameSmallTwiceTwice = (array) => {
    let lowers = array.filter(isLowerCase);
    let keys = {};
    lowers.forEach(val=> {
        keys[val] = !keys[val] ? 1 : keys[val]+1;
    })
    if(lowers.length === 0) {
        return true;
    }
    let reducer = (accumulator, currentValue) => accumulator + currentValue;
    let num = Object.values(keys).reduce(reducer);
    let length = Object.values(keys).length;
    return (num === length || num === length+1)
}

const step = (array,inputArray)=>{
    let newArray=[];
    array.forEach(path=>{
        let lastCave = path[path.length-1];
        let firstCave = path[0];
        if(lastCave ==='END') {
            newArray.push(path);
        } else {
            inputArray.forEach(inputPath=>{
                let firstInputCave = inputPath[0];
                let lastInputCave = inputPath[0];
                if(firstInputCave === lastCave && lastInputCave !== firstCave) {
                    newArray.push(path.concat(inputPath.slice(1)))
                }
            })
        }
    })
    return newArray.filter(storyFunction).filter(path=>path[path.length-1] !== 'START')
}

const isFull = (path) =>{
    return (path[0] === 'START' && path[path.length-1] === 'END') 
}