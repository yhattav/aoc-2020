// const example = '';
// const example = '';
const example = '###B#C#B#D###,  #A#D#C#A#';
const input = '###A#D#B#C###,  #B#C#D#A#';
const regex = /#| /gm;
// const regex2 = /bags|bag/gm;
// const regex3 = /^ | $/gm;


const exampleArray = example.replace(regex,'').split(',').map(el=>el.split(''));
console.log(exampleArray)
const inputArray = input.replace(regex,'').split(',').map(el=>el.split(''));

export {exampleArray, inputArray};
console.log('ASDFASDFASDF')