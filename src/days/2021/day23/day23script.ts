import {exampleArray, inputArray} from './day23Input'
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
    _res = run(usedInput);
    return _res;
}
const costMap = {
    A:1,
    B:10,
    C:100,
    D:1000,
}
let cache;
let max;
const run = (input) => {
    cache = new Map();
    max = Infinity;
    let arrayRep = deepCopyMultiDimensionalArray(input);
    arrayRep.unshift(new Array(7).fill(''));
    step(arrayRep,0);
    console.log(max);
    return max;
}

const step = (arrayRepresentation,cost) => {
    let stringRep = stringify(arrayRepresentation);
    // console.log({stringRep, cost})
    const cached = cache.get(stringRep);
    if (cost >= max) return;
    if(!cached) {
        cache.set(stringRep,cost);
    } else {
        if(cached <= cost) {
            return;
        } else {
            cache.set(stringRep,cost);
        }
    }
    
    if(stringRep === ',,,,,,|A,B,C,D|A,B,C,D') {
        max = cost;
        console.log(cost)
    }
    const elements:IElementsList = getStructureFromArray(arrayRepresentation);
    let possibilities = findPossibilities(elements);
    if (possibilities.length === 0) {
        return
    }
    // console.log(possibilities);
    // possibilities = possibilities.sort((a, b) => a.cost - b.cost)
    for (const pos of possibilities) {
        const newArrayRep = getNewArrayRep(arrayRepresentation,pos);
        const newCost = cost+pos.cost;
        step(newArrayRep,newCost)
    }
}

const getNewArrayRep = (arrayRepresentation,possibility) => {
    let newRep = deepCopyMultiDimensionalArray(arrayRepresentation);
    let [fromI,fromJ] = possibility.from.rep;
    let [toI,toJ] = possibility.to.rep;
    newRep[toI][toJ] = arrayRepresentation[fromI][fromJ];
    newRep[fromI][fromJ] = '';
    return newRep;
}

interface IElementsList {
    A0:ILinkedElement;
    A1:ILinkedElement;
    B0:ILinkedElement;
    B1:ILinkedElement;
    C0:ILinkedElement;
    C1:ILinkedElement;
    D0:ILinkedElement;
    D1:ILinkedElement;
    cor0:ILinkedElement;
    cor1:ILinkedElement;
    cor2:ILinkedElement;
    cor3:ILinkedElement;
    cor4:ILinkedElement;
    east:ILinkedElement;
    west:ILinkedElement;
}

interface ILinkedElement {
    content: string;
    connections: [] | [ILinkedElement,number];
    restrictions: [] | string[];
    rep: [number,number];
    key: string;
    satisfied: boolean;
    isCell: boolean;
}

const getStructureFromArray = (inputArray):IElementsList => {
    const west:ILinkedElement = {
        content: '',
        connections: [],
        restrictions: [],
        rep: [0,0],
        key: 'west',
        satisfied: false,
        isCell: false,
    }
    const cor0:ILinkedElement = {
        content: '',
        connections: [],
        restrictions: [],
        rep: [0,1],
        key: 'cor0',
        satisfied: false,
        isCell: false,

    }
    const cor1:ILinkedElement = {
        content: '',
        connections: [],
        restrictions: [],
        rep: [0,2],
        key: 'cor1',
        satisfied: false,
                isCell: false,

    }
    const cor2:ILinkedElement = {
        content: '',
        connections: [],
        restrictions: [],
        rep: [0,3],
        key: 'cor2',
        satisfied: false,
                isCell: false,

    }
    const cor3:ILinkedElement = {
        content: '',
        connections: [],
        restrictions: [],
        rep: [0,4],
        key: 'cor3',
        satisfied: false,
                isCell: false,


    }
    const cor4:ILinkedElement = {
        content: '',
        connections: [],
        restrictions: [],
        rep: [0,5],
        key: 'cor4',
        satisfied: false,
                isCell: false,


    }
    const east:ILinkedElement = {
        content: '',
        connections: [],
        restrictions: [],
        rep: [0,6],
        key: 'east',
        satisfied: false,
                isCell: false,

    }
    const A0:ILinkedElement = {
        content: '',
        connections: [],
        restrictions: ['B','C','D'],
        rep: [1,0],
        key: 'A0',
        satisfied: false,
        isCell: true,

    }
    const A1:ILinkedElement = {
        content: '',
        connections: [],
        restrictions: ['B','C','D'],
        rep: [2,0],
        key: 'A1',
        satisfied: false,
        isCell: true,
    }
    const B0:ILinkedElement = {
        content: '',
        connections: [],
        restrictions: ['A','C','D'],
        rep: [1,1],
        key: 'B0',
        satisfied: false,
        isCell: true,
    }
    const B1:ILinkedElement = {
        content: '',
        connections: [],
        restrictions: ['A','C','D'],
        rep: [2,1],
        key: 'B1',
        satisfied: false,
        isCell: true,

    }
    const C0:ILinkedElement = {
        content: '',
        connections: [],
        restrictions: ['A','B','D'],
        rep: [1,2],
        key: 'C0',
        satisfied: false,
        isCell: true,

    }
    const C1:ILinkedElement = {
        content: '',
        connections: [],
        restrictions: ['A','B','D'],
        rep: [2,2],
        key: 'C1',
        satisfied: false,
        isCell: true,

    }
    const D0:ILinkedElement = {
        content: '',
        connections: [],
        restrictions: ['A','B','C'],
        rep: [1,3],
        key: 'D0',
        satisfied: false,
        isCell: true,
    }
    const D1:ILinkedElement = {
        content: '',
        connections: [],
        restrictions: ['A','B','C'],
        rep: [2,3],
        key: 'D1',
        satisfied: false,
        isCell: true,
    }
    //edges
    createLink(west,cor0,1);
    createLink(east,cor4,1);
    //to rooms
        //A
        createLink(cor0,A0,2);
        createLink(A0,cor1,2);
        //B
        createLink(cor1,B0,2);
        createLink(B0,cor2,2);
        //C
        createLink(cor2,C0,2);
        createLink(C0,cor3,2);
        //D
        createLink(cor3,D0,2);
        createLink(D0,cor4,2);

    //inside rooms
    createLink(A0,A1,1);
    createLink(B0,B1,1);
    createLink(C0,C1,1);
    createLink(D0,D1,1);
    // between corridors
    createLink(cor0,cor1,2);
    createLink(cor1,cor2,2);
    createLink(cor2,cor3,2);
    createLink(cor3,cor4,2);

    west.content = inputArray[0][0];
    cor0.content = inputArray[0][1];
    cor1.content = inputArray[0][2];
    cor2.content = inputArray[0][3];
    cor3.content = inputArray[0][4];
    cor4.content = inputArray[0][5];
    east.content = inputArray[0][6];
    A0.content = inputArray[1][0];
    A1.content = inputArray[2][0];
    B0.content = inputArray[1][1];
    B1.content = inputArray[2][1];
    C0.content = inputArray[1][2];
    C1.content = inputArray[2][2];
    D0.content = inputArray[1][3];
    D1.content = inputArray[2][3];

    if (A1.content === 'A') {
        A1.satisfied = true;
        if(A0.content === 'A') {
            A0.satisfied = true;
        }
    }
    if (B1.content === 'B') {
        B1.satisfied = true;
        if(B0.content === 'B') {
            B0.satisfied = true;
        }
    }
    if (C1.content === 'C') {
        C1.satisfied = true;
        if(C0.content === 'C') {
            C0.satisfied = true;
        }
    }
    if (D1.content === 'D') {
        D1.satisfied = true;
        if(D0.content === 'D') {
            D0.satisfied = true;
        }
    }

    const elements:IElementsList = {
        A0,A1,B0,B1,C0,C1,D0,D1,cor0,cor1,cor2,cor3,cor4,east,west
    }

    return elements
}

const createLink = (node1, node2, dist) => {
    node1.connections.push([node2,dist])
    node2.connections.push([node1,dist])
}

const findPossibilities = (elementsList:IElementsList) => {
    let pos = [];

    for (const element of Object.keys(elementsList)) {

        if (elementsList[element].content === '') continue; //nothing to move there


        if (elementsList[element].satisfied) continue; //hes happy just like that.

        let char = elementsList[element].content;

        if(elementsList[element].key === `${char+0}` && elementsList[`${char+1}`].content === ''){ //just move deeper anyway.
            let to = elementsList[char+1]
            pos = [{
                from: elementsList[element],
                to,
                char,
                cost: costMap[char]
            }]
            return pos;
        }


        for (const connection of elementsList[element].connections) {





            
            if(connection[0].content === '' && (!connection[0].restrictions.includes(char) || element[0] === connection[0].key[0])) { //possible move to it
                if(!elementsList[element].isCell && connection[0].isCell){
                    let bottomOfTheCell = elementsList[`${connection[0].key[0]+1}`];
                    if((!bottomOfTheCell.satisfied && bottomOfTheCell.content !== '')) {continue;}
                }
               //not mooving into your cell if theres still a bogie in the bottom of it
                pos.push({
                    from: elementsList[element],
                    to:connection[0],
                    char,
                    cost: connection[1]*costMap[elementsList[element].content]
                })
            }
        }
    }

    return pos;
}

const getArrayFromStructure = (elementsList:IElementsList) => {
    return [
        [
            elementsList.west.content,
            elementsList.cor0.content,
            elementsList.cor1.content,
            elementsList.cor2.content,
            elementsList.cor3.content,
            elementsList.cor4.content,
            elementsList.east.content
        ],
        [
            elementsList.A0.content,elementsList.B0.content,elementsList.C0.content,elementsList.D0.content,
        ],
        [
            elementsList.A1.content,elementsList.B1.content,elementsList.C1.content,elementsList.D1.content,
        ],
    ]
}

const stringify = (arrayRepresentation) => {
    return arrayRepresentation.map(el=>el.join(',')).join('|');
}

const arrayify = (stringRepresentation) => {
    return stringRepresentation.split('|').map(el=>el.split(','));
}
