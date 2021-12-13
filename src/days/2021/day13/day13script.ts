import {exampleArray, inputArray} from './day13Input'
import {createMatrix} from '../../../utils/utils'
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
    let {grid, folds} = parseInput(input)
    let nextFold;
    while(folds.length > 0) {
        nextFold = folds.shift();
        grid = foldIt(grid,nextFold)
    }
    let [I,J] = measureGrid(grid);
    let map = createMatrix(I+1,J+1,'');

    grid.forEach(hole=>{
        map[hole[0]][hole[1]] = '#'
    })
    return map;
}

const run = (input) => {
    let {grid, folds} = parseInput(input)
    let newGrid = foldIt(grid,folds[0])
    let stringGrid = newGrid.map(el=>el.join(','));
    let unique = [...new Set(stringGrid)];
    return unique.length;
}



const foldIt = (grid,foldInst)=> {
    let [foldDir,foldVal] = parseInst(foldInst)
    let newGrid = grid.map(hole=>{
        let i = hole[0];
        let j = hole[1];
        if (foldDir === 'vertical'){
            i = getNewVal(i,foldVal);
            return [i,j];
        } else {
            j = getNewVal(j,foldVal);
            return [i,j];

        }
    }
        
        )
        return newGrid
    }



const measureGrid = (grid) =>{
    let i=0;
    let j=0;
    grid.forEach(hole=>{
        i = i < hole[0] ? hole[0] : i
        j = j < hole[1] ? hole[1] : j
    })
    return [i,j]
}

const getNewVal = (val,foldVal) => {
    if (foldVal < val) {
        let diff = val - foldVal;
        return foldVal - diff;
    }
    return val;
}

const parseInst = (inst) => {
    let instDir = inst.includes('y=') ? 'vertical' : 'horizontal';
    let instVal = inst.split('=').map(Number)[1]
    return [instDir,instVal]
}

const parseInput= (input) =>{
    let separatorIndex = input.findIndex(el=>el==='');
    let grid = input.slice(0,separatorIndex).map(el=>el.split(',').map(Number).reverse());
    let folds = input.slice(separatorIndex+1);
    return {grid,folds};
}