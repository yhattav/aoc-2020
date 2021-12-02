// const example = '';
const example = '0,3,6';
const input = '1,2,16,19,18,0';
// const regex = /contain/gm;
// const regex2 = /bags|bag/gm;
// const regex3 = /^ | $/gm;


const exampleArray = example.split(',').map(Number);
console.log(exampleArray)
const inputArray = input.split(',').map(Number);

export {exampleArray, inputArray};