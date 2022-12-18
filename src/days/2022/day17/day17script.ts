
    import {exampleArray, inputArray} from './day17input'
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


const blocks = [
    [
    '..####.'.split(''),
    '.......'.split(''),
    '.......'.split(''),
    '.......'.split('')
],
    [
    '...#...'.split(''),
    '..###..'.split(''),
    '...#...'.split(''),
    '.......'.split(''),
    '.......'.split(''),
    '.......'.split('')],
    [
    '....#..'.split(''),
    '....#..'.split(''),
    '..###..'.split(''),
    '.......'.split(''),
    '.......'.split(''),
    '.......'.split('')],
    [
    '..#....'.split(''),
    '..#....'.split(''),
    '..#....'.split(''),
    '..#....'.split(''),
    '.......'.split(''),
    '.......'.split(''),
    '.......'.split('')],
    [
    '..##...'.split(''),
    '..##...'.split(''),
    '.......'.split(''),
    '.......'.split(''),
    '.......'.split('')],
    ]

export const run = (input) => {
    let blockCounter = 0;
    let toggle = true;
    let map = [];
    let touched = false;
    while (blockCounter < 2022) {
        let block = blocks.shift();
        blocks.push(block);
        // // console.log(block);
        /* make a 2d copy of block */
        let blockCopy = [];
        for (let i = 0; i < block.length; i++) {
            blockCopy[i] = [];
            for (let j = 0; j < block[0].length; j++) {
                blockCopy[i][j] = block[i][j];
            }
        }
        map = [...blockCopy,...map];
        // // console.log(map)
        blockCounter++;
        // // console.log(blockCounter);
        touched = false;
        while (!touched) {
            let mapCopy = [];
            for (let i = 0; i < map.length; i++) {
                mapCopy[i] = [];
                for (let j = 0; j < map[0].length; j++) {
                    mapCopy[i][j] = map[i][j];
                }
            }
            if(toggle) {  //horizontal
                try {
                        /* take the first element in input, save it to a variable, then push it to the end of the array */
                    let command = input.shift();
                    input.push(command);
                    /* move all the #s in the array one step to the direction of the command*/
                    if (command === '<') {
    
                        /* working from down check if all the #s can move down */
                        for (let j = 0; j < mapCopy[0].length; j++) {
                            for (let i = 0; i < mapCopy.length; i++) {
                                if (mapCopy[i][j] === '#') {
                                    if(j - 1 < 0) throw new Error('out of bounds <')
                                    if(mapCopy[i][j - 1] !== '.') throw new Error('cant move <')
                                    mapCopy[i][j - 1] = '#';
                                    mapCopy[i][j] = '.';
                                }
                            }
                        }
                        for (let j = 0; j < map[0].length; j++) {
                            for (let i = 0; i < map.length; i++) {
                                if (map[i][j] === '#') {
                                    map[i][j - 1] = '#';
                                    map[i][j] = '.';
                                }
                            }
                        }
                    } else if (command === '>') {
                        for (let j = mapCopy[0].length - 1; j >= 0; j--) {
                            for (let i = 0; i < mapCopy.length; i++) {
                                if (mapCopy[i][j] === '#') {
                                    if(j + 1 > mapCopy[0].length - 1) throw new Error('out of bounds >')
                                    if(mapCopy[i][j + 1] !== '.') throw new Error('cant move >')
                                    mapCopy[i][j + 1] = '#';
                                    mapCopy[i][j] = '.';
                                }
                            }
                        }
                        for (let j = map[0].length - 1; j >= 0; j--) {
                            for (let i = 0; i < map.length; i++) {
                                if (map[i][j] === '#') {
                                    map[i][j + 1] = '#';
                                    map[i][j] = '.';
                                }
                            }
                        }
                    }
                } catch (error) {
                    // // //console.log(error);
                }
            } else { //vertical
                try {

                    /* working from down check if all the #s can move down */
                    for (let i = mapCopy.length - 1; i >= 0; i--) {
                        for (let j = 0; j < mapCopy[0].length; j++) {
                            if (mapCopy[i][j] === '#') {
                                if(i + 1 > mapCopy.length - 1) {throw new Error('hit the actual floor')}
                                if(mapCopy[i + 1][j] !== '.') {throw new Error('cant move down')}
                                mapCopy[i + 1][j] = '#';
                                mapCopy[i][j] = '.';
                            }
                        }
                    }
                    /* move all the #s down */
                    for (let i = map.length - 1; i >= 0; i--) {
                        for (let j = 0; j < map[0].length; j++) {
                            if (map[i][j] === '#') {
                                map[i + 1][j] = '#';
                                map[i][j] = '.';
                            }
                        }
                    }
                } catch (error) {
                    // // //console.log(error);
                    touched = true;
                }
        }
        // // // console.log(map.map(el=>el.join('')))
        toggle= !toggle;
        }
        /* solidify all the #s as @s */
        for (let i = 0; i < map.length; i++) {
            for (let j = 0; j < map[0].length; j++) {
                if (map[i][j] === '#') {
                    map[i][j] = '@';
                }
            }
        }
        /* remove any lines with only .s */
        map = map.filter(el=>el.some(el=>el === '@'))
        // // console.log(map.map(el=>el.join('')))
    }
    // console.log(map.map(el=>el.join('')))

    return map.length
}
export const run2 = (input) => {
    let step = 0;
    let blockCounter = 0;
    let toggle = true;
    let map = [];
    let touched = false;
    let foundRep = false;
    let total = 0;
    const jetsLength = input.length
    while (blockCounter < 1600 || foundRep) {
        let block = blocks.shift();
        blocks.push(block);
        // // console.log(block);
        /* make a 2d copy of block */
        let blockCopy = [];
        for (let i = 0; i < block.length; i++) {
            blockCopy[i] = [];
            for (let j = 0; j < block[0].length; j++) {
                blockCopy[i][j] = block[i][j];
            }
        }
        map = [...blockCopy,...map];
        // // console.log(map)
        blockCounter++;
        // // console.log(blockCounter);
        touched = false;
        while (!touched) {
            let mapCopy = [];
            for (let i = 0; i < map.length; i++) {
                mapCopy[i] = [];
                for (let j = 0; j < map[0].length; j++) {
                    mapCopy[i][j] = map[i][j];
                }
            }
            if(toggle) {  //horizontal
                try {
                        /* take the first element in input, save it to a variable, then push it to the end of the array */
                    let command = input.shift();
                    input.push(command);
                    step++;
                    /* move all the #s in the array one step to the direction of the command*/
                    if (command === '<') {
    
                        /* working from down check if all the #s can move down */
                        for (let j = 0; j < mapCopy[0].length; j++) {
                            for (let i = 0; i < mapCopy.length; i++) {
                                if (mapCopy[i][j] === '#') {
                                    if(j - 1 < 0) throw new Error('out of bounds <')
                                    if(mapCopy[i][j - 1] !== '.') throw new Error('cant move <')
                                    mapCopy[i][j - 1] = '#';
                                    mapCopy[i][j] = '.';
                                }
                            }
                        }
                        for (let j = 0; j < map[0].length; j++) {
                            for (let i = 0; i < map.length; i++) {
                                if (map[i][j] === '#') {
                                    map[i][j - 1] = '#';
                                    map[i][j] = '.';
                                }
                            }
                        }
                    } else if (command === '>') {
                        for (let j = mapCopy[0].length - 1; j >= 0; j--) {
                            for (let i = 0; i < mapCopy.length; i++) {
                                if (mapCopy[i][j] === '#') {
                                    if(j + 1 > mapCopy[0].length - 1) throw new Error('out of bounds >')
                                    if(mapCopy[i][j + 1] !== '.') throw new Error('cant move >')
                                    mapCopy[i][j + 1] = '#';
                                    mapCopy[i][j] = '.';
                                }
                            }
                        }
                        for (let j = map[0].length - 1; j >= 0; j--) {
                            for (let i = 0; i < map.length; i++) {
                                if (map[i][j] === '#') {
                                    map[i][j + 1] = '#';
                                    map[i][j] = '.';
                                }
                            }
                        }
                    }
                } catch (error) {
                    // // //console.log(error);
                }
            } else { //vertical
                try {

                    /* working from down check if all the #s can move down */
                    for (let i = mapCopy.length - 1; i >= 0; i--) {
                        for (let j = 0; j < mapCopy[0].length; j++) {
                            if (mapCopy[i][j] === '#') {
                                if(i + 1 > mapCopy.length - 1) {throw new Error('hit the actual floor')}
                                if(mapCopy[i + 1][j] !== '.') {throw new Error('cant move down')}
                                mapCopy[i + 1][j] = '#';
                                mapCopy[i][j] = '.';
                            }
                        }
                    }
                    /* move all the #s down */
                    for (let i = map.length - 1; i >= 0; i--) {
                        for (let j = 0; j < map[0].length; j++) {
                            if (map[i][j] === '#') {
                                map[i + 1][j] = '#';
                                map[i][j] = '.';
                            }
                        }
                    }
                } catch (error) {
                    // // //console.log(error);
                    touched = true;
                }
        }
        // // // console.log(map.map(el=>el.join('')))
        toggle= !toggle;
        }
        /* solidify all the #s as @s */
        for (let i = 0; i < map.length; i++) {
            for (let j = 0; j < map[0].length; j++) {
                if (map[i][j] === '#') {
                    map[i][j] = '@';
                }
            }
        }
        /* remove any lines with only .s */
        map = map.filter(el=>el.some(el=>el === '@'))
        if(map[0].every(el=>el === '@')) {
            if(step % jetsLength === 0) debugger;
            if(blockCounter % 5 === 0) {

                debugger
            }
            console.log(blockCounter, total + map.length)
        }
        /* if map.length > 20 remove the bottom 10 lines */
        if(map.length >= 100) {
            // console.log(map.length, total)
            total += map.length-80;
            map = map.slice(0,80)
            // console.log(map.length, total)
        }

        /* log the blocksCounter / map legth */
        // console.log(blockCounter, map.length, blockCounter / map.length)


        /* find if the first half of map is teh same a the 2nd half */
        // this following thing was a bust
        // if(map.length > 10) {
        //     let firstHalf = map.slice(0,Math.floor(map.length/2))
        //     let secondHalf = map.slice(Math.floor(map.length/2))
        //     if(firstHalf.every((el,i)=>el.join('') === secondHalf[i].join(''))) {
        //         foundRep = true;
        //         debugger;
        //     }
        // }
        // // console.log(map.map(el=>el.join('')))
    }
    // console.log(map.map(el=>el.join('')))

    return map.length + total;
}
/*----------------------------------------------------------------
console.log((1000000000000)/ 1725) 

console.log(2425+579710144*2630)
*/