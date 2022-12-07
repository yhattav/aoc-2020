import {exampleArray, inputArray} from './day2Input'
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

const parseLine = (line:string, pointer, memo):[any] => {
    //split line by spaces
    const arr = line.split(' ');
    //parse each part
    if(arr[0] === '$'){
            switch(arr[1]) {
                case 'cd':
                    pointer = createOrGoTo(pointer, arr[2], memo);
                    //do cd command
                    break;
                case 'ls':
                    //do ls command
                    break;
            
            }
    } else if(/^\d+$/.test(arr[0])){
        if(!pointer.fsValuesSuperStars) {
            pointer.fsValuesSuperStars = {};
        }
        pointer.fsValuesSuperStars[arr[1]] = Number(arr[0]);
    } else if (arr[0] === 'dir') {
        if(!pointer[arr[1]]) {
            pointer[arr[1]] = {fsValuesParent:pointer};
        }
    }

    return pointer;
}

const createOrGoTo = (pointer:any, dirName:string, root:object) => {
    if(dirName === '/') {
        pointer = root;
    } else if(dirName === '..') {
        pointer = pointer.fsValuesParent;
    } else if(!pointer[dirName]) {
        pointer[dirName] = {fsValuesParent:pointer};
        pointer = pointer[dirName];
    } else {
        pointer = pointer[dirName];
    }
    return pointer;
}

const calcDirs = (obj, dirs):number => {
    /* sum the values in obj.fsValuesSuperStars */
    let current = obj.fsValuesSuperStars ? Number(Object.values(obj.fsValuesSuperStars).reduce((acc:number, val:number)=>acc + val, 0))    : 0; 
    Object.keys(obj).forEach(key=>{
        if(key === 'fsValuesParent' || key === 'fsValuesSuperStars') {
            return;
        } else {
            current += calcDirs(obj[key], dirs)
        }
    })
    dirs.push(current)
    return current;
}
export const run = (input) => {
    const memo = {};

    let pointer = {
        current: memo,
    };

    input.slice().forEach(line=>{
        pointer.current = parseLine(line, pointer.current, memo)
    })
    let dirs = [];
    calcDirs(memo, dirs);
    let acc = 0;
    dirs.forEach(dir=>{
        if(dir <= 100000) {
            acc += dir;
        }
    })
    return acc;

}
export const run2 = (input) => {
    const memo = {};
    let pointer = {
        current: memo,
    };
    input.slice().forEach(line=>{
        pointer.current = parseLine(line, pointer.current, memo)
    })
    let dirs = [];
    calcDirs(memo, dirs);
    let acc = 0;
    let currentSpaceUsed:number = Number(dirs.slice(-1))
    let minNeededSpaceToClear = 30000000 - (70000000 - currentSpaceUsed)
    dirs.forEach(dir=>{
        if(acc === 0 && dir >= minNeededSpaceToClear) {
            acc = dir;
        }
    })
    return acc;
}
