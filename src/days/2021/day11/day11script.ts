import {exampleArray, inputArray} from './day11Input'
import { deepCopyMultiDimensionalArray } from '../../../utils/utils';
import {isValidPosition} from '../../../utils/mazeUtils'
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
var flashAcc
const run = (input,steps=100) => {
    let map = deepCopyMultiDimensionalArray(input)
    flashAcc = 0;
    let counter = 1;
    while (counter <= steps) {
        //step
        step(map);
        counter++;
    }
    return flashAcc;
}
const run2 = (input) => {
    let map = deepCopyMultiDimensionalArray(input)
    let steps = 0;
    let numOfFlashes;
    let go = true
    while (go) {
        //step
        steps++;
        numOfFlashes = step(map);
        go = numOfFlashes < 100;
    }
    return steps;
}



const step = (map)=> {
    let flashes = 0;
    const flashPositions = upgradeBy1(map);
    flashes+=flashPositions.length;
    flashes += flahIn(map,flashPositions);
    //+1 every octopus
    return flashes;
}

const upgradeBy1 = (map) => {
    const flashPositions = [];
    for (let i = 0; i <map.length; i++) {
        for (let j = 0; j <map[0].length; j++) {
            const final = (map[i][j] + 1) % 10;
            map[i][j] = final
            if(final === 0) {
                flashPositions.push([i,j]);
                flashAcc++;
            }
        }
    }
    return flashPositions;
}

const flahIn = (map,positions) => {
    let currentPos;
    let additionalFlashes = 0;
    while(positions.length > 0) {
        currentPos = positions.shift();
        let posI = currentPos[0];
        let posJ = currentPos[1];
        for (let i = posI-1; i <= posI+1; i++) {
            for (let j = posJ-1; j <=posJ+1; j++) {
                if(isValidPosition(map,[i,j])) {
                    const init = map[i][j];
                    if(init === 0) {
                        continue;
                    } else {
                        const final = (map[i][j] + 1) % 10;
                        map[i][j] = final
                        if(final === 0) {
                            positions.push([i,j])
                            flashAcc++
                            additionalFlashes++;
                        }
                    }
                }
            }
        }
    }
    return additionalFlashes;
}