import {exampleArray, inputArray, valueMap, valueMap2} from './day10Input'
let reducer = (accumulator, currentValue) => accumulator + currentValue;

const regs = [
    /\[]/,
    /\(\)/,
    /{}/,
    /<>/,
]

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
    let newArr = input.slice().map((line)=>{
        let str = line;
        let matched:boolean;
        do {
            matched = regs.some(reg => {
                const match = str.match(reg);
                if(match) {
                    let aaa =  str.split('');
                    aaa.splice(match.index,2);
                    str = aaa.join('');
                }
                return !!match;
            })
        } while(matched);
        let arr = str.split('')
        let indexx = arr.findIndex(val=>{
            return ['>','}',')',']'].some(char=>char===val)
        })
        if(indexx > 0) {
            return valueMap[arr[indexx]];
        } else {
            return 0;
        }
    })
    return newArr.reduce(reducer)
}

const run2 = (input) => {
    let newArr = input.slice().map(removeAllValidBlocks)

    let onlyIncomplete = newArr.filter(line=>{
        return !line.split('').some(val=>['>','}',')',']'].some(char=>char===val));
    })
    let scores = onlyIncomplete.map(line=>{
        let reversedArr = line.split('').reverse();
        let acc = 0;
        reversedArr.forEach(value=>{
            acc*=5;
            acc+=valueMap2[value];
        })
        return acc
    });

    let sorted = scores.sort(function(a, b) {
        return a - b;
    });

    return sorted[Math.floor(sorted.length/2)]
}


const removeAllValidBlocks = (line)=>{
    let str = line;
    let matched:boolean;
    do {
        matched = regs.some(reg => {
            const match = str.match(reg);
            if(match) {
                let aaa =  str.split('');
                aaa.splice(match.index,2);
                str = aaa.join('');
            }
            return !!match;
        })
    } while(matched);
    return str;
}