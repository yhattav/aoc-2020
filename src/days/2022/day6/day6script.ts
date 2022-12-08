import {example, input} from './day6input'
export async function script1(useExample: boolean) {
    const usedInput = useExample ? example : input;
    let _res 
    _res = run(usedInput,4);
    return _res;
}
export async function script2(useExample: boolean) {
    const usedInput = useExample ? example : input;
    let _res 
    _res = run(usedInput,14);
    return _res;
}
const getDiffCharRegex = (numOfDiffChars:number):string => {
    let reg = `(.)`;
if (numOfDiffChars > 0) {
    for (let i = 1; i < numOfDiffChars; i++) {
        reg+=getDiffRegAt(i)
    }
}
return reg
}

const getDiffRegAt = (index:number):string => {
    let add = `(?!\\1`
    for (let i = 1; i < index; i++) {
        add += `|\\${i+1}`;
    }
    add += `)(.)`
    return add;
}


export const run = (input, numOfChars) => {
    var reg = new RegExp(getDiffCharRegex(numOfChars));
    let match = reg.exec(input);
    return match.index+numOfChars;
}
