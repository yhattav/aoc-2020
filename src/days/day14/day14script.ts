import {exampleArray, exampleArray2, inputArray} from './day14Input'
export async function script1(useExample: boolean) {
    const usedInput = useExample ? exampleArray : inputArray;
    let _res 
    _res = run(usedInput);
    return _res;
}
export async function script2(useExample: boolean) {
    const usedInput = useExample ? exampleArray2 : inputArray;
    let _res 
    _res = run2(usedInput);
    return _res;
}


function parseChunk(inputArray) {
    let array = inputArray.slice(0);
    let mask = array.shift();
    mask = mask.split(' = ');
    mask = mask.pop();
    mask = mask.split('').map(Number);
    let maskObject = {};

    mask.map((value,index)=>{
        if (value >= 0){maskObject[index] = value};
    })
    let instructionsArray = [];
    const regex = /[0-9]+/gm;
    const empty = '000000000000000000000000000000000000'
    array.map(value=>{
        let res = {};
        let match = value.match(regex);
        let mem = Number(match[0]);
        let valDec = Number(match[1]);
        let val = Number(valDec).toString(2);
        let valLength = val.length;
        val = empty.slice(0,empty.length-valLength) + val;
        val = applyMask(val,maskObject);
        instructionsArray.push({mem,val})
    });

    return instructionsArray
}


function applyMask(string,maskObject) {
    let array = string.split('');
    Object.keys(maskObject).forEach(value=>{
        array[value] = maskObject[value];
    })
    return array.join('');
}


function parse(inputArray){
    let array = inputArray.slice(0);
    let cache = [[]];
    let cacheIndex = 0;
    let temp = array.shift();
    do {
        do {
            cache[cacheIndex].push(temp);
            temp = array.shift()
        } while (temp && !temp.includes('mask'));
        cacheIndex++;
        if (array.length>0) cache[cacheIndex] = [];
    } while(array.length>0);

    return cache;
}

function run(inputArray) {
    let chunksArray = parse(inputArray);
    let mem={};
    chunksArray.forEach(value=>{
        let instArray = parseChunk(value);
        instArray.forEach(inst=>{
            mem[inst.mem] = inst.val
        })
    })
    let sum = 0;
    Object.values(mem).forEach(value=>{
        sum+=  parseInt(value, 2);
    })

    return sum;
}
function run2(inputArray) {
    let chunksArray = parse(inputArray);
    let mem={};
    chunksArray.forEach(value=>{
        let instArray = parseChunk2(value);
        instArray.forEach(inst=>{
            mem[inst.mem] = inst.val
        })
    })
    let sum = 0;
    Object.values(mem).forEach(value=>{
        sum += value;
    })

    return sum;
}



function parseChunk2(inputArray) {
    let array = inputArray.slice(0);
    let mask = array.shift();
    mask = mask.split(' = ');
    mask = mask.pop();
    mask = mask.split('');
    let maskObject = {};
    mask.map((value,index)=>{
        if (value === '1' || value ==='X'){maskObject[index] = value};
    })
    let instructionsArray = [];
    const regex = /[0-9]+/gm;
    const empty = '000000000000000000000000000000000000'
    array.map(value=>{
        let match = value.match(regex);
        let memDec = match[0];
        let mem = Number(memDec).toString(2);
        let val = Number(match[1]);
        let memLength = mem.length;
        mem = empty.slice(0,empty.length-memLength) + mem;
        let memPosArray = applyMask2(mem,maskObject);
        memPosArray.forEach(value=>{
            instructionsArray.push({mem:value,val})
        })
    });
    return instructionsArray
}


function applyMask2(string,maskObject) {
    let array = string.split('');
    let posArray = [string.split('')];
    Object.keys(maskObject).forEach(value=>{
        if(maskObject[value] === 'X') {
            let array1 = posArray.slice(0)
            let array2 = posArray.slice(0)
            array1 = array1.map(_val=>{
                let res = _val.slice(0);
                res[value] = '1';
                return res;
            })
            array2 = array2.map(_val=>{
                let res = _val.slice(0);
                res[value] = '0';
                return res;
            })
            posArray = array1.concat(array2);
        } else {
            posArray = posArray.map(_val=>{
                let res = _val.slice(0);
                res[value] = '1';
                return res;
            })
        }
    })

    posArray = posArray.map(value =>value.join('')).map(value =>parseInt(value, 2))
    return posArray;
}

