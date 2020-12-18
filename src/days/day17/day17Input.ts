// const example = '';
// const example = '';
const example = '.#.,..#,###';
const input = '....###.,#...####,##.#.###,..#.#...,##.#.#.#,#.######,..#..#.#,######.#';
// const regex = /contain/gm;
// const regex2 = /bags|bag/gm;
// const regex3 = /^ | $/gm;


const exampleArray = example.split(',').map(val=>val.split(''));
console.log(exampleArray)
const inputArray = input.split(',').map(val=>val.split(''));

export {exampleArray, inputArray};