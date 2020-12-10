import {exampleArray, inputArray} from './day10Input'
export async function script1(useExample: boolean) {
    const usedInput = useExample ? exampleArray : inputArray;
    let _res 
    _res = countGaps(usedInput);
    return _res;
}
export async function script2(useExample: boolean) {
    const usedInput = useExample ? exampleArray : inputArray;
    let _res 
    _res = findNumberOfPaths2(usedInput);
    return _res;
}

function countGaps(inputArray) {
    let last = 0;
    let bucket = [0,0,1];
    let foundError = false;
    inputArray.forEach(value => {
        let gap = value - last;
        if(gap > 3){
            foundError = true;
        } else {
            bucket[gap-1]++;
            last = value;
        }
    });
    if(foundError) return 'error';
    return bucket[0]*bucket[2];
}


function findPossibilities(inputArray,pointer){
    let possibilities = [];
    let startValue = inputArray[pointer];
    let start = pointer;
    do {
        pointer++;
        if(inputArray[pointer] - startValue <= 3) {
            possibilities.push(pointer);
        }
    } while (pointer - start < 4);
    return possibilities;
}
//19208
function findNumberOfPaths2(inputArray){
    let array = inputArray.slice(0);
    array.unshift(0);
    array.push(inputArray[inputArray.length - 1]+3);

    let possibilitiesArray = [];
    array.forEach((value,index)=>{
        let res = findPossibilities(array,index).length;
        possibilitiesArray.push(res);
    })
    possibilitiesArray.pop();
    possibilitiesArray.unshift(1);
    possibilitiesArray.push(1);
    let str = possibilitiesArray.join('')
    var re7 = new RegExp('13321',"g");
    var re4 = new RegExp('1321',"g");
    var re2 = new RegExp('121',"g");
    const matches7 = (str.match(re7)).length;
    const matches4 = (str.match(re4)).length;
    const matches2 = (str.match(re2)).length;
    return Math.pow(7,matches7)*Math.pow(4,matches4)*Math.pow(2,matches2);
}
