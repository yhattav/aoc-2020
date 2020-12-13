// const example = '';
// const example = '';
const example = '939,7,13,x,x,59,x,31,19';
// const example = '939,67,7,59,61';
// const example = '939,17,x,13,19';
// const example = '939,67,7,59,61';
// const example = '939,67,x,7,59,61';
// const example = '939,67,7,x,59,61';
// const example = '939,1789,37,47,1889';
const input = '1000340,13,x,x,x,x,x,x,37,x,x,x,x,x,401,x,x,x,x,x,x,x,x,x,x,x,x,x,17,x,x,x,x,19,x,x,x,23,x,x,x,x,x,29,x,613,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,41';
// const regex = /contain/gm;
// const regex2 = /bags|bag/gm;
// const regex3 = /^ | $/gm;


const exampleArray = example.split(',').map(Number);
// exampleArray[120] = 221;
console.log(exampleArray)

const inputArray = input.split(',').map(Number);

export {exampleArray, inputArray};