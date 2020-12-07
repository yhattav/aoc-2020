// const example = '';
// const example = '';
const example = '';
const input = '';
const regex = /contain/gm;
const regex2 = /bags|bag/gm;
const regex3 = /^ | $/gm;


//where F means "front", B means "back", L means "left", and R means "right".
// F 0 
// B 1 
// L 0 
// R 1
const exampleArray = example.replace(regex2,'').split('.').map(val=>val.replace(regex,',')).map(val=>val.split(',').map(val=>val.replace(regex3,'')).map(val=>val.replace(regex3,'')));
console.log(exampleArray)
const inputArray = input.replace(regex2,'').split('.').map(val=>val.replace(regex,',')).map(val=>val.split(',').map(val=>val.replace(regex3,'')).map(val=>val.replace(regex3,'')));

export {exampleArray, inputArray};