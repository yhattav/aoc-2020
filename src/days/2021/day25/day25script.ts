import {exampleArray, inputArray} from './day25Input'
import {deepCopyMultiDimensionalArray} from '../../../utils/utils'
export async function script1(useExample: boolean) {
    const usedInput = useExample ? exampleArray : inputArray;
    let _res 
    _res = run(usedInput);
    return _res;
}
export async function script2(useExample: boolean) {
    const usedInput = useExample ? exampleArray : inputArray;
    let _res 
    _res = run(usedInput);
    return _res;
}


const run = (input) => {
    let sizeI = input.length;
    let sizeJ = input[0].length;
    let currentDay = deepCopyMultiDimensionalArray(input);
    let day = 0;
    let should = true;
    let nextDay = deepCopyMultiDimensionalArray(currentDay);
    do {
        let movedEast = live(currentDay,nextDay, 'east',sizeI,sizeJ);
        currentDay = nextDay;
        nextDay = deepCopyMultiDimensionalArray(currentDay);
        let movedSouth = live(currentDay,nextDay, 'south',sizeI,sizeJ);
        currentDay = nextDay;
        nextDay = deepCopyMultiDimensionalArray(currentDay);
        should = movedEast || movedSouth
        day++;
    } while (should);
    return day;
}

function live(day,nextDay,direction,sizeI,sizeJ) {
    let moves = 0;
    for (let i = 0 ; i < sizeI; i++){
        for (let j = 0 ; j < sizeJ; j++) {
            if(day[i][j] === '>' && direction === 'east') {
                let newJ = (j + 1 )% sizeJ;
                if(day[i][newJ] === '.') {
                    nextDay[i][newJ] = '>'
                    nextDay[i][j] = '.'
                    moves++;
                }
            } else if (day[i][j] === 'v' && direction === 'south') {
                let newI = (i+1) % sizeI;
                if(day[newI][j] === '.') {
                    nextDay[newI][j] = 'v'
                    nextDay[i][j] = '.'
                    moves++;
                }
            } else {
                continue;
            }
        }
    }
    return moves > 0;
}