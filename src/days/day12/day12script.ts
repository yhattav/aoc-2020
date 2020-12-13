import {exampleArray, inputArray} from './day12Input'
import Victor from 'victor';
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

const dirs = {
    'N': [-1,0],
    'E': [0,1], 
    'S': [1,0],
    'W': [0,-1],
}

function run(inputArray) {
    let pos = [0,0];
    let currentFace = 'E';

    inputArray.forEach(value=>{
        let move = getMove(currentFace,value);
        if (move.type === 'face') {
            currentFace = move.newFace;
        } else if (move.type === 'move') {
            let moveYX = dirs[move.resDir];
            moveYX = [moveYX[0]*move.resDist,moveYX[1]*move.resDist];
            pos = [pos[0] + moveYX[0],pos[1] + moveYX[1]];
        }
    })
    return Math.abs(pos[0]) + Math.abs(pos[1]);
}


function getMove(currentFace,instruction) {
    let dir = instruction && instruction.slice(0,1);
    let dist = instruction && Number(instruction.slice(1));
    let resDir,resDist,newFace,type;
    let store = 0;
    if(Object.keys(dirs).some(d=>d===dir)) {
        type = 'move'
        resDir = dir;
        resDist = dist;
    } else if(dir === 'L' || dir === 'R') {
        type = 'face';
        if(dir === 'R'){
                store += dist;
            }else if(dir === 'L') {
                store -= dist;
            }
            let dirsArray = Object.keys(dirs);
            let currentFaceIndex = dirsArray.findIndex(d => d===currentFace)
            let dirIndex = (currentFaceIndex + (store / 90) + 4) % 4;
            newFace = dirsArray[dirIndex];
            resDist = 0;
    }  else if (dir === 'F') {
        type = 'move'
        resDir = currentFace;
        resDist = dist;
    } 
    return {resDir,resDist,newFace,type}
}












function run2(inputArray) {
    let shipPos = [0,0];
    //10 units east and 1 unit north
    let wayPoint = new Victor(10,-1);
    inputArray.forEach(value=>{
        let move = getMove2(value);
        switch(move.type) {
            case 'execute':
                let execY = wayPoint.y*move.resDist
                let execX = wayPoint.x*move.resDist
                shipPos=[shipPos[0]+execY,shipPos[1]+execX];
                break;
            case 'rotate':
                wayPoint.rotateDeg(move.resAngle);
                break;
            case 'move':
                let moveYX = dirs[move.resDir];
                let moveX = moveYX[1]*move.resDist
                let moveY = moveYX[0]*move.resDist
                wayPoint
                .add(new Victor(moveX,moveY))
                break;
        }
    })
    return Math.abs(shipPos[0]) + Math.abs(shipPos[1]);
}


function getMove2(instruction) {
    let dir = instruction && instruction.slice(0,1);
    let dist = instruction && Number(instruction.slice(1));

    let resDir,resDist,newFace,type,resAngle;
    let store = 0;

    if(Object.keys(dirs).some(d=>d===dir)) {
        type = 'move'
        resDir = dir;
        resDist = dist;
    } else if(dir === 'L' || dir === 'R') {
        type = 'rotate';
        if(dir === 'R'){
                store += dist;
            }else if(dir === 'L') {
                store -= dist;
            }
            resAngle = store;
    }  else if (dir === 'F') {
        type = 'execute'
        resDist = dist;
    } 
    return {resDir,resDist,newFace,type,resAngle}
}