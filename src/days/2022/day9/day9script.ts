
    import {exampleArray, inputArray} from './day9input'
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

export const run = (input) => {
    console.log(input)
    let i = 1000;
    let j = 1000;
    const map = createMatrix(i,j,'.');
    let start = [i/2,j/2];
    let currentH = start.slice();
    let currentT = start.slice();
    map[currentT[0]][currentT[1]] = 'T';
    let sizeEstimation =  {i:0,j:0};
    let maxI = 0;
    let maxJ = 0;
    let commands = [];
    /* for each element in the input push the first element into commands the amount of times in the second element */
    input.map((command)=>{
        for(let i = 0; i < command[1]; i++) {
            switch(command[0]) {
                case 'R':
                    sizeEstimation.j++
                    break;
                case 'L':
                    sizeEstimation.j--
                    break;
                case 'U':
                    sizeEstimation.i++
                    break;
                case 'D':
                    sizeEstimation.i--
                    break;
            }
            maxI = Math.max(maxI, Math.abs(sizeEstimation.i));
            maxJ = Math.max(maxJ, Math.abs(sizeEstimation.j));
            commands.push(command[0]);
        }
    }
    )
    // console.log(maxI,maxJ,sizeEstimation, commands)
    /* starting at the starting position, for each command in commands, move currentH in the direction of the command */
    commands.map((command)=>{
        if(command === 'U') debugger;
        console.log(command)
        switch(command) {
            case 'R':
                currentH[1]++;
                // currentT[1]++;
                break;
            case 'L':
                currentH[1]--;
                // currentT[1]--;
                break;
            case 'U':
                currentH[0]--;
                // currentT[0]--;
                break;
            case 'D':
                currentH[0]++;
                // currentT[0]++;
                break;
            }
            //map[currentH[0]][currentH[1]] = 'H';
        /*if currentT is not adjacent to currentH, move currentT in the direction of currentH */
        while(!isAdjacent(currentH,currentT)) {
            if(currentT[0] > currentH[0]) {
                currentT[0]--;
            } if(currentT[0] < currentH[0]) {
                currentT[0]++;
            } if(currentT[1] > currentH[1]) {
                currentT[1]--;
            } if(currentT[1] < currentH[1]) {
                currentT[1]++;
            }
            map[currentT[0]][currentT[1]] = 'T';
        }
        console.log(map);
    }
    )
    /* for each element in the map, if it is a T, count it */
    let count = 0;
    map.map((row)=>{
        row.map((element)=>{
            if(element === 'T') {
                count++;
            }
        })
    }
    )
    return count;
}
export const run2 = (input) => {
    console.log(input)
    let i = 1000;
    let j = 1000;
    const map = createMatrix(i,j,'.');
    let start = [i/2,j/2];
    let rope = [
        [i/2,j/2],
        [i/2,j/2],
        [i/2,j/2],
        [i/2,j/2],
        [i/2,j/2],
        [i/2,j/2],
        [i/2,j/2],
        [i/2,j/2],
        [i/2,j/2],
        [i/2,j/2],
    ]

    // console.log(rope)
    map[rope[9][0]][rope[9][1]] = 'T';
    let commands = [];
    /* for each element in the input push the first element into commands the amount of times in the second element */
    input.map((command)=>{
        for(let i = 0; i < command[1]; i++) {
            commands.push(command[0]);
        }
    }
    )
    /* for each command in commands, move the first element in the rope in the direction of the command */
    commands.map((command)=>{
        switch(command) {
            case 'R':
                rope[0][1]++;
                break;
            case 'L':
                rope[0][1]--;
                break;
            case 'U':
                rope[0][0]--;
                break;
            case 'D':
                rope[0][0]++;
                break;
            }
        /* for each element in the rope, if it is not adjacent to the element before it, move it in the direction of the element before it */
        rope.map((element, index)=>{
            if(index === 0) { return;}
            while(!isAdjacent(rope[index-1],element)) {
                if(element[0] > rope[index-1][0]) {
                    element[0]--;
                } if(element[0] < rope[index-1][0]) {
                    element[0]++;
                } if(element[1] > rope[index-1][1]) {
                    element[1]--;
                } if(element[1] < rope[index-1][1]) {
                    element[1]++;
                }
                // map[element[0]][element[1]] = (index)+'';
                if(index === 9) {
                    map[element[0]][element[1]] = 'T';
                }
            }
        }
        )
        // console.log(map);
        // debugger;
    })
    console.log(map);
    /* for each element in the map, if it is a T, count it */
    let count = 0;
    map.map((row)=>{
    row.map((element)=>{
        if(element === 'T') {
            count++;
        }
    })
    }
    )
    return count;
}

const isAdjacent = (pos1:number[], pos2:number[]):boolean => {
    /* return true if the two positions are adjacent horizontally, vertically or diagonally */
    // console.log(pos1,pos2)
    // console.log((Math.abs(pos1[0] - pos2[0]) <= 1 , Math.abs(pos1[1] - pos2[1]) <= 1))

    return (Math.abs(pos1[0] - pos2[0]) <= 1 && Math.abs(pos1[1] - pos2[1]) <= 1)
}