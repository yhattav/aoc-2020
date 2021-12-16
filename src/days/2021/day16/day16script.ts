import {exampleArray, inputArray} from './day16Input'
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

const run = (input) => {
    const binInput = hexToBin(input);
    versionAcc = 0;
    processPacket(binInput)
    return versionAcc;
}
const run2 = (input) => {
    const binInput = hexToBin(input);
    const {data} = processPacket(binInput)
    return data;
}

const hexToBin = (hexString)=>{
    return hexString.split('').map(el=>hexMap[el]).join('');
}

const hexMap = {
    '0': '0000',
    '1': '0001',
    '2': '0010',
    '3': '0011',
    '4': '0100',
    '5': '0101',
    '6': '0110',
    '7': '0111',
    '8': '1000',
    '9': '1001',
    'A': '1010',
    'B': '1011',
    'C': '1100',
    'D': '1101',
    'E': '1110',
    'F': '1111'}

const getLiteralPacketData = (restOfBinString) => {
    let currentNumber;
    let binStr = ''
    let should = true;
    do {
        currentNumber = restOfBinString.slice(0,5);
        restOfBinString = restOfBinString.slice(5);
        binStr += currentNumber.slice(1,5);
        should = currentNumber[0] === '1';
    } while (should);

    return {data:binStringToDecimal(binStr),restOfBinString}
}

type proccessedOperatorPacketData = {
    type: 0 | 1,
    numberOfPacksToProccess?:number,
    stringContainingPackets?:string,
    packetsWhithin?: string,
    restOfBinString:string,
}

const getOperatorPacketData = (restOfBinString:string):proccessedOperatorPacketData => {
    let lengthTypeId = restOfBinString.slice(0,1);
    restOfBinString = restOfBinString.slice(1);
    let lengthId,lengthVal,lengthInt
    let type;
    switch (lengthTypeId) {
        case '0':
            type = 0;
            lengthId = 15;
            lengthVal = restOfBinString.slice(0,lengthId);
            restOfBinString = restOfBinString.slice(lengthId);
            lengthInt = binStringToDecimal(lengthVal);
            let data = restOfBinString.slice(0,lengthInt);
            restOfBinString = restOfBinString.slice(lengthInt);
            return {type,packetsWhithin:data,restOfBinString};
        case '1':
            type = 1;
            lengthId = 11;
            lengthVal = restOfBinString.slice(0,lengthId);
            restOfBinString = restOfBinString.slice(lengthId);
            lengthInt = binStringToDecimal(lengthVal);
            return {type,numberOfPacksToProccess:lengthInt,restOfBinString}
    }
}

var versionAcc = 0;
type processedPacketInfo = {
    restOfBinString:string,
    version:number,
    typeId:number,
    data?:any,
}

let processPacket = (binString:string):processedPacketInfo=>{
    const version = binStringToDecimal(binString.slice(0,3));
    versionAcc+=version
    const typeId = binStringToDecimal(binString.slice(3,6));
    binString = binString.slice(6);
    //get contained data
    switch(typeId) {
        case 4:
            const {data:numericData,restOfBinString: stringLeft} = getLiteralPacketData(binString);
            // console.log('Literal packet version:', version, 'with numeric data:', numericData)
            return {version,typeId,data:numericData,restOfBinString: stringLeft}
        default:
            let {
                numberOfPacksToProccess,
                packetsWhithin,
                restOfBinString
            } = getOperatorPacketData(binString);
            let dataArray = [];
            let currentRes
            if(numberOfPacksToProccess) {
                // console.log('OP packet version:', version, 'type 1 ', 'containing:', {numberOfPacksToProccess,restOfBinString})
                for (let i=0;i<numberOfPacksToProccess;i++) {
                    currentRes = processPacket(restOfBinString);
                    dataArray.push(currentRes.data);
                    restOfBinString = currentRes.restOfBinString
                }
            } else if(packetsWhithin){
                // console.log('OP packet version:', version, 'type 0 ', 'containing:', {packetsWhithin})
                while(packetsWhithin && packetsWhithin !== ''){
                    currentRes = processPacket(packetsWhithin);
                    dataArray.push(currentRes.data);
                    packetsWhithin = currentRes.restOfBinString
                }
            } else {
            //                
            }
            let res = proccessData(dataArray,typeId)
            return {restOfBinString,typeId,version,data:res}
            
        }
}

const adder = (accumulator, currentValue) => accumulator + currentValue;
const multiplier = (accumulator, currentValue) => accumulator * currentValue;

const proccessData = (dataArray, type) =>{
    let res;
    switch(type) {
        case 0:
            // sum
            res = dataArray.reduce(adder);
            break;
        case 1:
            // multiply
            res = dataArray.reduce(multiplier,1);
            break;
        case 2:
            // min
            res = Math.min(...dataArray);
            break;
        case 3:
            // max
            res = Math.max(...dataArray);
            break;
        case 5:
        // greater
            res = dataArray[0] > dataArray[1] ? 1 : 0;
            break;
        case 6:
        // lesser
        res = dataArray[0] < dataArray[1] ? 1 : 0;
        break;
        case 7:
        // equal
        res = dataArray[0] === dataArray[1] ? 1 : 0;

    }
    return res;
}