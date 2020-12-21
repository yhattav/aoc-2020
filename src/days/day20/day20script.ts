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
    _res = createImagePossibilities(usedInput);
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

// function linkImages(inputArray) {
//     let images = new Map();
//     let borders = new Map();

//     let bordersCount = []
//     inputArray.forEach((val=>{
//         let id = Number(val[0]);
//         let image = val[1];

//         let top = image[0]
//         let bot = image[image.length - 1];
//         let left = [];
//         let right = [];


//         for (let y = 0; y < image.length; y++) {

//             left.push(image[y][0]);
//             right.push(image[y][image.length - 1]);

//         }

//         let pos = {
//             top: parseInt(top, 2),
//             right: parseInt(right.join(''), 2),
//             bot: parseInt(bot, 2),
//             left: parseInt(left.join(''), 2),
//             topR: parseInt(top.split('').reverse().join(''), 2),
//             rightR: parseInt(right.reverse().join(''), 2),
//             botR: parseInt(bot.split('').reverse().join(''), 2),
//             leftR: parseInt(left.reverse().join(''), 2),
//         };

//         Object.values(pos).forEach(val=>{
//             bordersCount[val] = bordersCount[val] ? bordersCount[val] + 1 : 1;
//             borders.set(val,id);
//         })
//         images.set(id,pos);
//     }))
    
//     let unmatchedTiles = []
//     let unmatchedBorders = []
//     bordersCount.map((val,index)=>{
//         if (val === 1) {
//             unmatchedTiles.push(borders.get(index));
//             unmatchedBorders.push(index);
//         }
//     })
//     unmatchedTiles.sort();
//     let reacurencesCount = [];

//     unmatchedTiles.forEach((val,index)=>{
//         reacurencesCount[val] = reacurencesCount[val] ? reacurencesCount[val] + 1 : 1;
//     })

//     let corners = []
//     reacurencesCount.map((val,index)=>{
//         if (val === 4) {
//             corners.push(index);
//         }
//     })
//     console.warn(images.size)

//     let imageSize = Math.sqrt(images.size)
//     console.warn(imageSize)
//     let imageMatrix = createMatrix(imageSize,imageSize);
//     console.warn(imageMatrix);
//     let firstCorner = {id: corners[0], rotate: 0, flip: false}
//     findPlacement(firstCorner.id,images,unmatchedBorders)
//     return corners;
// }


function findPlacement(id,images,unmatchedBorders) {
    let pos = images.get(id)
    Object.keys(pos).forEach(val=>{
        let tested = pos[val];
        if(unmatchedBorders.findIndex(_val=> {
            return _val === tested
        }) !== -1) {
            console.log(val);
        }
    })
    debugger;
}

function transpose(array) {
    return array[0].map((_, colIndex) => array.map(row => row[colIndex]));
}

function createImagePossibilities(inputArray) {
    let images = new Map();
    let borders = new Map();

    let bordersCount = []
    inputArray.forEach(val=>{
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
        let image1 = transpose(image);
        let image2 = transpose(image1);
        let image3 = transpose(image2);
        console.log(image,image1,image2,image3);
        debugger;
        let permutations = [
            image,
        ]


})
}




