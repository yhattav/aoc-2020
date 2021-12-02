import { sumArrayOfNumbers } from '../../../utils/utils';
import {exampleArray, inputArray} from './day2Input'
export async function script1(useExample: boolean) {
    const usedInput = useExample ? exampleArray : inputArray;
    let _res 
    _res = run(usedInput);
    return _res;
}
export async function script2(useExample: boolean) {
    const usedInput = useExample ? exampleArray : inputArray;
    let _res 
    _res = run2(usedInput);
    return _res;
}

const run = (string: string) => {

    let arr = string.split(',').sort();
    let firstForwardIdx = arr.findIndex(val=>val.includes('forward'))
    let firstUpIdx = arr.findIndex(val=>val.includes('up'))

    const numbers = string.split(',').sort().join(',').replace(/down /gm, '').replace(/forward /gm, '').replace(/up /gm, '').split(',').map(Number);
    let downs = sumArrayOfNumbers(numbers.slice(0,firstForwardIdx));
    let forwards = sumArrayOfNumbers(numbers.slice(firstForwardIdx,firstUpIdx));
    let ups = sumArrayOfNumbers(numbers.slice(firstUpIdx));
    let depth = downs - ups;
    return depth * forwards;
}

let run2 = (string: string) => {
    let aim = 0;
    let forwardAcc=0;
    let depthAcc=0;
    string.split(',').forEach(val=>{
        if(val.includes('down')) {
            const num = Number(val.replace('down ',''))
            aim +=num;
        } else if (val.includes('up')) {
            const num = Number(val.replace('up ',''))
            aim -=num;
        } else if (val.includes('forward')) {
            const num = Number(val.replace('forward ',''))
            forwardAcc +=num;
            depthAcc+= num*aim;
        }
    })
    console.log({forwardAcc,depthAcc})
    return forwardAcc*depthAcc;

}