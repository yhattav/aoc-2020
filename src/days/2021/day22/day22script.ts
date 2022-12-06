import {exampleArray, inputArray} from './day22Input'
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
    let universe = new Map();
    input.forEach((instruction) => {
        let ranges = instruction[1].map(el=>el.map(Number)).map(el=>[Math.max(el[0],-50),Math.min(el[1],50)])
        if(instruction[0][0][0] === 'on') {
            processOnInstruction(universe, ranges);
        } else {
            processOffInstruction(universe, ranges);
            //
        }
    })
    console.log(universe.size);
    return universe.size
}
const run2 = (input) => {
    let visited = [];
    //fist instruction is always on
    input.forEach((instruction) => {
        let ranges = instruction[1].map(el=>el.map(Number));
        let size = findSize(ranges);
        visited.forEach(visitedRange=>{
        let intersectionWithPrevious = findIntersecion(visitedRange[0],ranges)
        if(intersectionWithPrevious) {
            if(visitedRange[2] === 1) {
                    let intersectionSize = findSize(intersectionWithPrevious);
                        visited.push([intersectionWithPrevious,intersectionSize, 0]) //add off intersection
                
            } else if (visitedRange[2] === 0) {
                    let intersectionSize = findSize(intersectionWithPrevious);
                        visited.push([intersectionWithPrevious,intersectionSize, 1]) //add off intersection
                
            }
        }
        })
    if(instruction[0][0][0] === 'on') {

        visited.push([ranges,size,instruction[0][0][0] === 'on' ? 1 : 0])
    }
    });
    let res = 0;
    visited.map(visited=>{
        res += (visited[2] === 0 ? -1 : 1) * visited[1];

    })
    return res
}




const processOnInstruction = (universe, ranges) => {
    let [rangeX,rangeY,rangeZ] = ranges
    for (let x=rangeX[0];x<=rangeX[1];x++) {
    for (let y=rangeY[0];y<=rangeY[1];y++) {
    for (let z=rangeZ[0];z<=rangeZ[1];z++) {
        universe.set([x,y,z].join(','),1);
    }}}
}
const processOffInstruction = (universe, ranges) => {
    let [rangeX,rangeY,rangeZ] = ranges
    for (let x=rangeX[0];x<=rangeX[1];x++) {
    for (let y=rangeY[0];y<=rangeY[1];y++) {
    for (let z=rangeZ[0];z<=rangeZ[1];z++) {
        universe.delete([x,y,z].join(','));
    }}}
}



const findSize = ([x,y,z])=> {
    const lengthX = x[1]-x[0] +1;
    const lengthY = y[1]-y[0] +1;
    const lengthZ = z[1]-z[0] +1;
    return lengthX*lengthY*lengthZ
}

const findIntersectionSize = (range1,range2) => {
    let intersection = findIntersecion(range1,range2);
    if (intersection) {
        return findSize(intersection)
    } else {
        return 0;
    }

}

const findIntersecion = (range1,range2):[any[],any[],any[]] => {
    let intersectionX = rangeIntersection(range1[0],range2[0])
    let intersectionY = rangeIntersection(range1[1],range2[1])
    let intersectionZ = rangeIntersection(range1[2],range2[2])
    if(intersectionX&&intersectionY&&intersectionZ) {
        return [intersectionX,intersectionY,intersectionZ]
    } else {
        return null;
    }
}

const rangeIntersection = (x1,x2) => {

    //get the range with the smaller starting point (min) and greater start (max)
    let rangeMin = (x1[0] < x2[0]  ? x1 : x2)
    let rangeMax = (rangeMin === x1 ? x2 : x1)
    
    //min ends before max starts -> no intersection
    if (rangeMin[1] < rangeMax[0])
        return null //the ranges don't intersect
    
    return [rangeMax[0] , (rangeMin[1] < rangeMax[1] ? rangeMin[1] : rangeMax[1])]
}
