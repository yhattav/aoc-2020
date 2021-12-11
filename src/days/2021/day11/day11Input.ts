// const example = '';
// const example = '';
const example = '5483143223,2745854711,5264556173,6141336146,6357385478,4167524645,2176841721,6882881134,4846848554,5283751526';
const input = '5665114554,4882665427,6185582113,7762852744,7255621841,8842753123,8225372176,7212865827,7758751157,1828544563';
// const regex = /contain/gm;
// const regex2 = /bags|bag/gm;
// const regex3 = /^ | $/gm;


const exampleArray = example.split(',').map(el => el.split('').map(Number));
console.log(exampleArray)
const inputArray = input.split(',').map(el => el.split('').map(Number));

export {exampleArray, inputArray};