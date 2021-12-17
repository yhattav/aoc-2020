// const example = '';
// const example = '';
const example = 'target area: x=20..30, y=-10..-5';
const input = 'target area: x=192..251, y=-89..-59';
const regex = /target area: /gm;
// const regex2 = /bags|bag/gm;
// const regex3 = /^ | $/gm;


const exampleArray = example.replace(regex,'').split(', ').map(el=>el.slice(2)).map(el=>el.split('..').map(Number));
console.log(exampleArray)
const inputArray = input.replace(regex,'').split(', ').map(el=>el.slice(2)).map(el=>el.split('..').map(Number));

export {exampleArray, inputArray};