import {exampleArray, inputArray} from './day9Input'
import {getTwoElementsToMatchSum,getSubsetsEqualsSum} from '../../../utils/utils'
export async function script1(useExample: boolean) {
    const usedInput = useExample ? exampleArray : inputArray;
    const num = useExample ? 5 : 25;

    let _res 
    _res = runAndFindInvalid(usedInput,num);
    return _res;
}
export async function script2(useExample: boolean) {
    const usedInput = useExample ? exampleArray : inputArray;
    const num = useExample ? 5 : 25;
    let _res 
    _res = run2(usedInput,num);
    return _res;
}

function runAndFindInvalid(inputArray, someNum) {
    let pointer = 0;
    do {
        if (pointer < someNum) {
        } else {
            let subSet = inputArray.slice(pointer-someNum, pointer);
            if (getTwoElementsToMatchSum(subSet,inputArray[pointer]).length > 0){
            } else {
                break;
            }
        }
        pointer++;
    } while (pointer <= inputArray.length);
    return inputArray[pointer];
}

function run2(inputArray, someNum) {
    const firstInvalid = runAndFindInvalid(inputArray, someNum);
    let matchingSubset = getSubsetsEqualsSum(inputArray,firstInvalid)[0];
    matchingSubset = matchingSubset.sort();
    let sum = matchingSubset[0]+matchingSubset[matchingSubset.length-1];
    return sum;
}