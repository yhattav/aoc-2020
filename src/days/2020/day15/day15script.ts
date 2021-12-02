import {exampleArray, inputArray} from './day15Input'
export async function script1(useExample: boolean) {
    const usedInput = useExample ? exampleArray : inputArray;
    let _res 
    _res = run(usedInput,2020);
    return _res;
}
export async function script2(useExample: boolean) {
    const usedInput = useExample ? exampleArray : inputArray;
    let _res 
    _res = run(usedInput,30000000);
    return _res;
}
function run(inputArray, numOfTimes: number) {
    let startinglength = inputArray.length;
    let elfTurn = startinglength;
    let lastNumber
    let record = new Map();
    let recordArray = inputArray.slice(0,inputArray.length-1);
    recordArray.forEach((value,index)=>{
        record.set(value, index+1);
    })
    lastNumber = inputArray[inputArray.length - 1];
    do {
        let temp;
        if(record.has(lastNumber)) {
            temp = elfTurn  - record.get(lastNumber);
        } else {
            temp = 0;
        }
        record.set(lastNumber, elfTurn);
        lastNumber = temp;
    elfTurn++;
    } while (elfTurn<numOfTimes);
    return lastNumber
}


