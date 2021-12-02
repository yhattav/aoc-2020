import {exampleArray, inputArray} from './day24Input'
import Victor from 'victor';
export async function script1(useExample: boolean) {
    const usedInput = useExample ? exampleArray : inputArray;
    let _res 
    _res = run(usedInput,0);
    return _res;
}
export async function script2(useExample: boolean) {
    const usedInput = useExample ? exampleArray : inputArray;
    let _res 
    _res = run(usedInput,100);
    return _res;
}

function countFlipped(tilesMap) {
    let flipped = 0;
    tilesMap.forEach((value,key)=>{
        
        flipped+= value.value ? 1 : 0

    })
    return flipped;
}

function getVector(string) { 
    var e = new Victor(100000,0);
    switch(string) { 
        case 'e':
            return e;
        case 'se':
            return e.rotateDeg(60);
        case 'sw':
            return e.rotateDeg(120);
        case 'w':
            return e.rotateDeg(180);
        case 'nw':
            return e.rotateDeg(240);
        case 'ne':
            return e.rotateDeg(300);
    }
}

function parseInstructions(stringLine: string) { 
    let regex = /^e|se|sw|w|nw|ne/
    let array = [];
    do {
        let match = stringLine.match(regex)
        array.push(match[0]);
        stringLine = stringLine.replace(match[0],'');
    } while (stringLine.length > 0);
    return array;
}

function flipTile(instArray,tilesMap) {
    let vec = new Victor(0,0);
    instArray.forEach(inst=>{
        vec.add(getVector(inst));
    })
    let tileCode = getTileCode(vec);
    if(tilesMap.has(tileCode)) {
        let current = tilesMap.get(tileCode);
        current.value = !current.value;
    } else {
        let tile = {value: true, vector: vec, neighbors: getAllNeighborsCodes(vec), tileCode}
        tilesMap.set(tileCode,tile);
    }
}

function getTileCode(vec) {
    let array = vec.toArray();
    let arrayX = Math.round(array[0]);
    let arrayY = Math.round(array[1]);
    return arrayX+','+arrayY
}


function getAllNeighborsCodes(vec) {
    let vecE = new Victor(0,0)
    let vecSE = new Victor(0,0)
    let vecSW = new Victor(0,0)
    let vecW = new Victor(0,0)
    let vecNW = new Victor(0,0)
    let vecNE = new Victor(0,0)
    vecE.add(vec).add(getVector('e'))
    vecSE.add(vec).add(getVector('se'))
    vecSW.add(vec).add(getVector('sw'))
    vecW.add(vec).add(getVector('w'))
    vecNW.add(vec).add(getVector('nw'))
    vecNE.add(vec).add(getVector('ne'))
        return [
            {vec: vecE, tileCode: getTileCode(vecE)},
            {vec: vecSE, tileCode: getTileCode(vecSE)},
            {vec: vecSW, tileCode: getTileCode(vecSW)},
            {vec: vecW, tileCode: getTileCode(vecW)},
            {vec: vecNW, tileCode: getTileCode(vecNW)},
            {vec: vecNE, tileCode: getTileCode(vecNE)},
        ];
}

function run(inputArray,turns) {
    let instructionsArray = inputArray.map(input =>parseInstructions(input));
    let days = [];
    days[0] = new Map();
    instructionsArray.forEach(ele=>{
        flipTile(ele,days[0]);
    })
    let turnCount = 0;
    while (turnCount < turns) {
        days[turnCount+1] = new Map();
        days[turnCount].forEach((value,_)=>{
            countNeighborsAndSet(value,days[turnCount],days[turnCount+1],turnCount+1)
        })
        days[turnCount+1].forEach((value,_)=>{
            if (value.dayCreated === turnCount+1) {
                if (value.blackNeighbors === 2) { //this newfound white tile is a neighbor to two previously black tiles
                    days[turnCount+1].set(value.tileCode,{...value, value:true}) //set to black;
                }
            }
        })
        turnCount++;
    } ;
    return countFlipped(days.pop());
}


function countNeighborsAndSet(tile,prevDayMap,currentDayMap,currentDay) {
    let neighborsBlackCount = 0;
    let currentColor = tile.value;
    tile.neighbors.forEach(neighbor=>{
        neighborsBlackCount+= getAndCreateNeighborColor(neighbor,prevDayMap,currentDayMap,currentDay,currentColor) ? 1 : 0;
    })
    if(currentColor) { //black
        if(neighborsBlackCount === 0 || neighborsBlackCount>2) {
            currentDayMap.set(tile.tileCode,{...tile, value:false}) //set to white;
        } else {
            currentDayMap.set(tile.tileCode,{...tile}) //keep black;
        }
    } else { //white
        if(neighborsBlackCount === 2) {
            currentDayMap.set(tile.tileCode,{...tile, value:true}) //set to black;
        } else {
            currentDayMap.set(tile.tileCode,{...tile}) //keep white;
        }
    }
}

function getAndCreateNeighborColor(neighbor,prevDayMap,currentDayMap,currentDay,sourceColor) {
    if (prevDayMap.has(neighbor.tileCode)) {
        return prevDayMap.get(neighbor.tileCode).value;
    } else {
        if(currentDayMap.has(neighbor.tileCode)){
            currentDayMap.get(neighbor.tileCode).blackNeighbors += sourceColor ? 1 : 0
        } else {
            let tile = {tileCode: neighbor.tileCode, value: false, vector: neighbor.vec, neighbors: getAllNeighborsCodes(neighbor.vec), dayCreated: currentDay, blackNeighbors: sourceColor ? 1 : 0}
            currentDayMap.set(neighbor.tileCode,tile); 
        }
        return false; //if its new its white
    }
}