import {exampleArray, inputArray} from './day1Input'
export async function script1(useExample: boolean) {
    console.log('HERE')
    const usedInput = useExample ? exampleArray : inputArray;
    let _res 
    _res = run(usedInput);
    return _res;
}
export async function script2(useExample: boolean) {
    const usedInput = useExample ? exampleArray : inputArray;
    let _res 
    _res = run(windows(usedInput));
    return _res;
}

const run = (array: number[]) => {
    let sum = 0;
    for (let i = 1; i < array.length; i++) {
        sum += (array[i] > array[i-1] ? 1 : 0)
    }
    return sum;
}

const windows = (array: number[]) => {
    const arr = array.slice(0);
    arr.push(0);
    arr.push(0);
    return arr.map((_,index) =>{
        return arr[index] + arr[index+1]  + arr[index+2]
    })
}