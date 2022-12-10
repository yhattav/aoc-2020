
    import { createMatrix } from '../../../utils/utils';
import {exampleArray, inputArray} from './day10input'
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
    /* create a commands array which is a duplicate of the input */
    let commands = input.slice();
    /* while cycle is smaller than 1000 */
    let cycle = 0;
    let X = 1;
    let active = [];
    let register = [];
    let screen = createMatrix(6,40,'.');
    let currentPixelIndex = 0;
    let currentRow = 0;
    while(commands.length > 0 || active.length > 0) {
        /* current pixel index is the remainder of the cycle divided by 40 */
        currentPixelIndex = cycle % 40;
        /* current row is the cycle devided by 40 */
        currentRow = Math.floor(cycle / 40);
        /* if currentPixel index is within one of X set '#' in the screen by current row and pixel */
        if(Math.abs(currentPixelIndex - X) <= 1) {
            screen[currentRow][currentPixelIndex] = '#';
        }
        cycle++;
        /* if the cycle is 20 and every 40 after that, add an element to register with the cycle and the value of X */
        if(cycle === 20 || (cycle-20) % 40 === 0) {
            register.push([cycle, X])
        }
        if(active.length > 0) {
            X+= active.shift() || 0;
            continue;
        } 

        /* read the first command in the commands array */
        let commandString = commands.shift();
        /* if the command equals 'noop' do nothing */
        if(commandString === 'noop') {
            continue;
        } 
        const [command, number] = parseCommand(commandString);
        if(command === 'addx') {
            active = active.concat([number])
        }
    }
    console.log(screen)
    /* return a sum of the multiplication of cycle and value of X in each element of register array */
    return register.reduce((acc, curr) => {
        return acc + (curr[0] * curr[1])
    }, 0)
}

    const parseCommand = (commandString) => {
        const [command, number] = commandString.split(' ');
        return [command, parseInt(number)];
    }