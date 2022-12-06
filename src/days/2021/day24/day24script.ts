import {exampleArray, inputArray} from './day24Input'
export async function script1(useExample: boolean) {
    const usedInput = useExample ? exampleArray : inputArray;
    let _res 
    _res = run(usedInput);
    return _res;
}
export async function script2(useExample: boolean) {
    const usedInput = useExample ? exampleArray : inputArray;
    let _res 
    _res = run2(usedInput);
    return _res;
}




const run = (input) => {
    let createRunInst = (vals,getInput) =>{

        const isKey = (a)=> typeof a === 'string'
        const valueOf = (v) => {
            if(isKey(v)) {
                return vals[v];
            } else {
                return v;
            }
        }
        return (instruction)=>{
            let [base, v1,v2] = instruction.split(' ');
            v1 = !isNaN(Number(v1)) ? Number(v1) : v1;
            v2 = !isNaN(Number(v2)) ? Number(v2) : v2;
            // console.log('inst:',{base,v1,v2})
            // console.log(vals)
            if (!isKey(v1)) debugger;

            switch (base) {
                case 'inp':
                        vals[v1] = getInput();
                    break;
                case 'add':
                    vals[v1] = vals[v1] + valueOf(v2);
                    break;
                case 'mul':
                    vals[v1] = vals[v1] * valueOf(v2);
                    break;
                case 'div':
                    vals[v1] = Math.floor(vals[v1] / valueOf(v2));
                    break;
                case 'mod':
                    vals[v1] = vals[v1] % valueOf(v2);
                    break;
                case 'eql':
                    vals[v1] = valueOf(v1) === valueOf(v2) ? 1 : 0
                    break;
            }

            return vals;
        }
    }
    // let prog = createRunInst(vals,()=>33);
    let number = 99999999999999;
    let min =    11111111111111;
    let res;
    for (let i=number; i>=min; i--) {
        let str = i.toString();
        if(str.split('').some(num=>num==='0')) continue;
        let vals = {w:0,x:0,y:0,z:0}
        let strArray = str.split('').map(Number)
        const getInput = ()=>{
            return strArray.shift();
        }
        let prog = createRunInst(vals,getInput);
        let z;
        let instructions = input.slice()
        while (instructions.length > 0) {
            const inst = instructions.shift();
            z = prog(inst).z
        }
        // console.log(z)
        if(z === 0) {
            console.log('last i:',i, {vals})
            res = i;
            break;
        } else {
            debugger;
        }
    }
    console.log(res)
    return res;
}

const run2 = (input) =>{
    let instructions = input.map(inst=>{
        let reg = /inp w,mul x 0,add x z,mod x 26,div z ([-]*[0-9]+),add x ([-]*[0-9]+),eql x w,eql x 0,mul y 0,add y 25,mul y x,add y 1,mul z y,mul y 0,add y w,add y ([-]*[0-9]+),mul y x,add z y/gm
        let match = reg.exec(inst);
        console.log(match[2],match[3])
        // debugger;
    })


    const go= (args)=>{
        let [input, lastZ , number1, number2,divider] = args.split(',').map(Number);
        let x = 0;
        let newZ 
        let y
        if(lastZ % 26 + number1 !== input) {
            x = 1
            y = input + number2;
            newZ = lastZ / divider * 26 + y
        } else {
            x = 0
            // y=1
            y = 0;
            newZ = lastZ / divider
        }
        return {w:input,x,y,z:newZ%26}
}
const goAndLog = (str)=>{
    console.log(str,go(str));
}
goAndLog('1,0,15,9,1')

goAndLog('1,11,11,1,1')
goAndLog('1,12,11,1,1')
goAndLog('1,13,11,1,1')
goAndLog('1,14,11,1,1')
goAndLog('1,15,11,1,1')
goAndLog('1,16,11,1,1')
goAndLog('1,17,11,1,1')
goAndLog('1,18,11,1,1')
// goAndLog('1,18,11,1,1')
goAndLog('2,11,11,1,1')
goAndLog('2,12,11,1,1')
goAndLog('2,13,11,1,1')
goAndLog('2,14,11,1,1')
goAndLog('2,15,11,1,1')
goAndLog('2,16,11,1,1')
goAndLog('2,17,11,1,1')
goAndLog('2,18,11,1,1')
// goAndLog('2,18,11,1,1')
goAndLog('3,11,11,1,1')
goAndLog('3,12,11,1,1')
goAndLog('3,13,11,1,1')
goAndLog('3,14,11,1,1')
goAndLog('3,15,11,1,1')
goAndLog('3,16,11,1,1')
goAndLog('3,17,11,1,1')
goAndLog('3,18,11,1,1')
// goAndLog('3,18,11,1,1')
goAndLog('4,11,11,1,1')
goAndLog('4,12,11,1,1')
goAndLog('4,13,11,1,1')
goAndLog('4,14,11,1,1')
goAndLog('4,15,11,1,1')
goAndLog('4,16,11,1,1')
goAndLog('4,17,11,1,1')
goAndLog('4,18,11,1,1')
// goAndLog('4,18,11,1,1')
console.log('>>>')
goAndLog('5,18,11,1,1')
goAndLog('6,18,11,1,1')
goAndLog('7,18,11,1,1')
goAndLog('8,18,11,1,1')
goAndLog('9,18,11,1,1')
// console.log(go(9,0,15,9,1))
// console.log(go(3,0,15,9,1))
// console.log(go(3,0,15,9,1))
// console.log(go(3,0,15,9,1))
// console.log(go(3,0,15,9,1))
// console.log(go(3,0,15,9,1))
// console.log(go(3,0,15,9,1))
}


