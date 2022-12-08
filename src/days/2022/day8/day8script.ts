
    import {exampleArray, inputArray} from './day8input'
    import {deepCopyMultiDimensionalArray} from '../../../utils/utils'
    import {
        getValueAt,
        getPositionAt,
        protectedGetValueAt,
        findPosibilities, // not battle hardened yet
        isValidPosition,
    } from '../../../utils/mazeUtils'
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
    
    export const run = (input) => {
        let map = deepCopyMultiDimensionalArray(input);
    // console.log(getVisibility([1,2],map))
        /* count visible trees */
        let visibleTrees = 0;
        for(let i = 0; i < map.length; i++) {
            for(let j = 0; j < map[0].length; j++) {
                    if(getVisibility([i,j],map)) visibleTrees++;
                
            }
        }
        return visibleTrees;
    // console.log(isVisibleFromVertical([1,2],[0,2],map))
    }
    
    const isVisibleFromVertical = (tree:[number,number], looker:[number,number], map) => {
        let treeHeight = getValueAt(map,tree)
        let [i,j] = looker;
        let [ti,tj] = tree;
        // let [di,dj] = [ti-i,tj-j];
        let stepi = (i>ti) ? -1:1;
        let [ii,jj] = [i,j];
        while(
            ii !== ti  
            // || jj !== tj
            ) {
            // console.log(getValueAt(map, [ii,jj]))
            if(getValueAt(map, [ii,jj]) >= treeHeight) return false;
            ii+=stepi;
            // jj+=stepj;
        }
        return true;
    }
    const isVisibleFromHorizontal = (tree:[number,number], looker:[number,number], map) => {
        let treeHeight = getValueAt(map,tree)
        let [i,j] = looker;
        let [ti,tj] = tree;
        // let [di,dj] = [ti-i,tj-j];
        let stepj = (j>tj) ? -1:1;
        let [ii,jj] = [i,j];
        while(
            // ii !== ti || 
            jj !== tj
            ) {
            // console.log(getValueAt(map, [ii,jj]))
            if(getValueAt(map, [ii,jj]) >= treeHeight) return false;
            // ii+=stepi;
            jj+=stepj;
        }
        return true;
    }
    
    const getVisibility = (tree:[number,number], map:[][]) => {
        let isVisibleLeft = isVisibleFromHorizontal(tree,[tree[0],0],map)
        let isVisibleRight = isVisibleFromHorizontal(tree,[tree[0],map[0].length-1],map)
        let isVisibleTop = isVisibleFromVertical(tree,[0,tree[1]],map)
        let isVisibleDown = isVisibleFromVertical(tree,[map.length-1,tree[1]],map)
        // console.log('tree', tree, {isVisibleLeft, isVisibleRight, isVisibleTop, isVisibleDown})
        return isVisibleLeft || isVisibleRight || isVisibleTop || isVisibleDown;
        // return isVisibleRight;
        // console.log(isVisibleFromHorizontal([1,2],[1,4],map))
        // console.log(isVisibleFromVertical([1,2],[0,2],map))
    }
    
    const getVisibleLeft = (tree:[number,number], map:[][]) => {
        /* count the visible trees in each direction from tree*/
        let treeHeight = getValueAt(map,tree)
        let visibleTrees = 0;
        let [i,j] = tree;
        let dj =-1
        let [ii,jj] = getPositionAt([i,j], 'left')
        while(isValidPosition(map,[ii,jj])) {
            if(getValueAt(map, [ii,jj]) < treeHeight) {
                visibleTrees++
            } else {
                visibleTrees++
                jj=Infinity
            };
            // ii+=di;
            jj+=dj;
        }
        return visibleTrees;
    
    
    }
    const getVisibleRight = (tree:[number,number], map:[][]) => {
        /* count the visible trees in each direction from tree*/
        let treeHeight = getValueAt(map,tree)
        let visibleTrees = 0;
        let [i,j] = tree;
        let dj =1
        let [ii,jj] = getPositionAt([i,j], 'right')
        while(isValidPosition(map,[ii,jj])) {
            if(getValueAt(map, [ii,jj]) < treeHeight) {
                visibleTrees++
            } else {
                visibleTrees++
                jj=Infinity
            };
            // ii+=di;
            jj+=dj;
        }
        return visibleTrees;
    }
    const getVisibleTop = (tree:[number,number], map:[][]) => {
        /* count the visible trees in each direction from tree*/
        let treeHeight = getValueAt(map,tree)
        let visibleTrees = 0;
        let [i,j] = tree;
        let di = -1
        let [ii,jj] = getPositionAt([i,j], 'up')
        while(isValidPosition(map,[ii,jj])) {
            if(getValueAt(map, [ii,jj]) < treeHeight) {
                visibleTrees++
            } else {
                visibleTrees++
                ii=Infinity
            };
            ii+=di;
            // jj+=dj;
        }
        return visibleTrees;
    }
    const getVisibleDown = (tree:[number,number], map:[][]) => {
        /* count the visible trees in each direction from tree*/
        let treeHeight = getValueAt(map,tree)
        let visibleTrees = 0;
        let [i,j] = tree;
        let di = 1
        let [ii,jj] = getPositionAt([i,j], 'down')
        while(isValidPosition(map,[ii,jj])) {
    
            if(getValueAt(map, [ii,jj]) < treeHeight) {
                visibleTrees++
            } else {
                visibleTrees++
                ii=Infinity
            };
            ii+=di;
            // jj+=dj;
        }
        return visibleTrees;
    }
    
    const calcScoreForTree = (tree:[number,number], map:[][])=> {
        return getVisibleDown(tree,map) * getVisibleTop(tree,map) * getVisibleLeft(tree,map) * getVisibleRight(tree,map)
    }
    
    export const run2 = (input) => {
        let map = deepCopyMultiDimensionalArray(input);
    
        /* find the position with the highest score */
        let highestScore = 0;
        let highestScorePosition = [0,0];
        for(let i=0; i<map.length; i++) {
            for(let j=0; j<map[i].length; j++) {
                let score = calcScoreForTree([i,j], map);
                if(score > highestScore) {
                    highestScore = score;
                    highestScorePosition = [i,j];
                }
            }
        }
        return highestScore;
    }
    