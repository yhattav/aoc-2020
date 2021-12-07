import {exampleArray, inputArray} from './day7Input'
import {calcMean,calcMedian} from '../../../utils/utils'
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

const run = (input) => {
    const median = calcMedian(input);
    let acc = 0;
    input.forEach((value) => {
        acc+= Math.abs(median-value);
    })

    return acc;
}
const run2 = (input) => {
    const mean = calcMean(input);
    let floored = Math.floor(mean);
    let ceiled = Math.ceil(mean);
    let accF = 0;
    let accC = 0;
    input.forEach((value) => {
        let AnFloored = Math.abs(floored-value);
        let AnCeiled = Math.abs(ceiled-value);
        const arithmeticSumF = ((AnFloored)*(AnFloored+1)) / 2
        const arithmeticSumC = ((AnCeiled)*(AnCeiled+1)) / 2
        accF+=arithmeticSumF
        accC+=arithmeticSumC
    })
    return Math.min(accF,accC);
}