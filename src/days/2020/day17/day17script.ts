import {exampleArray, inputArray} from './day17Input'
export async function script1(useExample: boolean) {
    const usedInput = useExample ? exampleArray : inputArray;
    let _res 
    _res = runSim(usedInput,6,3);
    return _res;
}
export async function script2(useExample: boolean) {
    const usedInput = useExample ? exampleArray : inputArray;
    let _res 
    _res = runSim(usedInput,6,4);
    return _res;
}

function runSim(inputArray, turns, dimensions) {
    let lifeItself = [];
    let coordinatesList = new Map();
    for (let i = 0; i < turns+1; i++) {
        lifeItself.push(buildSimArray(inputArray,turns,dimensions, i===0 ? coordinatesList : undefined))
    }
    placeInitialInput(inputArray,lifeItself[0],dimensions, turns);

    let day = 0;
    do {
        live(lifeItself[day],lifeItself[day+1],dimensions,coordinatesList);
        day++;
    } while (day < turns);

    return countAllLive(coordinatesList,lifeItself[lifeItself.length-1]);
}


function buildSimArray(inputArray, turns:number = 10, dimensions :number = 3,coordinatesList) {
    let size = inputArray[0].length; //just assuming its a cube...which it is.
    size = size + 2*turns; //giving it enough space
    return createDimension('.', size, dimensions, coordinatesList, '');
};

function createDimension(unit, size:number, left:number,coordinatesList, current) {
    let array = [];
    if (left === 0) {
        coordinatesList && coordinatesList.set(current.slice(0,-1) , getNeighborCoordinates(current.slice(0,-1), size));
        return unit;}
    for (let i = 0; i < size; i++) {
        array[i] = createDimension(unit, size, left-1,coordinatesList, i +','+current);
    }
    return array;
}

function placeInitialInput(inputArray,universe,dimensions,turns) {
    let placementArray = getPlacementArray(universe, dimensions, turns)

    for (let i = 0; i < inputArray.length; i++){
        for (let j = 0; j < inputArray[i].length; j++){
            placementArray[i+turns][j+turns] = inputArray[i][j];
        }
    }
}

function getPlacementArray(universe, dimensions, turns) {
    if (dimensions === 2) { 
        return universe;
    } else if (dimensions === 3) {
        return universe[turns+1];
    } else if (dimensions === 4) {
        return universe[turns+1][turns+1];
    }
}


function live(universe,nextUniverse,dimensions,coordinatesList) {
    coordinatesList.forEach((value,key)=>{
        let numOfLiveNeighbors = getNumberOfLiveNeighbors(value, universe)
        let current = getStringByCoordinates(key,universe)
        // assignStringByCoordinates(key,nextUniverse,current+ numOfLiveNeighbors);
        if (isAlive(current)) {
            if (!(numOfLiveNeighbors === 2 || numOfLiveNeighbors === 3)){
                assignStringByCoordinates(key,nextUniverse,'.');
            } else {
                assignStringByCoordinates(key,nextUniverse,'#');
            }
        } else {
            if (numOfLiveNeighbors === 3) { 
                assignStringByCoordinates(key,nextUniverse,'#');
            }
        }
    })
}

function getNumberOfLiveNeighbors(neightborsCoordinatesList, universe) {
    let sum = 0;
    neightborsCoordinatesList.forEach(coordinate=>{
        sum += isAlive(getStringByCoordinates(coordinate,universe)) ? 1 : 0 ;
    });
    return sum;
}


function getNumberOfNeighbors(coordinate, local, sum) { //dfs
    if (typeof local[coordinate] === 'string') {
        return (isAlive(coordinate[local]) ? 1 : 0);
    } else {
        for (let i = -1; i < 2; i++) {
            sum += getNumberOfNeighbors(coordinate,local[i], sum);
        }
        return sum;
    }
}


function countAllLive(coordinatesList, universe) {
    let sum = 0;
    coordinatesList.forEach((value,key)=>{
        sum += isAlive(getStringByCoordinates(key,universe)) ? 1 : 0 ;
    });
    return sum;
}

function isAlive(cell: string) {
    return (cell === '#');
}



function getNeighborCoordinates(coordinatesString: string, maxSize: number) {
    let neighbors = [''];
    let array = coordinatesString.split(',');
    do {
        let current = Number(array.shift());
        let temp = [];
        // temp = [];
        for (let i = current - 1 ; i <= current+1 ; i++) {
            if (i>=0 && i < maxSize) {
                neighbors.forEach(val=>{
                    temp.push(val + i + ',');
                })
            }
        }
        neighbors = temp;
    } while (array.length > 0);
    neighbors = neighbors.map(val=>val.slice(0,-1)).filter(value=>value !== coordinatesString);
    return neighbors;
}

function getStringByCoordinates(coordinatesString: string, universe) {
    let array = coordinatesString.split(',').map(Number);
    let res = universe;
    do {
        let loc = array.shift();
        res = res[loc];
    } while (array.length> 0)
    return res;
}

function assignStringByCoordinates(coordinatesString, universe, value) {
    let array = coordinatesString.split(',').map(Number);
    let res = universe;
    while (array.length> 1)
    {
        let loc = array.shift();
        res = res[loc];
    }
    res[array.shift()] = value;
}