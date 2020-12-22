// const example = '';
// const example = '';
const example = '9,2,6,3,1|5,8,4,7,10';
const input = '18,50,9,4,25,37,39,40,29,6,41,28,3,11,31,8,1,38,33,30,42,15,26,36,43|32,44,19,47,12,48,14,2,13,10,35,45,34,7,5,17,46,21,24,49,16,22,20,27,23';
// const regex = /contain/gm;
// const regex2 = /bags|bag/gm;
// const regex3 = /^ | $/gm;


const exampleArray = example.split('|').map(value =>value.split(',').map(Number));
console.log(exampleArray)
const inputArray = input.split('|').map(value =>value.split(',').map(Number));;

export {exampleArray, inputArray};