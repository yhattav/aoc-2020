import {exampleArray, inputArray} from './day11Input'
import {createMatrix} from '../../../utils/utils'
export async function script1(useExample: boolean) {
    const usedInput = useExample ? exampleArray : inputArray;
    let _res 
    _res = runSim(usedInput,live);
    return _res;
}
export async function script2(useExample: boolean) {
    const usedInput = useExample ? exampleArray : inputArray;
    let _res 
    _res = runSim(usedInput,liveDiagonals);
    return _res;
}


function runSim(inputArray,liveFunction) {
    let should = true;
    let days = 0;
    let currentArray = inputArray;
    do {
        days++;
        const {nextDay,countChanges} = step(currentArray,liveFunction);
        currentArray = nextDay;
        if(countChanges === 0) should = false;
    } while (should && days < 100);

    return countOccupied(currentArray);
}

function step(sittingsArray,liveFunction) {
    let arrayX = sittingsArray[0].length;
    let arrayY= sittingsArray.length;
    let nextDay = createMatrix(arrayY,arrayX,' ');
    let countChanges = 0;
    sittingsArray.map((line,yIndex)=>{
        line.map((col,xIndex)=>{
            nextDay[yIndex][xIndex] = liveFunction(sittingsArray,yIndex,xIndex);
            if(nextDay[yIndex][xIndex] !== sittingsArray[yIndex][xIndex]) countChanges++;
        })
    })

    return {nextDay, countChanges};
}


function live(sittingsArray,yIndex,xIndex) {
    if(sittingsArray[yIndex][xIndex] === '.') return '.'; //keep floors
    let n = isEmpty(sittingsArray[yIndex-1] && sittingsArray[yIndex-1][xIndex]);
    let ne = isEmpty(sittingsArray[yIndex-1] && sittingsArray[yIndex-1][xIndex+1]);
    let e = isEmpty(sittingsArray[yIndex] && sittingsArray[yIndex][xIndex+1]);
    let se = isEmpty(sittingsArray[yIndex+1] && sittingsArray[yIndex+1][xIndex+1]);
    let s = isEmpty(sittingsArray[yIndex+1] && sittingsArray[yIndex+1][xIndex]);
    let sw = isEmpty(sittingsArray[yIndex+1] && sittingsArray[yIndex+1][xIndex-1]);
    let w = isEmpty(sittingsArray[yIndex] && sittingsArray[yIndex][xIndex-1]);
    let nw = isEmpty(sittingsArray[yIndex-1] && sittingsArray[yIndex-1][xIndex-1]]);
    let neighbors = [n,ne,e,se,s,sw,w,nw];

    let count = neighbors.filter(value=>!value).length;
    if (isEmpty(sittingsArray[yIndex][xIndex])) {
        if (count === 0) { return '#'} //if empty and no neighbors, fill
    } else {
        if(count >= 4) {return 'L'} //if occupied and 4 or more around it, kill it
    }
    return sittingsArray[yIndex][xIndex];
}

function liveDiagonals(sittingsArray,yIndex,xIndex) {
    if(sittingsArray[yIndex][xIndex] === '.') return '.'; //keep floors
    let n = isDirEmpty(sittingsArray, yIndex,xIndex, -1, 0);
    let ne = isDirEmpty(sittingsArray, yIndex,xIndex, -1, 1);
    let e = isDirEmpty(sittingsArray, yIndex,xIndex, 0, 1);
    let se = isDirEmpty(sittingsArray, yIndex,xIndex, 1, 1);
    let s = isDirEmpty(sittingsArray, yIndex,xIndex, 1, 0);
    let sw = isDirEmpty(sittingsArray, yIndex,xIndex, 1, -1);
    let w = isDirEmpty(sittingsArray, yIndex,xIndex, 0, -1);
    let nw = isDirEmpty(sittingsArray, yIndex,xIndex, -1, -1);
    let neighbors = [n,ne,e,se,s,sw,w,nw];

    let count = neighbors.filter(value=>!value).length;
    if (isEmpty(sittingsArray[yIndex][xIndex])) {
        if (count === 0) { return '#'} //if empty and no neighbors, fill
    } else {
        if(count >= 5) {return 'L'} //if occupied and 4 or more around it, kill it
    }
    return sittingsArray[yIndex][xIndex];
}

function isEmpty(sittingStr) {
    if(!sittingStr) return true; //undefined
    if(sittingStr === 'L') return true;
    if(sittingStr === '.') return true;
    if(sittingStr === '#') return false;
}

function isDirEmpty(sittingsArray,yIndex,xIndex,yDir,xDir) {
    let should = true;
    let currentYIndex,currentXIndex,testedStr;
    let foundOccupied = false;
    let dist = 1;
    do {
        currentYIndex = yIndex + dist*yDir;
        currentXIndex = xIndex + dist*xDir;
        testedStr = sittingsArray[currentYIndex] &&sittingsArray[currentYIndex][currentXIndex]
        if(!isEmpty(testedStr)) {foundOccupied = true; should = false; break;} 
        else if (testedStr === 'L') {
            should = false; break;
        }
        dist++;
        
    } while (should && dist < 200);
    return !foundOccupied;
}


function countOccupied(sittingsArray) {
    let occupied = 0;
    sittingsArray.map((line,yIndex)=>{
        line.map((col,xIndex)=>{
            if(sittingsArray[yIndex][xIndex] === '#') occupied++;
        })
    })
    return occupied;
}