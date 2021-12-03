import {exampleArray, inputArray} from './day3Input'
import {binStringToDecimal} from '../../../utils/utils'
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

const run = (array: any[]) => {
    let reduced = [];
    for (let i = 0; i < array[0].length; i++) {
        reduced.push(findCommonBit(array,i,true));
    }
    let gamma = reduced.map(String).join('');
    let epsi = gamma.split('').map(Number).map(el=>!el).map(Number).map(String).join('')
    return binStringToDecimal(gamma)*binStringToDecimal(epsi)
}

const run2 = (array: any[]) => {
    const firstNumber = find(array,true).map(String).join('');
    const scndNumber = find(array,false).map(String).join('');
    return binStringToDecimal(firstNumber)*binStringToDecimal(scndNumber)
}

let findCommonBit = (numbers, index, dir) =>{
    let acc = 0;
    numbers.forEach(el=>acc+=el[index]);
    if(dir){
        return acc>=numbers.length/2 ? 1 : 0
    } else {
        return acc<numbers.length/2 ? 1 : 0
    }
}

let find = (array: any[],dir) => {
    for (let i = 0; i < array[0].length; i++) {
        const commonBit = findCommonBit(array,i,dir)
        array = array.filter(el=>el[i] === commonBit)
        if(array.length === 1) {
            return array[0];
        }
    }
}