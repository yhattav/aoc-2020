import {exampleArray, inputArray} from './day14Input'
import _ from 'lodash'
export async function script1(useExample: boolean) {
    const usedInput = useExample ? exampleArray : inputArray;
    let _res 
    _res = run2(usedInput,10);
    return _res;
}
export async function script2(useExample: boolean) {
    const usedInput = useExample ? exampleArray : inputArray;
    let _res 
    _res = run2(usedInput,40);
    return _res;
}

const parseInput = (input: [any,any]) =>{
    let poly = input[0];
    //CH -> B
    let pairs = input[1].split(',').map(el=>el.split(' -> '));
    return {poly,pairs}
}

const run2 = (input,steps=40)=>{
    let {poly,pairs} = parseInput(input);
    let objectPoly = parsePoly(poly);
    let counter = 1;
    while (counter <= steps) {
        objectPoly = step2(objectPoly, pairs)
        counter++;
    }  
    return formAnswer(objectPoly.singleChars)
}

const parsePoly = (poly)=>{
    let res = {singleChars:{}}
    for(var i=0; i<poly.length-1;i++) {
            res[poly[i]+poly[i+1]] = res[poly[i]+poly[i+1]] ? res[poly[i]+poly[i+1]] + 1 : 1;
    }
    for(var i=0; i<=poly.length-1;i++) {
            res.singleChars[poly[i]] = res.singleChars[poly[i]] ? res.singleChars[poly[i]] + 1 : 1;
    }
    return res
}



const step2 =  (objectPoly,pairs) => {
    const newObjectPoly = _.cloneDeep(objectPoly)
    pairs.forEach(pair=>{
        let numOfOccurences = objectPoly[pair[0]];
        if(numOfOccurences) {
            if(newObjectPoly.singleChars[pair[1]]) {
                newObjectPoly.singleChars[pair[1]]+=numOfOccurences;
            } else {
                newObjectPoly.singleChars[pair[1]]=numOfOccurences;
            }
            let a = pair[0][0] + pair[1];
            let b =  pair[1] + pair[0][1];
            newObjectPoly[pair[0]]-=numOfOccurences;
            newObjectPoly[a] = newObjectPoly[a] ? newObjectPoly[a] + numOfOccurences : numOfOccurences;
            newObjectPoly[b] = newObjectPoly[b] ? newObjectPoly[b] + numOfOccurences : numOfOccurences;
        }
    })
    return newObjectPoly
}


const formAnswer=(chars:object) =>{
    let smallest = Infinity;
    let largest = 0;
    Object.values(chars).forEach((value:number)=>{
        smallest = Math.min(smallest,value);
        largest = Math.max(largest,value);
    })
    return largest - smallest
}


// const run = (input,steps=40) => {
//     let {poly,pairs} = parseInput(input);
//     console.log(poly,pairs)
//     let counter = 1;
//     let newPoly = poly
//     while (counter <= steps) {
//         //step
//         newPoly = step(newPoly, pairs)
//         counter++;
//     }  
//     return count(newPoly);
// }

// const step =  (poly,pairs) => {
//     let acc = 0;
//     let newPoly = poly;
//     let instructions = [];
//     pairs.forEach(pair => {
//     for(var i=0; i<poly.length-1;i++) {
//         if (poly[i]+poly[i+1] === pair[0]) {
//             instructions.push([i+1,pair[1]])

//         }
//     }
// })
// instructions = instructions.sort(function(a, b) {
//     return a[0] - b[0];
//   });
//   console.log({instructions})
//   instructions.forEach(instruction =>{
//             newPoly = newPoly.slice(0, instruction[0]+acc) + instruction[1] + newPoly.slice(instruction[0]+acc);
//             acc++;
//   });
//     console.log({newPoly});
//     return newPoly;
// }

// let count = (poly)=>{
//     let chars = {};
//     for(var i=0; i<=poly.length-1;i++) {
//         chars[poly[i]] = chars[poly[i]] ? (chars[poly[i]]+1) : 1
//     }
//     console.log(chars);
// }