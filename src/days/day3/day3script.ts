import {exampleArray, inputArray} from './day3Input'

export async function script1(useExample: boolean) {
    const usedInput = useExample ? exampleArray : inputArray;
    let _res = findHitTrees(1,3,usedInput) ;
    return _res;
}
export async function script2(useExample: boolean) {
    const usedInput = useExample ? exampleArray : inputArray;
    let _res = multiplyAllSlopes(usedInput); ;
    return _res;
}

function findHitTrees(y: number, x: number, inputArray) {
    console.log(inputArray);
    const treeLines = inputArray.length;
    const mod = inputArray[0].length;
    console.log(treeLines,mod);
    let __res = 0;
    for (let i = 0+y; i < treeLines; i+=y) {
        let checkedIndex = i/y * x;
        let checkedIndexMod = checkedIndex % mod;
        console.log({checkedIndex,checkedIndexMod})
        console.log(i);
        if(inputArray[i][checkedIndexMod] === '#') {
            __res++;
        }
    }
    return __res;
}

function multiplyAllSlopes(inputArray){
// Right 1, down 1.
// Right 3, down 1. (This is the slope you already checked.)
// Right 5, down 1.
// Right 7, down 1.
// Right 1, down 2.

let a,b,c,d,e,__res;

a = findHitTrees(1,1,inputArray);
b = findHitTrees(1,3,inputArray);
c = findHitTrees(1,5,inputArray);
d = findHitTrees(1,7,inputArray);
e = findHitTrees(2,1,inputArray);
console.log(a,b,c,d,e);

__res = (a*b*c*d*e);
return __res;

}