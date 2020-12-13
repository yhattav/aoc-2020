import {exampleArray, inputArray} from './day13Input'
export async function script1(useExample: boolean) {
    const usedInput = useExample ? exampleArray : inputArray;
    let _res 
    _res = getNearest(usedInput);
    return _res;
}
export async function script2(useExample: boolean) {
    const usedInput = useExample ? exampleArray : inputArray;
    let _res 
    _res = findOrder(usedInput);
    return _res;
}

function getNearest(inputArray) {
    let array = inputArray.slice(0);

    let santaTime = array.shift();
    let smallest = Infinity;
    let smallestIdx;
    array.map((value,index)=>{
        let res = value - santaTime % value;
        if(smallest > res) {smallest = res; smallestIdx = index;}
        return res;
    })
    return smallest*array[smallestIdx];
}


function findOrder(inputArray) {
    let array = inputArray.slice(0);
    array.shift();
    let object = {};
    array.map((value,index)=>{
        if (value > 0){object[value] = index};
    })
    let res;
    let shouldContinue = true;
    do {
        const {should,finalAnswer,busNumber} = killTwo2(object);
        shouldContinue = should;
        res = finalAnswer;
    } while (shouldContinue);
    return (res);
}
function killTwo2(givenObject) {
    let numbers = []
    numbers = Object.keys(givenObject).reverse();
    numbers = numbers.slice(0,2);
    
    let first = numbers[0];
    let firstIdx = givenObject[first];
    if (numbers.length===1) return {should:false, finalAnswer: numbers[0]-givenObject[numbers[0]]};
    
    let res;
    let start = numbers.reduce((a, b)=> a*b, 1) - firstIdx;
    for (let i = start; i > 0; i-=first) {
        let match = false;
        match = numbers.every(val=>{
            let index = givenObject[val];
            let num = (i + index);
            res = num % val === 0
            return res;
        })
        if (match === true) {res = i; break;}
    }

    let newIndex = start - res + firstIdx;
    let busNumber = start + firstIdx;
    delete givenObject[numbers[0]];
    delete givenObject[numbers[1]];
    givenObject[busNumber] = newIndex;
    return ({should:true, finalAnswer: newIndex, busNumber});
}
