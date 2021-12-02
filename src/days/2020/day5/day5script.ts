import {exampleArray, inputArray} from './day5Input'

export async function script1(useExample: boolean) {
    const usedInput = useExample ? exampleArray : inputArray;
    let _res 
    _res = findHighestSeatScore(usedInput);
    return _res;
}
export async function script2(useExample: boolean) {
    const usedInput = useExample ? exampleArray : inputArray;
    let _res 
    _res = findEmptySeat(usedInput);
    return _res;
}

function getSeatDecimal(seatString){
    var binary = seatString;
    var decimal = parseInt(binary, 2);
    return decimal;
}

function findHighestSeatScore(seatArray){
    let res = -1;
    seatArray.forEach(value=>{
        const setValue = getSeatDecimal(value);
        if(setValue>res) res = setValue;
    })
    return res;
}
function sitThemAll(seatArray,seats){
    seatArray.forEach(value=>{
        const seatValue = getSeatDecimal(value);
        seats[seatValue] = '#';
    })
}

function findEmptySeat(seatArray){
    const seats = new Array(1000);
    sitThemAll(seatArray,seats);
    let res
    for (let i= 0; i < 1000; i++) {
        if ( !seats[i] && seats[i-1] && seats[i+1]) res = i;
    }
    return res;
}