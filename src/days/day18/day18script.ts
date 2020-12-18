import {exampleArray, inputArray} from './day18Input'
export async function script1(useExample: boolean) {
    const usedInput = useExample ? exampleArray : inputArray;
    let _res 
    _res = run(usedInput,calcParentheslessString);
    return _res;
}
export async function script2(useExample: boolean) {
    const usedInput = useExample ? exampleArray : inputArray;
    let _res 
    _res = run(usedInput,calcParentheslessString2);
    return _res;
}


function run(inputArray,calcParentheslessString) {
    const reducer = (accumulator, currentValue) => accumulator + Number(mathString(currentValue,calcParentheslessString));
    return inputArray.reduce(reducer,0);
}

function mathString(inputString,calcParentheslessString) {
    let string = inputString;
    let should = true;
    do {
        let temp = string;
        string = removeSingleParentheses(string,calcParentheslessString);
        if(temp === string) { should = false;}
    } while (should);
    
    return calcParentheslessString(string);
}



function removeSingleAddition(parenthesslessString) {
    const regex = /[0-9]+\ [+]\ [0-9]+/;
    const match = parenthesslessString.match(regex);
    if (match) {
        const toCalc = match[0];
        const replaced = calcParentheslessString(toCalc);
        return parenthesslessString.replace(match[0], replaced);
    } else {
        return parenthesslessString;
    }
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

function calcParentheslessString2(inputString) {
    let string = inputString;
    let should = true;
    do {
        let temp = string;
        string = removeSingleAddition(string);
        if(temp === string) { should = false;}
        } while (should);
        return evalString(string);
}

function calcParentheslessString(stringToCalc) {
    const regex = /[0-9]+\ [+|*]\ [0-9]+/;
    let match = stringToCalc.match(regex);

    while (match) {
        let replaced = eval(match[0]);
        stringToCalc = replaced + stringToCalc.slice(match[0].length);
        match = stringToCalc.match(regex);
    }

    return stringToCalc;
}

    
function evalString(stringToCalc) {
    let res = eval(stringToCalc);
    return res.toString();
}