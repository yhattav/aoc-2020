
    import {exampleArray, inputArray} from './day12input'
    import {findPosibilities,getValueAt} from '../../../utils/mazeUtils'
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

export const run = (input) => {
    /*split each string in input to individual character */
    let inputArray = input.map((str) => str.split(''));
    /* find the i,j position of S and E in inputArray */
    let [iStart, jStart] = findPosition(inputArray, 'S');
    let [iEnd, jEnd] = findPosition(inputArray, 'E');
    /* starting at S, find the shortest path to E */
    return findShortestPath(inputArray, [iStart, jStart], [iEnd, jEnd]);

}

const findPosition = (inputArray, char) => {
    for (let i = 0; i < inputArray.length; i++) {
        for (let j = 0; j < inputArray[i].length; j++) {
            if (inputArray[i][j] === char) {
                return [i, j];
            }
        }
    }
}

const findShortestPath = (inputArray, start, end) => {
    let shortestPath = 0;
    let visited = new Map();
    /* find posibilities from start */
    recursiveFindShortestPath(inputArray, start, end, visited, shortestPath);
    return visited.get(end.join(','));
    // /*for each possibility in possibilities, add 
    }

    const recursiveFindShortestPath = (inputArray, start, end, visited, shortestPath) => {
        let currentHeight = getValueAt(inputArray, start)
        let possibilities = findPosibilities(inputArray,start, (val)=>{
            // console.log(val && (currentHeight.charCodeAt(0)-val.charCodeAt(0)<=1)); 
            if(val === 'E') {
                if(currentHeight === 'z') {
                    return true;
                } else {
                    return false;
                }
            }
            return val && ((currentHeight === 'S' &&  val === 'a') ||  (currentHeight.charCodeAt(0)-val.charCodeAt(0)>=-1))
        });
        possibilities.forEach((pos)=>{
            // console.log(getValueAt(inputArray,pos))
            // if(pos.join(',') === end.join(',')) debugger;
            let currentMinVisitedVal = visited.get(pos.join(','))
            if(!currentMinVisitedVal || currentMinVisitedVal>=shortestPath+1) {
                if(pos.join(',') === end.join(',')) console.log('assigning', shortestPath+1, 'to', pos.join(','), currentMinVisitedVal , currentMinVisitedVal, shortestPath);
                visited.set(pos.join(','),shortestPath+1);
                if(pos.join(',') === end.join(',')) {
                    shortestPath++;
                    return shortestPath;
                } else {
                    shortestPath++;
                    return recursiveFindShortestPath(inputArray, pos, end, visited, shortestPath);
                }
            } else {
                //console.log(visited.size)
            }
        }
        )
        return 
    }
