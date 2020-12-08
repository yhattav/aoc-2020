// const example = '';
// const example = '';
const example = '';
const input = '';
const regex = /contain/gm;
const regex2 = /bags|bag/gm;
const regex3 = /^ | $/gm;

const exampleArray = example.split(',').map(value=>value.split(' '));
console.log(exampleArray)
const inputArray = input;

export {exampleArray, inputArray};