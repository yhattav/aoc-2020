<script>
  import { Toggle } from "carbon-components-svelte";
    import DayUI from "../../components/DayUI.svelte";

    import {exampleArray, inputArray} from './day1Input.ts'

    async function findThree() {
       return await usedInput.map(initialValue=>{
            return usedInput.map((value,index)=>findPair(index,initialValue));
        })
    };

    async function findTwo() {
            return await usedInput.map((value,index)=>findPair(index));
    };

    function findPair(index, initialVal = 0) {
        const a = usedInput[index];
        const bIndex = usedInput.findIndex((value)=>{
            const sum = a + value;
            const isAMatch = (value + a) === 2020 - initialVal;
            return isAMatch;
            });
        if (bIndex > -1) {
            const b = usedInput[bIndex];
            // console.warn(a , index, b, index, a * b, a*b*initialVal);
            res = initialVal ? a*b*initialVal : a*b;
        }
    };

    async function script2() {
        let _res = await findThree();
        return _res;
    }
    async function script1() {
        let _res = await findTwo();
        return _res;
    }


// ------------------------ OPERATIONAL ------------------------------ //
    let res = 'no answer yet';
    let time = 'X';
    let initUseExample = window.localStorage.aocUseExample === 'true';
    let usedInput = initUseExample ? exampleArray : inputArray;
    let toggled = initUseExample;
    let useExample = initUseExample;

    function toggleInput(event) {
        useExample = event.target.checked;
        window.localStorage.aocUseExample = useExample;
    }

    async function run(part) {
        const started = Date.now()
        if(part === 1){ 
            await script1();
        }
        if(part === 2){
            await script2();
        }
        const ended = Date.now();
        time = ended - started + 'ms'
    }

$: usedInput = useExample ? exampleArray : inputArray;
</script>


<DayUI {res} {time} {toggleInput} {run} {toggled}/>



<style>

</style>