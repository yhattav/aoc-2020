import {exampleArray, inputArray} from './day17Input'
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

    let [iMin,iMax] = input[1];
    let initialV = Math.abs(iMin)-1;
    let highest = 0
    for (let i = 1; i <=initialV; i++) {
        highest+=i;
    }
    return highest;
}

const findDistJ = (initialVJ,steps) => {
    let res = 0;
    for(let v=initialVJ;v>(Math.max(initialVJ-steps,0));v--) {
        res+=v;
    }
    return res;
}

const createHughArray = (size)=>{
    let arr = [];
    for (let i=-size;i<=size;i++){
        for (let j=0;j<=size;j++) {
            arr.push([i,j]);
        }
    }
    return arr;
}

const run2 = (input) => {
    let [jMin,jMax] = input[0];
    let [iMin,iMax] = input[1];
    let hughArray = createHughArray(Math.max(Math.abs(iMax)+1,jMax));
    const hits = (jMin,jMax,iMin,iMax) => {
        return (point)=>{
            let hits = false;
            let [vI,vJ] = point;
            for(let step=1;step<1000;step++) {
                let finalDistI = step*((2*vI)+(step-1)*(-1))/2
                if(iMin<=finalDistI && finalDistI <= iMax) {
                let finalDistJ = findDistJ(vJ,step);
                if(jMin<=finalDistJ && finalDistJ <= jMax){
                    if(vI ===-10 && vJ=== 31) debugger;
                    hits = true;
                    break;
                }
                }
            }
            return hits;
        }

    }
    let hitsFunc = hits(jMin,jMax,iMin,iMax);
    let filteredArr = hughArray.filter(hitsFunc);

    return filteredArr.length;
}
// const run2 = (input) => {
//     bankJ = {

//     }
//     let [jMin,jMax] = input[0];
//     let [iMin,iMax] = input[1];
//     let posI = findPosI(iMin,iMax)
//     let reducer = (accumulator, currentValue) => accumulator + currentValue;
//     let filtered = posI.filter(el=>el.length>0);
//     let allPos = []
//     let r = filtered.map(stepsPos=>{
//     let res = 0;
//     let i = stepsPos[0];
//     let arr = stepsPos[1];
//     arr.forEach(steps=>{
//         let jPos = findNumberOfJPosForSteps(steps,jMin,jMax);
//         jPos.forEach(pos=>{
//             allPos.push( [i,pos]);
//         })
        
//     })
//     return res;
//     })
//     const hits = (jMin,jMax,iMin,iMax) => {
//         let hits = false;
//         return (point)=>{
//             let [vI,vJ] = point;
//             for(let step=1;step<1000;step++) {
//                 let finalDistI = step*((2*vI)+(step-1)*(-1))/2

//                 if(iMin<=finalDistI && finalDistI <= iMax) {
//                 let finalDistJ = findDistJ(vJ,step);
//                 // for(let vel=vJ)
//                 if(jMin<=finalDistJ && finalDistJ <= jMax){
//                     hits = true;
//                     break;
//                 }
//                 }
//             }
//             return hits;
//         }

//     }
//     let hitsFunc = hits(jMin,jMax,iMin,iMax);
//     let filteredArr = allPos.filter(hitsFunc);
//     console.log({length:allPos.length,allPos })
//     console.log({length:filteredArr.length,filteredArr })
//     return r.reduce(reducer)
// }


// const findPosI = (minI,maxI) => {
//     let possibilities = []
//     let maxIInitialV = Math.abs(minI)-1;

//     for(let i=minI;i<=maxIInitialV;i++) {
//         console.log(i,numOfStepForSpeed(i,minI,maxI));
//         possibilities.push([i,numOfStepForSpeed(i,minI,maxI)])
//     }
//     return possibilities
// }


// const numOfStepForSpeed = (velocityI,minI,maxI) => {
//     let nums = []
//     let steps = 0;
//     let dist = 0;
//     const aI = -1;
//     let v = velocityI
//     while (dist > minI) {
//         steps++;
//         dist += v;
//         v+=aI;
//         if (dist >= minI && dist <= maxI) {
//             nums.push(steps);
//         }
//     }
//     return nums;
// }

// var bankJ = {

// }

// const findNumberOfJPosForSteps = (steps,minJ,maxJ) => {
//     let pos = [];
//     // if(bankJ[steps]){
//     //     return bankJ[steps];
//     // }
//     for (let j=1;j<=maxJ;j++) {
//         let finalDist = steps*((2*j)+(steps-1)*(-1))/2
//         if(minJ<=finalDist && finalDist <=maxJ) {
//             pos.push(j);
//         }
//     }
//     return bankJ[steps] = pos;
// }



