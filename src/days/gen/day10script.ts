import {exampleArray, inputArray} from './day10Input'
const regexs = {
    '(': /([(])[^()]+[)]/,
    '[': /([[]])[^()]+[)]/,
    '<': /([<])[^()]+[)]/,
    '{': /([{}])[^()]+[)]/,
}

let pairs = [
    ['{','}'],
    ['(',')'],
    ['[',']'],
    ['<','>'],
]

let regs = [
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
    let newArr = input.slice().map(line=>{
        let matched = false;
        debugger;
        do {
            regs.forEach(reg => {
                const match = line.match(reg);
                debugger;
            })
        } while(matched);

    })
}
const run2 = (input) => {

}

function removeSingleParentheses(inputString, calcParentheslessString) {
    const regex = /([(])[^()]+[)]/
    const match = inputString.match(regex);
    if (match) {
        // console.warn(match);
        const toCalc = match[0].slice(1,-1);
        const replaced = calcParentheslessString(toCalc);
        return inputString.replace(match[0], replaced);
    } else {
        return inputString;
    }
}