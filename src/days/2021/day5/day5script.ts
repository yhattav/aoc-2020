import {exampleArray, inputArray} from './day5Input'
export async function script1(useExample: boolean) {
    const usedInput = useExample ? exampleArray : inputArray;
    const mapSize = useExample ? 10 : 1000;
    let _res 
    _res = run(usedInput,mapSize);
    return _res;
}
export async function script2(useExample: boolean) {
    const usedInput = useExample ? exampleArray : inputArray;
    const mapSize = useExample ? 10 : 1000;
    let _res 
    _res = run2(usedInput,mapSize);
    return _res;
}



const run2 = (array, size)=>{
let line = new Array(size).fill(0);
let map = new Array(size).fill(line.slice(0));
let draw = (el)=>{map = drawLine(el,map,false)}
array.forEach(draw);
return getIntersections(map);

}
const run = (array, size)=>{
let line = new Array(size).fill(0);
let map = new Array(size).fill(line.slice(0));
let draw = (el)=>{map = drawLine(el,map,true)}
array.forEach(draw);
return getIntersections(map);

}

const drawLine = (line,map,onlyStraigh) => {
    const p1 = line[0];
    const p2 = line[1];
var angleDeg = getAngle(p1,p2)
let newMap = map;
if(!onlyStraigh || isStraight(angleDeg)) {
    newMap =
    map.map((row,indexX)=>{
        let newRow = row.map((point,indexY)=>{
            return point + (isInLine([indexY,indexX],angleDeg,line) ? 1 : 0);
        })
        return newRow
    })
}
    return newMap;
}

const isStraight = (deg) =>{
    return Math.abs(deg) % 90 === 0
}
const isInLine = (point,deg,line) =>{
    const angle1 = getAngle(point,line[0])
    const angle2 = getAngle(point,line[1])
    return (angle1 === -180 + angle2) || (angle1 === 180 + angle2) || isSamePoint(line[0],point) || isSamePoint(line[1],point)
}


const getAngle = (p1,p2) =>{
    return Math.atan2(p2[0] - p1[0], p2[1] - p1[1]) * 180 / Math.PI;
}

const isSamePoint = (p1,p2) => {
    return p1[0] === p2[0] && p1[1] === p2[1]
}

const getIntersections = (map)=>{
let acc = 0
map.forEach(row=>{
    row.forEach(point=>{
        if(point>1) acc++;
    })
})
return acc;
}