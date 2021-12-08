import {exampleArray, inputArray,exampleArray2, inputArray2} from './day8Input'
export async function script1(useExample: boolean) {
    const usedInput = useExample ? exampleArray : inputArray;
    let _res 
    _res = run(usedInput);
    return _res;
}
export async function script2(useExample: boolean) {
    const usedInput = useExample ? exampleArray2 : inputArray2;
    let _res 
    _res = run2(usedInput);
    return _res;
}

const run = (input) => {
    let acc = 0;
    input.map(line =>{
        return line[1].map(output=> {
            switch (output.length) {
                case 2:
                case 3:
                case 4:
                case 7:
                    acc++;
                    break;
                default: 
                break;
            }
        })
    })
    return acc;
}
const run2 = (input) => {
    let numbersOutputs = input.map(line =>{
        const index = line.findIndex(number => checker(number,['|']));
        const outputSubArray = line.slice(index+1)
        const numbers = research(line);
        return getInt(numbers,outputSubArray);
    })
    let reducer = (accumulator, currentValue) => accumulator + currentValue;
    return numbersOutputs.reduce(reducer)
}

const research = (line) => {
    let locations = {
        A: '', 
        B: '',
        C: '',
        D: '',
        E: '',
        F: '',
        G: '',
    }
    let numbers = {'0':[],'1':[],'2':[],'3':[],'4':[],'5':[],'6':[],'7':[],'8':[],'9':[]}
    line.map(output=> {
        switch (output.length) {
            case 2:
                numbers['1'].push(output);
                break;
            case 3:
                numbers['7'].push(output);
                break;
            case 4:
                numbers['4'].push(output);
                break;
            case 7:
                numbers['8'].push(output);
                break;
            default: 
            break;
        }
    })
    //finding top most;
 locations.A = reduceSimilars(numbers['7'][0],numbers['1'][0])[0];

 //find the 6
 line.map(output=> {
    switch (output.length) {
        case 6:
            if(checker(output,numbers['1'][0])){
                // can be either 0 or 9;
            } else {
                numbers['6'].push(output);
            }
            break;
        default: 
        break;
    }
})

//find the C and F
locations.C = reduceSimilars(numbers['1'][0],numbers['6'][0])[0];
locations.F = reduceSimilars(numbers['1'][0],[locations.C])[0];

//find 2/3/5

line.map(output=> {
    switch (output.length) {
        case 5:
            if(checker(output,[locations.C]) && checker(output,[locations.F])){
                // is 3
                numbers['3'].push(output);

            } else if(checker(output,[locations.C])){
                //is 2  
                numbers['2'].push(output);

            } else {
                //is 5
                numbers['5'].push(output);

            }
            break;
        default: 
        break;
    }
})

//find E

let reduced25 = reduceSimilars(numbers['2'][0],numbers['5'][0]);
locations.E = reduceSimilars(reduced25,numbers['1'][0])[0];

// find 0 and 9
line.map(output=> {
    switch (output.length) {
        case 6:
            if(checker(output,[locations.C]) && checker(output,[locations.F])){
                if(checker(output,[locations.E])){
                    //is 0
                    numbers['0'].push(output);
                } else {
                    //is 9
                    numbers['9'].push(output);
                }

            } 
            break;
        default: 
        break;
    }
})
return numbers
}

let checker = (arr, target) => target.every(v => arr.includes(v));

let reduceSimilars = (arr, target) => arr.filter(v => {return !target.includes(v)})

const getInt = (numbers,array) => {
    let digits = '';
    array.forEach(number=>{
        for(let i=0;i<=9;i++) {
            let str = '' + i;
            if(checker(numbers[str][0],number) && checker(number,numbers[str][0])) {
                digits = digits + str;
            }
        }
    })
    return parseInt(digits, 10);
}