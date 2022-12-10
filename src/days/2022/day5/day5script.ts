
import {exampleArray, inputArray} from './day5input'
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
    return parseInput(input);
}
export const run2 = (input) => {
    return parseInput2(input);
}

const parseInput2 = (input) => {
    /* create a new array from the beggining of input up to the element that contains an empty string */
    let stacks = input.slice(0,input.indexOf(''));
    /* create a new array from the element after the empty string to the end of the input */
    const commands = input.slice(input.indexOf('')+1);
    /* log the two arrays */
    console.log(stacks, commands)
    /* reverse the stacks array */
    stacks = stacks.reverse();
    /* split each element in the stacks array into an array of characters */
    stacks = stacks.map((stack)=>stack.split(''));
    /* for each index in the first element of stacks array where there is a number, create a new array with the characters from the rest of the elements in the stacks array at that index */
    stacks[0] = stacks[0].map((char, index)=>{
        if(!isNaN(parseInt(char))) {
            return stacks.map((stack)=>stack[index])
        }
    })
    console.log(stacks)
    /* remove all the undefined elements from the first element of the stacks array */
    stacks[0] = stacks[0].filter((char)=>char !== undefined)
    /*copy the first element in stacks to a new array */
    let gameStacks = stacks[0].slice();
    /* pop elements from each gameStack in gameStacks that are empty strings */
    gameStacks.map((stack)=>{
        while(stack[stack.length-1] === ' ') {
            stack.pop();
        }   
    })
    /* shift each gameStack once */
    gameStacks.map((stack)=>{
        stack.shift();
    })

    // debugger;
    /* for each element in the commands array, split the element into an array of characters */
    commands.map((command, index)=>{
        commands[index] = command.split('');
    })
    /* for each element in the commands array, keep only numbers */
    commands.map((command, index)=>{
        commands[index] = command.filter((char)=>!isNaN(parseInt(char)));
    })


    /* for each element in the commands array, convert each character in the element to a number */
    commands.map((command, index)=>{
        commands[index] = command.map((char)=>parseInt(char));
    })
    /* in commands , subtract 1 from the last element and the one before it */
    commands.map((command, index)=>{
        command[command.length-1] -= 1;
        command[command.length-2] -= 1;
    })

    /* for each element in the commands array,  create an object where key to is the last element, key from is the one bofore it and key amount is the rest of the elements joined together */
    commands.map((command, index)=>{
        commands[index] = {
            to: command[command.length-1],
            from: command[command.length-2],
            amount: Number(command.slice(0,command.length-2).join(''))
        }
    })
    /* for each element in the commands array, create an array where the first element is the amount, the second is the from and the third is the to */
    commands.map((command, index)=>{
        commands[index] = [command.amount, command.from, command.to];
    })
    /* for each command in the commands array, move the amount stated in the first element in the command elemnts from the gameStack at the index stated at the second element to the index stated at the third element*/
    commands.map(([amount, from, to])=>{
        /* move amount elements from the gameStack at from to the game stack at to */
        let clamps = [];

        for(let i = 0; i < amount; i++) {
            clamps.push(gameStacks[from].pop());
        }
        clamps = clamps.reverse();
        gameStacks[to] = gameStacks[to].concat(clamps);
    })

    /* combine a string out of the last character element in each gameStacks element */
    let string = gameStacks.map((stack)=>stack[stack.length-1]).join('');
    /* log the string */
    console.log(string)
    return string;

    /* log the stacks array */
    console.log(gameStacks)
}
const parseInput = (input) => {
    /* create a new array from the beggining of input up to the element that contains an empty string */
    let stacks = input.slice(0,input.indexOf(''));
    /* create a new array from the element after the empty string to the end of the input */
    const commands = input.slice(input.indexOf('')+1);
    /* log the two arrays */
    console.log(stacks, commands)
    /* reverse the stacks array */
    stacks = stacks.reverse();
    /* split each element in the stacks array into an array of characters */
    stacks = stacks.map((stack)=>stack.split(''));
    /* for each index in the first element of stacks array where there is a number, create a new array with the characters from the rest of the elements in the stacks array at that index */
    stacks[0] = stacks[0].map((char, index)=>{
        if(!isNaN(parseInt(char))) {
            return stacks.map((stack)=>stack[index])
        }
    })
    console.log(stacks)
    /* remove all the undefined elements from the first element of the stacks array */
    stacks[0] = stacks[0].filter((char)=>char !== undefined)
    /*copy the first element in stacks to a new array */
    let gameStacks = stacks[0].slice();
    /* pop elements from each gameStack in gameStacks that are empty strings */
    gameStacks.map((stack)=>{
        while(stack[stack.length-1] === ' ') {
            stack.pop();
        }   
    })
    /* shift each gameStack once */
    gameStacks.map((stack)=>{
        stack.shift();
    })

    // debugger;
    /* for each element in the commands array, split the element into an array of characters */
    commands.map((command, index)=>{
        commands[index] = command.split('');
    })
    /* for each element in the commands array, keep only numbers */
    commands.map((command, index)=>{
        commands[index] = command.filter((char)=>!isNaN(parseInt(char)));
    })


    /* for each element in the commands array, convert each character in the element to a number */
    commands.map((command, index)=>{
        commands[index] = command.map((char)=>parseInt(char));
    })
    /* in commands , subtract 1 from the last element and the one before it */
    commands.map((command, index)=>{
        command[command.length-1] -= 1;
        command[command.length-2] -= 1;
    })

    /* for each element in the commands array,  create an object where key to is the last element, key from is the one bofore it and key amount is the rest of the elements joined together */
    commands.map((command, index)=>{
        commands[index] = {
            to: command[command.length-1],
            from: command[command.length-2],
            amount: Number(command.slice(0,command.length-2).join(''))
        }
    })
    /* for each element in the commands array, create an array where the first element is the amount, the second is the from and the third is the to */
    commands.map((command, index)=>{
        commands[index] = [command.amount, command.from, command.to];
    })
    /* for each command in the commands array, for the amount stated in the first element in it, move an elemnt from the gameStack at the index stated at the second element to the index stated at the third element*/
    commands.map((command)=>{
        for(let i = 0; i < command[0]; i++) {
            if(command[1]>8 || command[2]>8) { console.log(command[1]>8,command[2]>8);debugger;}
            if(!gameStacks[command[1]]) debugger;
            if(gameStacks[command[1]].length !== 0) gameStacks[command[2]].push(gameStacks[command[1]].pop());
        }
    })
    /* combine a string out of the last character element in each gameStacks element */
    let string = gameStacks.map((stack)=>stack[stack.length-1]).join('');
    /* log the string */
    console.log(string)
    return string;

    /* log the stacks array */
    console.log(gameStacks)
}
