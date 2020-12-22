import {exampleArray, inputArray} from './day20Input'
import {createMatrix} from '../../utils/utils'
export async function script1(useExample: boolean) {
    const usedInput = useExample ? exampleArray : inputArray;
    let _res 
    _res = getCornerMult(usedInput);
    return _res;
}
export async function script2(useExample: boolean) {
    const usedInput = useExample ? exampleArray : inputArray;
    let _res 
    _res = run2(usedInput);
    return _res;
}

function getCorners(inputArray) {
    let images = new Map();
    let borders = new Map();

    let bordersCount = []
    inputArray.forEach((val=>{
        let id = Number(val[0]);
        let image = val[1];

        let top = image[0]
        let bot = image[image.length - 1];
        let left = [];
        let right = [];


        for (let y = 0; y < image.length; y++) {

            left.push(image[y][0]);
            right.push(image[y][image.length - 1]);

        }

        let pos = [
            parseInt(top, 2),
            parseInt(right.join(''), 2),
            parseInt(bot, 2),
            parseInt(left.join(''), 2),
            parseInt(top.split('').reverse().join(''), 2),
            parseInt(right.reverse().join(''), 2),
            parseInt(bot.split('').reverse().join(''), 2),
            parseInt(left.reverse().join(''), 2),
        ];

        pos.forEach(val=>{
            bordersCount[val] = bordersCount[val] ? bordersCount[val] + 1 : 1;
            borders.set(val,id);
        })
        images.set(id,pos);
    }))

    let unmatchedTiles = []
    bordersCount.map((val,index)=>{
        if (val === 1) {
            unmatchedTiles.push(borders.get(index));
        }
    })
    unmatchedTiles.sort();
    let reacurencesCount = [];

    unmatchedTiles.forEach((val,index)=>{
        reacurencesCount[val] = reacurencesCount[val] ? reacurencesCount[val] + 1 : 1;
    })

    let corners = []
    reacurencesCount.map((val,index)=>{
        if (val === 4) {
            corners.push(index);
        }
    })

    return corners;
}

function getCornerMult(inputArray) {
    let corners = getCorners(inputArray)
    const reducer = (accumulator, currentValue) => accumulator * currentValue;
    return corners.reduce(reducer, 1)
}



function transpose(array) {
    return array[0].map((_, colIndex) => array.map(row => row[colIndex]));
}

function run2(inputArray) {
    let tilesMap = parseTiles(inputArray);
    let corners = getCorners(inputArray);
    let firstCorner = tilesMap.get(corners[0])
    let foundCache = [];
    let imageSize = Math.sqrt(inputArray.length);
    let imageMatrix = createMatrix(imageSize,imageSize);
    imageMatrix[0][0] = findTopLeft(firstCorner,tilesMap);
    foundCache.push(firstCorner.id)
    fillImageMatrix(imageMatrix,tilesMap,foundCache);
    let image = stitchImage(imageMatrix);
    let totalNumOfWaves = countWaves(image);
    let {numOfSeaMonsters,orientedImage} = findSeaMonsters(image);
    return (totalNumOfWaves - numOfSeaMonsters*15);
}

function isUnmatched(testedBorder,tilesMap) {
    let res = 0;
    tilesMap.forEach((value,key)=>{
        if(value.borders.some(border=> border === testedBorder)) {
            res++;
        }
    })
    return res===1;
}




function getRotatedTile(tile) {
    let rotatedTile = tile.slice(0);
    rotatedTile.map(line=>line.split(''))
    rotatedTile = rotatedTile.map((_, index) => rotatedTile.map(row => row[index]).reverse().join(''))
    return rotatedTile;
}

function getMirroredTile(tile) {
    let mirroredTile = tile.slice(0);
    mirroredTile = mirroredTile.map((line, _) => line.split('').reverse().join(''))
    return mirroredTile;
}

function parseTiles(inputArray) {
    let tilesMap = new Map();
    inputArray.forEach(tileInput=>{
        let [id] = tileInput[0];
        id = Number(id);
        let tile = tileInput[1];
        let rotations = getAllPossibleRotations(tile);
        let borders = getAllPossibleBorders(rotations);
        let tileObject = {
            rotations,
            borders,
            tile,
            id,
        }
        tilesMap.set(id,tileObject)
    })

    return tilesMap
}


function getAllPossibleRotations(tile) {
    return [
        tile,
        getRotatedTile(tile),
        getRotatedTile(getRotatedTile(tile)),
        getRotatedTile(getRotatedTile(getRotatedTile(tile))),
    ].flatMap(tile=>[tile,getMirroredTile(tile)]);
}

function getAllPossibleBorders(rotations) {
    return rotations.map(rotation=>getTopBorder(rotation));
}

function getTopBorder(tile) {
    return tile[0];
}
function getBottomBorder(tile) {
    return tile[tile.length - 1];
}
function getLeftBorder(tile) {
    return getRotatedTile(tile)[0]
}
function getRightBorder(tile) {
    return getRotatedTile(tile)[tile.length - 1];
}

function findTopLeft(firstCorner,tilesMap) {
    return findRotation(firstCorner,(tile)=>{
        let top = getTopBorder(tile)
        let left = getLeftBorder(tile);
        let isUnmatchedTop = isUnmatched(top,tilesMap);
        let isUnmatchedLeft = isUnmatched(left,tilesMap);
        return isUnmatchedTop && isUnmatchedLeft    
    });
}

function findRotation(tileObj,matchingFunc) {
    let posRotations = tileObj.rotations;
    return posRotations.find(matchingFunc);
}

function fillImageMatrix(imageMatrix,tilesMap,foundCache) {

    for (let i = 0; i < imageMatrix.length; i++) {
        fillLine(imageMatrix[i-1] ? getBottomBorder(imageMatrix[i-1][0]) : undefined, imageMatrix[i],tilesMap,foundCache)
    }

}

function fillLine(firstTopBorder,imageLine,tilesMap,foundCache) {
    for (let i = 0; i < imageLine.length; i++) {
        if(imageLine[i] !== ' '){ //its probably the first corner set individually
            continue;
        } else {
            if(i===0) { 
                //find first in line by the top
                let matchingTile = findTileByBorder(firstTopBorder,tilesMap,foundCache);
                let tile = findRotation(matchingTile,(tile)=>{
                    return firstTopBorder===getTopBorder(tile);
                })
                imageLine[i] = tile;
                foundCache.push(matchingTile.id);
            } else {
                //match next to the right border
                let borderToMatch = getRightBorder(imageLine[i-1])
                let matchingTile = findTileByBorder(borderToMatch,tilesMap,foundCache);
                let tile = findRotation(matchingTile,(tile)=>{
                    return borderToMatch===getLeftBorder(tile);
                })
                imageLine[i] = tile;
                foundCache.push(matchingTile.id);
            }
        }
    }
}

function findTileByBorder(borderToFind,tilesMap,foundCache) {
    let res
    tilesMap.forEach((value,key)=>{
        let borders = value.borders;
        if (foundCache.findIndex(tileId=>tileId ===key)  === -1 && borders.some(border=>border===borderToFind)) {
            res = value;
        }
    });
    return res;
}

function stitchImage(imageMatrix) {
    let noBordersMatrix = removeBorders(imageMatrix);
    return joinTiles(noBordersMatrix);
}

function removeBorders(imageMatrix) {
    return imageMatrix.map(line=>line.map(image=>removeBordersSingleImage(image)))
}

function removeBordersSingleImage(imageWithBorders) {
    let image = imageWithBorders.slice(0);
    image.shift();
    image.pop();
    image = image.map(line=> {
        line = line.split('');
        line.shift();
        line.pop();
        return line.join('');
    })
    return image;
}

function joinTiles(noBordersMatrix) {
    let combined = [];
    for (let i = 0; i <noBordersMatrix.length; i++) {
        let lines = []
        for (let j = 0; j <noBordersMatrix.length; j++) {
            for(let k = 0; k <noBordersMatrix[0][0].length; k++) {
                lines[k] = lines[k] ? lines[k] + noBordersMatrix[i][j][k] : '' + noBordersMatrix[i][j][k];
            }
        }
        combined = combined.concat(lines);
    }
    return combined;
}

function countWaves(image) {
    let sum = 0;
    let reducer = (accumulator, currentValue) => accumulator + Number(currentValue);
    image.map(line=>{
        sum += line.split('').reduce(reducer,0);
    });
    return sum;
}


function findSeaMonsters(image) {

    let imagePossibilities = getAllPossibleRotations(image);
    let orientedImage;
    let numOfSeaMonsters;
    imagePossibilities.forEach(imagePos=>{
        let num = countSeaMonsters(imagePos);
        if (num>0){
            orientedImage = imagePos;
            numOfSeaMonsters = num;
        }
    })
    return {orientedImage,numOfSeaMonsters};
}

function countSeaMonsters(image) {
    const seaMonsterLength = 20;
    const seaMonsterHeight = 3;
    let seaMonsterCount = 0;
    for (let i = 0; i < image[0].length - seaMonsterHeight; i++) {
        for(let j = 0;j<image.length-seaMonsterLength; j++) {
            if(isSeaMonster(i,j,image)) {
                seaMonsterCount++;
            }
        }
    }
    return seaMonsterCount;
}

function isSeaMonster(i,j,image) { //this is so ugly :(
    return (
    (image[i][j+18] === '1') &&
    (image[i+1][j] + image[i+1][j+5] + image[i+1][j+6] + image[i+1][j+11] + image[i+1][j+12] + image[i+1][j+17] + image[i+1][j+18] + image[i+1][j+19]) === '11111111' && 
    (image[i+2][j+1] + image[i+2][j+4] + image[i+2][j+7] + image[i+2][j+10] + image[i+2][j+13] + image[i+2][j+16]) === '111111')
}