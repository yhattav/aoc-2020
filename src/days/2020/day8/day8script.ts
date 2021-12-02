import {exampleArray, inputArray} from './day8Input'
export async function script1(useExample: boolean) {
    const usedInput = useExample ? exampleArray : inputArray;
    let _res 
    _res = runProg(usedInput);
    return _res;
}
export async function script2(useExample: boolean) {
    const usedInput = useExample ? exampleArray : inputArray;
    let _res 
    _res = fixAndRun(usedInput);
    return _res;
}

function runProg(inputArray){
    const {accumulator, ended} = run(inputArray);
    return accumulator;
}


function fixAndRun(inputArray) {
    let switching = 1;
    let acc;
    do {
        const {accumulator, ended} = run(inputArray, switching);
        if (ended) {acc = accumulator; switching = Infinity;}
        switching++;
    } while (switching <= inputArray.length)
    return acc;
}


// function wtf(){

//     let array = [0,1,2,3];

//     let array2 = array.slice();

//     array2[0] = 1;

//     console.log(array,array2)
// }



function run(inputArray, switchNum = -1) {
    let pointer = 0;
    let pointerCache = [];
    let accumulator = 0;
    let input = inputArray.slice();
    let ended = false;
    let shouldKeepGoing = true;
    let currentInstruction,code,inc;
    let switchCounter = 0;
    while (shouldKeepGoing) {
        currentInstruction = input[pointer];
        code = currentInstruction[0];
        inc = Number(currentInstruction[1]);
        let newCode = undefined;
        if(code === 'nop' || code === 'jmp') {
            switchCounter++;
            if(switchCounter === switchNum) {
                //replace this one
                newCode = (code === 'nop' ? 'jmp' : 'nop');
                const newInstruction = [newCode, inc];
                input[pointer] = newInstruction;
            }
        }
        switch (newCode || code) {
            case "nop":
            pointer++;
            break;
            case "acc":
            accumulator += inc;
            pointer++;

            break;
            case "jmp":
            pointer += inc;
            break;
        }

        if(pointerCache[pointer]){
            shouldKeepGoing = false;
        } else if (pointer >= input.length){
            shouldKeepGoing = false;
            ended = true;
        } else {
            pointerCache[pointer] = '#';
        }
    }
    return {accumulator: accumulator, ended};
}
