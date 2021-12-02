import {exampleArray,exampleArray2, inputArray,exampleRules,exampleRules2, inputRules} from './day16Input'
import {countUnique} from '../../../utils/utils'
export async function script1(useExample: boolean) {
    const usedInput = (useExample ? exampleArray : inputArray);
    const rules = parseRules(useExample ? exampleRules : inputRules);
    let _res 
    _res = goOverTickets(usedInput,rules);
    return _res;
}
export async function script2(useExample: boolean) {
    const usedInput = useExample ? exampleArray2 : inputArray;
    const rules = parseRules(useExample ? exampleRules2 : inputRules);
    let _res 
    _res = useExample ? 'There is no example answer for part 2' : goOverTickets2(usedInput,rules);
    return _res;
}

function parseRules(rulesArray) {
    let rulesObject = {};
    const regex = /^.*:/gm;
    const regex1 = /\d*-\d*/gm;
    const regex2 = /\d*-\d*$/gm;
    const regex3 = /\d+/gm;

    rulesArray.forEach((rule)=>{
        let name = rule.match(regex)[0];
        name = name.slice(0, -1)
        let range1 = rule.match(regex1)[0];
        let range2 = rule.match(regex2)[0];
        range1 = range1.match(regex3).map(Number);
        range2 = range2.match(regex3).map(Number);
        rulesObject[name] = (number) => {
            let is = 
            (range1[0] <= number && number <= range1[1]) ||
            (range2[0] <= number && number <= range2[1]);
            return is;
        };
    })
    return rulesObject;
}

function findBadValues(ticket,rules) {
    let badValues = [];
    ticket.forEach(value=>{
        if(Object.keys(rules).some((key)=>{
            // console.log('for value:', value, ' and key:',key, rules[key](value) )
            return (rules[key](value))
        })) {
        } else {
            badValues.push(value);
        }
    })
    return badValues;
}

function goOverTickets(inputArray,rules) {
    let bad = [];
    inputArray.forEach(ticket =>{
        let badValues = findBadValues(ticket,rules);
        bad = bad.concat(badValues);
    });
    const reducer = (accumulator, currentValue) => accumulator + currentValue);
    return bad.reduce(reducer, 0);
}

function goOverTickets2(inputArray,rules) {
    let validTickets = [];
    let names = []
    inputArray.forEach(ticket =>{
        let badValues = findBadValues(ticket,rules);
        if(badValues.length === 0) validTickets.push(ticket);
    });
    let posSize = validTickets[0].length;
    for (let i=0; i<posSize; i++){
        names.push(findMatchingName(validTickets,i,rules));
    }
    let foundAll = false;
    let tempMatched;
    let matched = [];
    do {
        tempMatched = [];
        names.forEach((value,index)=>{
            if (value.length === 1) {
                //found match
                matched[index] = value[0];
                tempMatched[index] = value[0];
            }
        });
        
        tempMatched.forEach(match=>{
            names = names.map(name=>{
                let _val = [];
                name.forEach((_name,index)=>{
                    if (_name !== match){
                        _val.push(_name)
                    }
                })
                return _val;
            })
        })
        if(posSize === countUnique(matched)) {foundAll = true}
    } while (!foundAll)
    let mult = 1;
    matched.forEach((value,index)=>{
        if(value.includes('departure')){
            mult*=validTickets[0][index];
        }
    })
    return mult;
}

function findMatchingName(validTickets,pos,rules) {
    let matchingNames = [];
    Object.keys(rules).forEach((key)=>{
        let isValid = validTickets.every(ticket => {
        let testedValue = ticket[pos];
        return (rules[key](testedValue))
        });
        if(isValid) matchingNames.push(key);
    })
    return matchingNames;
}