import {exampleArray, inputArray} from './day4Input'
import { transposeMatrix } from '../../../utils/utils';
export async function script1(useExample: boolean) {
    const usedInput = useExample ? exampleArray : inputArray;
    let _res 
    _res = run(usedInput.slice(0));
    return _res;
}
export async function script2(useExample: boolean) {
    const usedInput = useExample ? exampleArray : inputArray;
    let _res 
    _res = run2(usedInput.slice(0));
    return _res;
}

const run = (array: any[]) => {
    const numbers = array.shift()[0][0].split(',');
    let posArray = createPos(array)
    let winIndex = -1;
    let currentNumber
    while (numbers.length > 0 && winIndex === -1) {
        currentNumber = numbers.shift();
        posArray = markNumber(posArray,currentNumber);
        winIndex = checkForWinners(posArray);
    }
    let winnerBoard = posArray[winIndex];
    let winner = winnerBoard.slice(0,5);

    return getResult(winner,currentNumber);
    
}

const run2 = (array: any[]) => {
    const numbers = array.shift()[0][0].split(',');
    let posArray = createPos(array)
    let currentNumber
    let winIndex = -1;
    while (numbers.length > 0 && posArray.length >= 1 && winIndex === -1) {
        currentNumber = numbers.shift();
        posArray = markNumber(posArray,currentNumber);
        if (posArray.length > 1) {removeWinners(posArray);} else {
            winIndex = checkForWinners(posArray);
        }
    }
    let winnerBoard = posArray[0];
    let winner = winnerBoard.slice(0,5);
    return getResult(winner,currentNumber);
    
}

const markNumber = (posArray, markedNumber:string) => {
    let newPosArray = posArray.map(board => {
        let newBoard =  board.map(line=>{
            let newLine =  line.map(number=>{
                if(number === markedNumber){
                    return 'X';
                } else {
                    return number
                }
        })
        return newLine
    })
    return newBoard;
})
return newPosArray;
};

const checkForWinners = (posArray) => {
    return posArray.findIndex(checkBoardForWinners);
}

const checkBoardForWinners = (boardPos) => {
    return boardPos.some(line=>
    line.join('').includes('XXXXX'))
}

const getResult = (winnerArray,lastNumber) => {
    const reducer = (accumulator, currentValue) => accumulator + currentValue
    let acc = 0;
    let lines = winnerArray.map(el=>el.map(el=>el.replace(/X/g, '0')).map(Number)).map(line => line.reduce(reducer))
    return lines.reduce(reducer)*lastNumber
}

const removeWinners = (posArray) => {
    let found 
    do {
        found = checkForWinners(posArray);
        found >= 0 && posArray.splice(found,1);
    } while (found >= 0);

}

const createPos = (array) => {
    return array.map(board=>{
        let pos = [];
        board.forEach(line=>{
            pos.push(line);
        })
        let transposedArray = transposeMatrix(board, board[0].length);
        transposedArray.forEach(line=>{
            pos.push(line);
        })
        return pos;
    })
}