import {exampleArray, inputArray} from './day3Input'

export async function script1(useExample: boolean) {
    const usedInput = useExample ? exampleArray : inputArray;
    let _res = countValidPasswords(usedInput) ;
    return _res;
}
export async function script2(useExample: boolean) {
    const usedInput = useExample ? exampleArray : inputArray;
    let _res = countValidPasswords2(usedInput) ;
    return _res;
}


function countValidPasswords(passwordDataArray) {
    let __res = 0;
    passwordDataArray.map(passwordData => {
        if (isValidPassword(passwordData)) {__res++;}
    })
    return __res;
}
function isValidPassword(passwordData) {
    let [range, char, password] = passwordData;
    const rangeValues = range.split('-');
    let min = Number(rangeValues[0]);
    let max = Number(rangeValues[1]);
    var re = new RegExp(char,"g");

    const matches = password.match(re);
    const isValid = matches && (min <= matches.length) && (matches.length <= max);
    console.log(min, max, char,password, isValid)
    return isValid;
}

function countValidPasswords2(passwordDataArray) {
    let __res = 0;
    passwordDataArray.map(passwordData => {
        if (isValidPassword2(passwordData)) {__res++;}
    })
    return __res;
}
function isValidPassword2(passwordData) {
    let [range, char, password] = passwordData;
    let isValid = false;
    const rangeValues = range.split('-');
    let indexA = Number(rangeValues[0]) - 1;
    let indexB = Number(rangeValues[1]) - 1;
    let isA = password[indexA] === char;
    let isB = password[indexB] === char;

    if ((isA && !isB) || (isB && !isA)) {
        isValid = true;
    }

    console.log(indexA, indexB, char , password, isValid)
    return isValid;
}
