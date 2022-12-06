import {exampleArray,exampleString, inputArray, inputString} from './day20Input'
import {createMatrix, binStringToDecimal} from '../../../utils/utils'
export async function script1(useExample: boolean) {
    const usedInput = useExample ? exampleArray : inputArray;
    const usedString = useExample ? exampleString : inputString;
    let _res 
    _res = runSim(usedInput,50,usedString);
    return _res;
}
export async function script2(useExample: boolean) {
    const usedInput = useExample ? exampleArray : inputArray;
    const usedString = useExample ? exampleString : inputString;

    let _res 
    _res = runSim(usedInput,2,usedString);
    return _res;
}



function runSim(inputArray, turns,enhancerString) {
    let size = inputArray.length
    let lifeItself = [];
    for (let i = 0; i < turns+1; i++) {
        let input = isOdd(i) ? '#' : '.'
        lifeItself.push(buildSimArray(inputArray,turns, input))
    }
    debugger;
    placeInitialInput(inputArray,lifeItself[0], turns);
    let day = 0;
    do {
        live(lifeItself[day],lifeItself[day+1],day,size,enhancerString);
        day++;
    } while (day < turns);
    console.log(countAllLive(inputArray))
    lifeItself.forEach(day=>{
        console.log(countAllLive(day))
    })
    console.log(lifeItself);
    console.log(enhancerString.split(''))
    return countAllLive(lifeItself[day]);
}


function buildSimArray(inputArray, turns:number = 10,input) {
    let size = inputArray[0].length; //just assuming its a cube...which it is.
    size = size + 2*(turns+1); //giving it enough space
    for (let i=0;i<=turns;i++) {
        return createMatrix(size,size, input);
    }
};
function isOdd(num) { return num % 2;}

function placeInitialInput(inputArray,day,turns) {
    for (let i = 0; i < inputArray.length; i++){
        for (let j = 0; j < inputArray[i].length; j++){
            day[i+turns+1][j+turns+1] = inputArray[i][j];
        }
    }
}

// function getPlacementArray(universe, dimensions, turns) {
//     if (dimensions === 2) { 
//         return universe;
//     } else if (dimensions === 3) {
//         return universe[turns+1];
//     } else if (dimensions === 4) {
//         return universe[turns+1][turns+1];
//     }
// }


function live(day,nextDay,turn,size,enhancerString) {
    let start = (day.length-size)/2-turn-1 ;
    let end = (day.length - ((day.length-size)/2-turn));
    console.log({start,end})
    for (let i = start ; i <=end; i++){
        for (let j = start ; j <=end; j++) {
            // console.log({i,j});
            let neighborsString = getNeighborsString([i,j], day);
            let stringVal = binStringToDecimal(neighborsString);
            // debugger;
            nextDay[i][j] = enhancerString[stringVal];
        }
    }
}

function getNeighborsString([i,j], day) {
    let strArray = [];
    let maxI = day.length;
    let maxJ = day[0].length;
    let ob = {
        "0": day[i-1][j-1],
    }

    strArray.push(day[i-1].slice(j-1,j+2))
    strArray.push(day[i].slice(j-1,j+2))
    strArray.push(day[i+1].slice(j-1,j+2))
    let str = strArray.map(el=>el.map(el=>isAlive(el) ? 1 : 0).join('')).join('');
    return str;
}


function countAllLive(day) {
    let sum = 0;
    day.forEach(line=>{
        line.forEach(placement=>{
            sum+= isAlive(placement) ? 1 : 0;
        })
    })
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