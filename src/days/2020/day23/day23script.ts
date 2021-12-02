import {exampleArray, inputArray} from './day23Input'
export async function script1(useExample: boolean) {
    const usedInput = useExample ? exampleArray : inputArray;
    let _res 
    _res = run(usedInput,100);
    return _res;
}
export async function script2(useExample: boolean) {
    const usedInput = useExample ? exampleArray : inputArray;
    let _res 
    _res = run2(usedInput,10000000,1000001);
    return _res;
}

function run(inputArray,turns) {
    let array = inputArray.slice(0);
    let turnCounter = 0;
    let pointer = 0;
    do {
        let {newArray} = playTurn(array,pointer)
        array = newArray;
        turnCounter++;
    } while (turnCounter < turns)
    let indexOf1 = array.findIndex(ele=>ele===1);
    array = rotateTo(array,indexOf1);
    array.shift();
    let reducer = (accumulator, currentValue) => accumulator + currentValue;
    return array.reduce(reducer,'');

}


function playTurn(array,pointer) {
    let designated = array[pointer];
    let pickedUp = array.splice(pointer+1,3)
    let {nextIndex,next} = findPlacementIndex(array,designated);
    array.splice.apply(array, [nextIndex+1, 0].concat(pickedUp));
    array = rotateTo(array,1);
    return {newArray: array};
}

function findPlacementIndex(array,startingValue) {

    let should = true;
    let val = startingValue-1;
    let indexFound;
    let x = 0;
    do {
        if(val === 0) { 
            val = 9
        }
        indexFound = array.findIndex(ele=>ele===val);
        
        if(indexFound !== -1) {
            return {nextIndex: indexFound, next: val};
        }
        val--;
        x++;
    } while(should && x<1000);
}

function arrayRotate(arr, reverse) {
    if (reverse) arr.unshift(arr.pop());
    else arr.push(arr.shift());
    return arr;
}

function rotateTo(array,index){
    for (var i=0; i<index; i++) {
        array = arrayRotate(array, false);
    }
    return array;
}

function run2(inputArray,turns,length = 10) {
    let array = Array.from(Array(length).keys())
    array = array.slice(10);
    array = inputArray.concat(array);
    let valueToItem = new Map();
    let last = {value: array[array.length-1]}
    valueToItem.set(array[array.length-1],last);
    let temp = last;
    for (let i =  array.length-2; i >=0; i--) {
        //create Item
        let item = {
            value: array[i],
            next: temp,
        };
        temp = item;
        valueToItem.set(array[i],item);
        if(i === 0) { 
            valueToItem.get(array[array.length-1]).next = item;
        }
    }

    let current = valueToItem.get(array[0]);
    let turnCounter = 0;
    do {
        playTurn2(current,valueToItem)
        current = current.next;
        turnCounter++;
    } while (turnCounter < turns)
    return valueToItem.get(1).next.value*valueToItem.get(1).next.next.value;
}

function playTurn2(current,valueToItem) {
    let section = delinkSection(current,3)
    let insertItem = findInsertValue(current,valueToItem,section.delinkedValues);
    insertSection(insertItem,section);
}

function delinkSection(from,n) {
    let firstDelinked = from.next;
    let lastDelinked = firstDelinked;
    let delinkedValues = [firstDelinked.value];
    for (let i = 0; i < n-1; i++) {
        lastDelinked = lastDelinked.next;
        delinkedValues.push(lastDelinked.value);
    }
    from.next = lastDelinked.next
    return {first: firstDelinked, last: lastDelinked, delinkedValues};
}

function insertSection(from,section){
    let end = from.next
    from.next = section.first
    section.last.next = end;
}


function findInsertValue(current,valueToItem,delinkedValues) {
    let should = true;
    let val = current.value-1;
    let x = 0;
    do {
        if(val === 0) { 
            val = valueToItem.size;
        }        
        if(!delinkedValues.includes(val)) {
            return valueToItem.get(val);
        }
        val--;
        x++;
    } while(should && x<1000);
}