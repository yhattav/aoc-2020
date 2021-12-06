import {exampleArray, inputArray} from './day6Input'
export async function script1(useExample: boolean) {
    const usedInput = useExample ? exampleArray : inputArray;
    let _res 
    _res = run(usedInput,80);
    return _res;
}
export async function script2(useExample: boolean) {
    const usedInput = useExample ? exampleArray : inputArray;
    let _res 
    _res = run(usedInput,256);
    return _res;
}

const run = (input, times = 256) => {
    let sea = represent(input)
    let counter = 1;
    while (counter <= times) {
        counter++;
        sea = step(sea);
    }
    return countTotal(sea);
}

const represent = (input) => {
    let sea = emptySea();
    input.forEach((value) => {
        sea[value] += 1;
    })
    return sea;
}

const step = (sea) => {
    let newSea = emptySea();
    newSea['8'] = sea['0']
    newSea['7'] = sea['8'];
    newSea['6'] = sea['0'] + sea['7'];
    for (let i = 5; i >=0;i--) {
    newSea[`${i}`] = sea[`${i+1}`]
    }
    return newSea
}

const countTotal = (sea) => {
    let acc = 0;
    Object.values(sea).forEach((value:number)=>{
        acc += value;
    })
    return acc;
}

const emptySea = ()=> {
    return {
        '0': 0,'1': 0,'2':0,'3':0,'4':0,'5':0,'6':0,'7':0,'8':0,
    };
}