// const example = '';
const example = '28,33,18,42,31,14,46,20,48,47,24,23,49,45,19,38,39,11,1,32,25,35,8,17,7,9,4,2,34,10,3';
// const example = '16,10,15,5,1,11,7,19,6,12,4';
const input = '8,40,45,93,147,64,90,125,149,145,111,126,9,146,38,97,103,6,122,34,18,35,96,86,116,29,59,118,102,26,66,17,74,94,5,114,128,1,75,47,141,58,65,100,63,12,53,25,106,136,15,82,22,117,2,80,79,139,7,81,129,19,52,87,115,132,140,88,109,62,73,46,24,69,101,110,16,95,148,76,135,142,89,50,72,41,39,42,56,51,57,127,83,121,33,32,23';
// const regex = /contain/gm;
// const regex2 = /bags|bag/gm;
// const regex3 = /^ | $/gm;


const exampleArray = example.split(',').map(Number).sort((a, b) => a - b);
console.log(exampleArray)
const inputArray = input.split(',').map(Number).sort((a, b) => a - b);

export {exampleArray, inputArray};