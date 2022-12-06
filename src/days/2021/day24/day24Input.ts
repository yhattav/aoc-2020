const example = '';
// const example = |inp w,add z w,mod z 2,div w 2,add y w,mod y 2,div w 2,add x w,mod x 2,div w 2,mod w 2';
// const example = 'inp x,mul x -1';
const input = 'inp w,mul x 0,add x z,mod x 26,div z 1,add x 15,eql x w,eql x 0,mul y 0,add y 25,mul y x,add y 1,mul z y,mul y 0,add y w,add y 9,mul y x,add z y|inp w,mul x 0,add x z,mod x 26,div z 1,add x 11,eql x w,eql x 0,mul y 0,add y 25,mul y x,add y 1,mul z y,mul y 0,add y w,add y 1,mul y x,add z y|inp w,mul x 0,add x z,mod x 26,div z 1,add x 10,eql x w,eql x 0,mul y 0,add y 25,mul y x,add y 1,mul z y,mul y 0,add y w,add y 11,mul y x,add z y|inp w,mul x 0,add x z,mod x 26,div z 1,add x 12,eql x w,eql x 0,mul y 0,add y 25,mul y x,add y 1,mul z y,mul y 0,add y w,add y 3,mul y x,add z y|inp w,mul x 0,add x z,mod x 26,div z 26,add x -11,eql x w,eql x 0,mul y 0,add y 25,mul y x,add y 1,mul z y,mul y 0,add y w,add y 10,mul y x,add z y|inp w,mul x 0,add x z,mod x 26,div z 1,add x 11,eql x w,eql x 0,mul y 0,add y 25,mul y x,add y 1,mul z y,mul y 0,add y w,add y 5,mul y x,add z y|inp w,mul x 0,add x z,mod x 26,div z 1,add x 14,eql x w,eql x 0,mul y 0,add y 25,mul y x,add y 1,mul z y,mul y 0,add y w,add y 0,mul y x,add z y|inp w,mul x 0,add x z,mod x 26,div z 26,add x -6,eql x w,eql x 0,mul y 0,add y 25,mul y x,add y 1,mul z y,mul y 0,add y w,add y 7,mul y x,add z y|inp w,mul x 0,add x z,mod x 26,div z 1,add x 10,eql x w,eql x 0,mul y 0,add y 25,mul y x,add y 1,mul z y,mul y 0,add y w,add y 9,mul y x,add z y|inp w,mul x 0,add x z,mod x 26,div z 26,add x -6,eql x w,eql x 0,mul y 0,add y 25,mul y x,add y 1,mul z y,mul y 0,add y w,add y 15,mul y x,add z y|inp w,mul x 0,add x z,mod x 26,div z 26,add x -6,eql x w,eql x 0,mul y 0,add y 25,mul y x,add y 1,mul z y,mul y 0,add y w,add y 4,mul y x,add z y|inp w,mul x 0,add x z,mod x 26,div z 26,add x -16,eql x w,eql x 0,mul y 0,add y 25,mul y x,add y 1,mul z y,mul y 0,add y w,add y 10,mul y x,add z y|inp w,mul x 0,add x z,mod x 26,div z 26,add x -4,eql x w,eql x 0,mul y 0,add y 25,mul y x,add y 1,mul z y,mul y 0,add y w,add y 4,mul y x,add z y|inp w,mul x 0,add x z,mod x 26,div z 26,add x -2,eql x w,eql x 0,mul y 0,add y 25,mul y x,add y 1,mul z y,mul y 0,add y w,add y 9,mul y x,add z y';
// const regex = /contain/gm;
// const regex2 = /bags|bag/gm;
// const regex3 = /^ | $/gm;

// 15 / 9         / 1
// 11 / 1         / 1
// 10 / 11           /  1
// 12 / 3           / 1
// -11 / 10           / 26
//11 / 5             / 1
// 14 / 0            / 1
// -6 / 7           / 26
//10 / 9          / 1
//-6 / 15          / 26
// -6 / 4             / 26
//-16 / 10           / 26
//-4 / 4            / 26
//-2 / 9              / 26



/*----------------------------------------------------------------
[w1+9]
[w1+9,w2+1]
[w1+9,w2+1,w3+11]
[w1+9,w2+1,w3+11,w4+3]
//w4+3 - 11 = w5
[w1+9,w2+1,w3+11,w6+5]
[w1+9,w2+1,w3+11,w6+5,w7+0]
// w7+0 -6 = w8
[w1+9,w2+1,w3+11,w6+5,w9+9]
//w9+9 - 6 = w10
//w6+5 - 6 = w11
//w3+11 - 16 = w12
//w2+1 - 4 = w13
// w1+9 -2 = w14



//w4+3 - 11 = w5
// w7+0 -6 = w8
//w9+9 - 6 = w10
//w6+5- 6 = w11
//w3+11 - 16 = w12
//w2+1 - 4 = w13
// w1+9 -2 = w14









*/

const exampleArray = example
console.log(exampleArray)
const inputArray = input.split('|');

export {exampleArray, inputArray};