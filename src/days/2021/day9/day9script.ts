import {exampleArray, inputArray} from './day9Input'
import {getPositionAt,protectedGetValueAt} from '../../../utils/mazeUtils'
import type {direction} from '../../../utils/mazeUtils'
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
    _res = run2(usedInput);
    return _res;
}
let reducer = (accumulator, currentValue) => accumulator + currentValue;

const run = (input) => {
    let _input = deepCopyMultiDimensionalArray(input)
    let lows = getLows(_input)
    let reducer = (accumulator, currentValue) => accumulator + currentValue;
    let newArr = lows.map(pos=>{
        return protectedGetValueAt(_input,pos,9) + 1;
    })
    return newArr.reduce(reducer);
}

const run2 = (input) => {
    let _input = deepCopyMultiDimensionalArray(input)

    let lows = getLows(_input)
    let newArr = lows.map(pos=>{
        return getBasinValue(_input,pos,0);
    });
    let first = Math.max(...newArr);
    newArr.splice(newArr.findIndex(val=>val===first),1);
    let second = Math.max(...newArr);
    newArr.splice(newArr.findIndex(val=>val===second),1);
    let third = Math.max(...newArr);
    newArr.splice(newArr.findIndex(val=>val===third),1);
    return first * second * third
}

const getBasinValue = (map, pos, total) => {
    map[pos[0]][pos[1]] = 10; //mark as visited
    total += (1 + ['right', 'left','up','down'].map((neighbor:direction) => {
        let neighPos = getPositionAt(pos,neighbor);
        if(canFlow(map,neighPos)){
            return getBasinValue(map,neighPos,0);
        } else {
            return 0;
        }
    }).reduce(reducer));
    return total;
}

const isLow = (map,point) => {
    let pointVal = protectedGetValueAt(map,point,9);
return ['right', 'left','up','down'].every((direction:direction) => {
    let dirVal = protectedGetValueAt(map,getPositionAt(point,direction),9)
    return dirVal > pointVal
})

}
const canFlow = (map,point) => {
    let pointVal = protectedGetValueAt(map,point,9);
    return pointVal < 9
}

const getLows = (map) =>{
    let lows = []
    for (let i = 0; i <map.length; i++) {
        for (let j = 0; j < map[0].length; j++) {
            if(isLow(map,[i,j])) { 
                lows.push([i, j]);
            }
        }
    }
    return lows
}