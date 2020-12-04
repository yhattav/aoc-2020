import {exampleArray, inputArray} from './day4Input'
const neededValues= [
    'byr', 
    'iyr',
    'eyr',
    'hgt',
    'hcl',
    'ecl',
    'pid',
    //'cid'
];
type passport = {
    byr?: string, 
    iyr?: string,
    eyr?: string,
    hgt?: string,
    hcl?: string,
    ecl?: string,
    pid?: string,
  };
  

export async function script1(useExample: boolean) {
    const usedInput = useExample ? exampleArray : inputArray;
    let _res 
    _res = countValidPassports(usedInput);
    return _res;
}
export async function script2(useExample: boolean) {
    const usedInput = useExample ? exampleArray : inputArray;
    let _res 
    _res = countValidPassportsStrict(usedInput);
    return _res;
}


function isValidPassport(passport) {
    console.log('>>>', passport);
    let isValid = false;
    // if(passport.length < 6) isValid = false;
    let passportObject = {}
    passport.forEach(value=>{
        passportObject[value[0]] = value[1];
    })
    console.log(passportObject);
    const passportLength = passport.length;
    neededValues.forEach(value=>{
        delete passportObject[value];
    });

    if(passportLength - neededValues.length === Object.keys(passportObject).length){
        isValid = true;
    }
    console.log(isValid);
    return isValid;
};

function isValidPassportStrict(passport) {
    console.log('>>>', passport);
    let isValid = false;
    if(passport.length < 6) return false;;
    let passportObject: passport = {}

    passport.forEach(value=>{
        passportObject[value[0]] = value[1];
    })
    console.log(passportObject);
    const passportLength = passport.length;
    //         byr (Birth Year) - four digits; at least 1920 and at most 2002.
    if(passportObject.byr && Number(passportObject.byr) <= 2002 && Number(passportObject.byr) >= 1920) delete passportObject['byr'];
    // iyr (Issue Year) - four digits; at least 2010 and at most 2020.
    if(passportObject.iyr && Number(passportObject.iyr) <= 2020 && Number(passportObject.iyr) >= 2010) delete passportObject['iyr'];
    // eyr (Expiration Year) - four digits; at least 2020 and at most 2030.
    if(passportObject.eyr && Number(passportObject.eyr) <= 2030 && Number(passportObject.eyr) >= 2020) delete passportObject['eyr'];
    // hgt (Height) - a number followed by either cm or in:

    let suffix = passportObject.hgt && passportObject.hgt.slice(-2);
    let heightNumber = passportObject.hgt && Number(passportObject.hgt.slice(0, -2)); 
    if (suffix === 'cm' && heightNumber >= 150 && heightNumber <= 193) {
        // If cm, the number must be at least 150 and at most 193.
        delete passportObject['hgt'];
    }
    if (suffix === 'in' && heightNumber >= 59 && heightNumber <= 76) {
        // If in, the number must be at least 59 and at most 76.
        delete passportObject['hgt'];
    }
 
    // hcl (Hair Color) - a # followed by exactly six characters 0-9 or a-f.
    let regexHair = /^#([a-f]|[0-9]){6}$/
    if (passportObject.hcl && regexHair.test(passportObject.hcl)) delete passportObject['hcl'];
    
    // ecl (Eye Color) - exactly one of: amb blu brn gry grn hzl oth.
    let regexEye = /^amb|blu|brn|gry|grn|hzl|oth$/
    if (passportObject.ecl && regexEye.test(passportObject.ecl)) delete passportObject['ecl'];
    // pid (Passport ID) - a nine-digit number, including leading zeroes.
    let regexId = /^[0-9]{9}$/
    if (passportObject.pid && regexId.test(passportObject.pid)) delete passportObject['pid'];


    if(passportLength - neededValues.length === Object.keys(passportObject).length){
        isValid = true;
    } else {
    }
    return isValid;
};


function countValidPassports(passportsArray) {
    const reducer = (accumulator, currentValue) => accumulator + (isValidPassport(currentValue) ? 1 : 0);
    return passportsArray.reduce(reducer, 0);
}
function countValidPassportsStrict(passportsArray) {
    const reducer = (accumulator, currentValue) => accumulator + (isValidPassportStrict(currentValue) ? 1 : 0);
    return passportsArray.reduce(reducer, 0);
}