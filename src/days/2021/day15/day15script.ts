import {exampleArray, inputArray} from './day15Input'
import {createMatrix,transposeMatrix} from '../../../utils/utils'
import {findPosibilities,isValidPosition,getValueAt} from '../../../utils/mazeUtils'
export async function script1(useExample: boolean) {
    const usedInput = useExample ? exampleArray : inputArray;
    let _res 
    _res = run2(usedInput,1);
    return _res;
}
export async function script2(useExample: boolean) {
    const usedInput = useExample ? exampleArray : inputArray;
    let _res 
    _res = run2(usedInput,5);
    return _res;
}

const run = (input,multi) => {
    let valuesMap:[][] = createBigMap(input,multi);
    let size:number = valuesMap.length; //
    let startPos:[number,number] = [0,0];
    let accValue = 0;
    bank = {
    }
    shortest = Infinity
    let endPos:[number,number] = [size-1,size-1];
    let stringyEndPos =  strangify(endPos);
    let aaa = getOrStep(valuesMap,startPos,stringyEndPos,[])
    console.log(bank)
    return aaa - getValueAt(valuesMap,startPos);
}
var shortest;
var bank;




const createBigMap = (input:any,multi=2) :any =>{
    let size:number = input.length; //
    let valuesMap = createMatrix(size*multi,size*multi,'_');
    let additions = [
        [0,1,2,3,4],
        [1,2,3,4,5],
        [2,3,4,5,6],
        [3,4,5,6,7],
        [4,5,6,7,8],
    ]
    for (let i = 0; i <valuesMap.length; i++) {
        for (let j = 0; j < valuesMap[0].length; j++) {
            let placementI = Math.floor(i / size);
            let placementJ = Math.floor(j / size);

            let addition = additions[placementI][placementJ];
            let valI = i % size;
            let valJ = j % size;
            let res = getValueAt(input,[valI,valJ]) + addition;
            if(res > 9){
                res = (res) % 9;
            }
            valuesMap[i][j] = res;
        }
    }
    return(valuesMap)
}

const step2=(map,currentPosition,stringyEndPos,visited)=>{
    // console.log(bank,currentPosition);
    let stringy =  strangify(currentPosition);
    let currentTileValue = getValueAt(map,currentPosition);
    const thisVisited = visited.slice();
    thisVisited.push(stringy);
    // thisVisited.accValue = ( thisVisited.accValue || 0 )+ currentTileValue;
    if(stringy === stringyEndPos) {
        //if at end - return the value of stepping on the end tile.
        console.log('got to the end',thisVisited);
        return currentTileValue;
    } 
    // console.log(currentPosition)
    //if not at end, find the min value for this time to get to the end
    let viablePosibilities = findPosibilities(map,currentPosition,(value)=>true).filter(el=>isValidPosition(map,el));
    let notVisited = viablePosibilities.filter(el=>!thisVisited.includes(strangify(el)));
    if (viablePosibilities.length === 1 && notVisited.length === 1) {
        if(strangify(notVisited[0]) === stringyEndPos){
            //you can go there.
        } else {
            return Infinity;
        }
    }
    // console.log(notVisited.length)
    // let posibilities = notVisited.filter(el=>!visited[strangify(el)]);
    // console.log(posibilities.length) 
    // console.log(posibilities.length ===notVisited.length) 
    console.log('possibleValues for:',stringy,notVisited)
    // if(stringy === '2,0') debugger
    
    let posValues = notVisited.map((posibility)=>{
        console.log('at ',stringy, ' checking',posibility)
        const res = getOrStep(map,posibility,stringyEndPos,thisVisited);
        return res
    })
    // if(stringy === '2,0') debugger
    if(posValues.length !== notVisited.length) debugger;
    // console.log('finished with',stringy,posValues,currentTileValue,Math.min(...posValues))
    let nodeValue = currentTileValue + Math.min(...posValues);
    // console.log({nodeValue},currentTileValue,Math.min(...posValues),bank)
    if(bank[stringy]<Infinity) bank[stringy] = nodeValue
    return nodeValue
    
}

const getOrStep = (map,posibility,stringyEndPos,visited) =>{
    let stringy = strangify(posibility);
    if(bank[stringy]) {
        debugger;
            return bank[stringy];
    } else {
        return step2(map,posibility,stringyEndPos,visited);
    }
}


const strangify = (pos)=>{
    return pos[0] + ',' + pos[1];
}

// const step=(map,currentPosition,accumulatedValue,stringyEndPos)=>{
//     // console.log(bank,currentPosition);
//     let stringy =  strangify(currentPosition);
//     // if(stringy === '0,1' || stringy === '1,0') debugger;
//     visited[stringy] = true;
//     let currentValue = accumulatedValue + getValueAt(map,currentPosition);
//     if (currentValue > shortest) {
//         //die
//         return;
//         } else {
//             if(stringy === stringyEndPos) {
//             shortest = currentValue;
//             }
//         }
//     if(bank[stringy] <= currentValue) {
//         return;
//     } else {
//         debugger;
//         let viablePosibilities = findPosibilities(map,currentPosition,(value)=>true).filter(el=>isValidPosition(map,el));
//         console.log(viablePosibilities.length)
//         let posibilities = viablePosibilities.filter(el=>!visited[strangify(el)]);
//         console.log(posibilities.length)
//         if(posibilities.length<viablePosibilities.length) debugger;
//         bank[stringy] = currentValue;
//         posibilities.forEach(posibility=>{
//             step(map,posibility,currentValue,stringyEndPos)
//         })
//     }
// }



// getting a point to find its minimum value to the end (including itself, the value of stepping on it)
// if this point is the end we can return the value of stepping on the end tile (end time value)
//add this position to the snake of visited location in this snake (it can split so we need a copy of how we got there)
//find the possible steps from this position.
//remove possible steps if they were already visited in this snake


const run2 = (input,multi) => {
    let smallest = multi*input.length*7;
    const step = (map,currentPosition,stringyEndPos,accumulatedValue) => {
        // getting a point to find its minimum value to the end (including itself, the value of stepping on it)
        // if this point is the end we can return the value of stepping on the end tile (end time value)
        // add this position to the snake of visited location in this snake (it can split so we need a copy of how we got there)
        // find the possible steps from this position.
        //accumulate the value of the snake.
        //if we are at a position with higher value than was already found. kill this snake.
        const currentTileValue = getValueAt(map,currentPosition);
        let steppingOnThisTileCost = accumulatedValue + currentTileValue;
        let stringy = strangify(currentPosition)
        const cachedVal = bank.get(stringy);

        // if(smallest <= steppingOnThisTileCost) {
            
        //     return;
        // }
        // if(bank[stringy] && bank[stringy] <= steppingOnThisTileCost)
        if(cachedVal && cachedVal <= steppingOnThisTileCost || smallest <= steppingOnThisTileCost)
        { // killllll
            // console.log(steppingOnThisTileCost);
            return;
        } else {
            bank.set(stringy,steppingOnThisTileCost);
            if (stringy === stringyEndPos) {
                smallest = steppingOnThisTileCost
                return;
            }
            let possibilities =  findPosibilities(map,currentPosition,(value)=>true).filter(el=>isValidPosition(map,el));
            possibilities.forEach(possibility=>{
                step(map,possibility,stringyEndPos,steppingOnThisTileCost)
            })
        }
    }
    let valuesMap:[][] = createBigMap(input,multi);
    let size:number = valuesMap.length; //
    let startPos:[number,number] = [0,0];
    const bank = new Map();
    shortest = Infinity
    let endPos:[number,number] = [size-1,size-1];
    let stringyEndPos =  strangify(endPos);
    step(valuesMap,startPos,stringyEndPos,0)
    console.log(bank)
    return smallest - getValueAt(valuesMap,startPos);

}