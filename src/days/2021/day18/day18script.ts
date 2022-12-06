import {exampleArray, inputArray} from './day18Input'
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

const run2 = (input) => {
    let pairs = [];
    input.map((line,index)=>{
        input.forEach((otherLine,otherIndex)=>{
            if(otherIndex !== index) 
            pairs.push([line,otherLine])
        })
    })
    console.log(pairs)
    let max = 0;
    pairs.map(pair=>{
        max = Math.max(run(pair),max)
    })
    return max
}
const run = (input) => {
    let pointer = 1;
    let length = input.length;
    let base = representAsObject(input[0],undefined);
    let added
    let currentRes;
    let working = true;
    while (pointer <= length) {
        working = true
        if(input[pointer]) {
            added = representAsObject(input[pointer],undefined);
            currentRes = addUp(base,added);
        } else {
            currentRes = base;
        }
        while(working){
            const {newRes,found} = reduceSnail(currentRes);
            currentRes = newRes;
            working = found;
        }
        base = currentRes;
        pointer++;
    }
return magnitude(base);
}


const addUp = (base, added) => {
    let newTop = {
        'left': base,
        'right': added,
        parent: undefined
    }
    base.parent = newTop;
    added.parent = newTop;

    return newTop;
    // return [base,added];
    // // return `[${base},${added}]`;
}

var deepestLevel = -1
var deepestObject;
function getDeepestObject(obj,level):any{
    var children = [];
    Object.keys(obj).forEach(function(key){
      if(typeof obj[key] === 'object' && obj[key] && key !== 'parent') 
        children.push(getDeepestObject(obj[key],level+1));
    });
    if(!children.length){ return obj; }
    else { 
       children.forEach(function(child){
           if(level > deepestLevel) { 
            //    console.log(level,deepestLevel,child)
               deepestLevel = level; 
               deepestObject = child;
           }
       });
    }
    return deepestObject;
  }

const depthOf = (object) => {
    var level = 1;
    var deepestObject;
    for(var key in object) {
        if (!object.hasOwnProperty(key) || key === 'parent') continue;

        if(typeof object[key] == 'object'){
            var depth = depthOf(object[key]).level + 1;
            level = Math.max(depth, level);
            if(!deepestObject && level === 5) deepestObject = object
        }
    }
    return {level,deepestObject};
}

const reduceSnail = (snailNumber)=>{
    let found = false;
    // console.log('depth:',depthOf(snailNumber))
    // console.log('deepestOb:', getDeepestObject(snailNumber))
    let deepest = depthOf(snailNumber).level;
    // console.log('before : ' ,getAllNumbers(snailNumber));
    if (deepest >4) {
        if(deepest>5) debugger;
        deepestObject = undefined
        deepestLevel = -1
        let objectToExplode = getDeepestObject(snailNumber,0);
        explode(objectToExplode);
        found = true
    } else {
        let number = nestedLoop(snailNumber);
        if(number) {
            split(number);
            found = true
        }
    }
    
    // console.log('after : ' ,getAllNumbers(snailNumber));
    return {newRes:snailNumber,found}

}

const explode = (snailNumber)=>{ 
let copy = {...snailNumber}
//make it 0
// console.log('>>>>>>>>>>>>>>>>explode:',copy['left'], copy['right'], snailNumber)
addLeft(copy['left'],snailNumber.parent,snailNumber);
addRight(copy['right'],snailNumber.parent,snailNumber);
let parent = snailNumber.parent
if(snailNumber.parent.left === snailNumber){
    //is left
    snailNumber.parent.left = 0
} else {
    //is right
    snailNumber.parent.right = 0
}
// console.log(parent)
}



const representAsObject = (snailNumber,parent)=>{
    let res = {left: undefined,right: undefined,parent};
    res.left = isNumber(snailNumber[0]) ? snailNumber[0] : representAsObject(snailNumber[0],res)
    res.right = isNumber(snailNumber[1]) ? snailNumber[1] : representAsObject(snailNumber[1],res)
    return res
}



const isNumber = (tested:any)=>{
    return typeof tested === 'number'
}

const addLeft = (number:number,parent,exploaded)=> {
    if(parent['left'] === exploaded){         
        //explo was on the left
        //need to go up1
        parent.parent && addLeft(number,parent.parent,parent)
    } else {
        //explo was on the right 
        //need to add to left
        if(!parent) debugger;
        deepRight(number,parent, 'left');
        // if(isNumber(parent.left)) {
        //     parent.left=parent.left + number;
        // } else {
        //     // addLeft(number,parent.right,undefined,'');
        //     debugger;
        //     deepRight
        // }
    }
}
const deepRight = (number:number,parent, dir)=> {
    if(isNumber(parent[dir])) {
        parent[dir]=parent[dir] + number;
    } else {
        deepRight(number,parent[dir],'right')
        // addLeft(number,parent.right,undefined,'');
    }
}
const deepLeft = (number:number,parent, dir)=> {
    if(isNumber(parent[dir])) {
        parent[dir]=parent[dir] + number;
    } else {
        deepLeft(number,parent[dir],'left')
        // addLeft(number,parent.right,undefined,'');
    }
}
const addRight = (number:number,parent,exploaded)=> {
    if(parent['right'] === exploaded){         
        //explo was on the right
        //need to go up1
        parent.parent && addRight(number,parent.parent,parent,)
    } else {
        if(!parent) debugger;
        deepLeft(number,parent,'right')

        //explo was on the left 
        //need to add to right
        // if(isNumber(parent.right)) {
        //     parent.right=parent.right + number;
        // } else if(isNumber(parent.right.left)) {
        //     parent.right.left = parent.right.left + number;
        // } else {
        //     debugger;
        // }
    }
}

const findBigNumbers = (snailNumber,number=10) => {
    if(isNumber(snailNumber.left)) {
        if(snailNumber.left >= number) { 
            return snailNumber; 
        }
    } 
    if (typeof snailNumber.left === 'object') {
        return findBigNumbers(snailNumber.left)
    }
    if(isNumber(snailNumber.right)) {
        debugger;
        if(snailNumber.right >= number) { 
            return snailNumber; 
        }
    }
    if (typeof snailNumber.right === 'object') {
        return findBigNumbers(snailNumber.right)
    } 
        return;
    
}

function nestedLoop(obj) {
    let res = null;
    function recurse(obj, current?) {
        for (const key in obj) {
            if(key !== 'parent') {
                let value = obj[key];
                if(value != undefined) {
                    if (value && typeof value === 'object') {
                        recurse(value, key);
                    } else {
                        // Do your stuff here to var value
                        if(!res && value>=10) {
                            res = obj
                        }
                    }
                }
            }
        }
    }
    recurse(obj);
    return res;
}

const split = (snailNumber) => {
    // console.log('>>>>>>>>>>>>>>>>split', snailNumber)
    let left = snailNumber.left;
    let right = snailNumber.right;
    let newLeft;
    let newRight;
    let key;
    if(left >=10) {
        newLeft = Math.floor(left/2);
        newRight = Math.ceil(left/2);
        key = 'left'
    } else if(right >= 10) {
        newLeft = Math.floor(right/2);
        newRight = Math.ceil(right/2);
        key = 'right'
    } else {
        debugger;
    }
    snailNumber[key] = {
        left: newLeft,
        right: newRight,
        parent: snailNumber,
    }

}

function getAllNumbers(obj) {
    const res = [];
    function recurse(obj, current?) {
        for (const key in obj) {
            if(key !== 'parent') {

            let value = obj[key];
            if(value != undefined) {
                if (value && typeof value === 'object') {
                    recurse(value, key);
                } else {
                    if(key === 'right' || key === 'left') {
                        res.push(value)
                    }
                }
            }
        }
        }
    }
    recurse(obj);
    return res;
}


const magnitude = (snailNumber) => {
    if(isNumber(snailNumber)) return snailNumber;
    return magnitude(snailNumber.right)*2  + magnitude(snailNumber.left)*3
}