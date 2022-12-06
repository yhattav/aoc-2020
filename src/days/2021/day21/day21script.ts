import {exampleArray, inputArray} from './day21Input'
export async function script1(useExample: boolean) {
    const usedInput = useExample ? exampleArray : inputArray;
    let _res 
    _res = run(usedInput);
    return _res;
}
export async function script2(useExample: boolean) {
    const usedInput = useExample ? exampleArray : inputArray;
    let _res 
    _res = run2({p1Loc:usedInput[0],p2Loc:usedInput[1],p1Score:0,p2Score:0},true);
    return _res;
}
//3,5,43,110479, 6235793 =           444356092776315
//2, 2, 2, 3, 7, 2035478512981  = 341960390180808
let cache = new Map();
let stringyfy = ({p1Loc,p2Loc,p1Score,p2Score}) => [p1Loc, p2Loc, p1Score, p2Score].join('|');
const possibilities = [
    [1, 1, 1],
    [1, 1, 2],
    [1, 1, 3],
    [1, 2, 1],
    [1, 2, 2],
    [1, 2, 3],
    [1, 3, 1],
    [1, 3, 2],
    [1, 3, 3],
    [2, 1, 1],
    [2, 1, 2],
    [2, 1, 3],
    [2, 2, 1],
    [2, 2, 2],
    [2, 2, 3],
    [2, 3, 1],
    [2, 3, 2],
    [2, 3, 3],
    [3, 1, 1],
    [3, 1, 2],
    [3, 1, 3],
    [3, 2, 1],
    [3, 2, 2],
    [3, 2, 3],
    [3, 3, 1],
    [3, 3, 2],
    [3, 3, 3],
  ];
const run2 = ({p1Loc,p2Loc,p1Score,p2Score},start) => {
    if(start) {
        // for new runs, clear cache

        cache = new Map();
    }
    // if (p1Score >= 21) return [1,0]; //p1 won
    if(p2Score >= 21) return [0,1]; //p2 won
    //cache ? 
    let stringy = stringyfy({p1Loc,p2Loc,p1Score,p2Score});
    // console.log({stringy})
    let res = cache.get(stringy);
    // let newRes = [0,0]; // to store teh score for this stringy
    if (res  != null) return res;//this was already found before
    // need to find the win numbers in these conditions
    // for each of the 3^3 dices possible run2 with the updated values
    let newRes = [0, 0];
    // for (const rolls of possibilities) {
    possibilities.forEach(([d1,d2,d3])=>{
        let added = d1+d2+d3;
        let newP1Loc = ((p1Loc + added - 1) % 10) + 1;
        let newP1Score = p1Score + newP1Loc;
        let vals = run2({p1Loc:p2Loc, p2Loc:newP1Loc, p1Score:p2Score, p2Score:newP1Score},false)
        newRes[0] += vals[1];
        newRes[1] += vals[0];
    });
    cache.set(stringy,newRes);
    return start ? Math.max(...newRes) : newRes;
}



const run = (input) => {
    let totalRolls = 0;
    let dice = ()=>{
        let counter = 0;
        return ()=>{
            totalRolls++;
            if(counter === 100) {
                counter = 0;
            }
            counter ++;
            return counter;
        }
    };
    let roll = dice();


    let counter = 0;
    let p1Loc = input[0]
    let p2Loc = input[1]
    let p1Score = 0;
    let p2Score = 0;
    let isP1 = false;
    while (p1Score < 1000 && p2Score<1000) {
        let added = roll() + roll() + roll();
        isP1 = !isP1;
        if ( isP1) {
            p1Loc += added;
            p1Loc = p1Loc % 10;
            p1Score += p1Loc ? p1Loc : 10
        } else {
            p2Loc += added;
            p2Loc = p2Loc % 10;
            p2Score += p2Loc ? p2Loc : 10
        }
    }
    if(p1Score >p2Score) {
        return totalRolls*p2Score;
    } else {
        return totalRolls*p1Score
    }
}


/*
8(0) > 3+3+3 > 17(7)  + 3 rolls of 1
7(7) > 1+1+1 > 10 + 3 rolls of 1
10(17) > 3+3+3> 19(9) + 3 rolls of 1
21+



*/
