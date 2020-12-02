<script>
    import { Toggle } from "carbon-components-svelte";

    import {exampleArray, inputArray} from './day2Input.ts'

    async function script1() {
        let _res = countValidPasswords(usedInput) ;
        return _res;
    }
    async function script2() {
        let _res = countValidPasswords2(usedInput) ;
        return _res;
    }


function countValidPasswords(passwordDataArray) {
    let __res = 0;
    passwordDataArray.map(passwordData => {
        if (isValidPassword(passwordData)) {__res++;}
    })
    return __res;
}
function isValidPassword(passwordData) {
    let [range, char, password] = passwordData;
    const rangeValues = range.split('-');
    let min = Number(rangeValues[0]);
    let max = Number(rangeValues[1]);
    var re = new RegExp(char,"g");

    const matches = password.match(re);
    const isValid = matches && (min <= matches.length) && (matches.length <= max);
    console.log(min, max, char,password, isValid)
    return isValid;
}

function countValidPasswords2(passwordDataArray) {
    let __res = 0;
    passwordDataArray.map(passwordData => {
        if (isValidPassword2(passwordData)) {__res++;}
    })
    return __res;
}
function isValidPassword2(passwordData) {
    let [range, char, password] = passwordData;
    let isValid = false;
    const rangeValues = range.split('-');
    let indexA = Number(rangeValues[0]) - 1;
    let indexB = Number(rangeValues[1]) - 1;
    let isA = password[indexA] === char;
    let isB = password[indexB] === char;

    if ((isA && !isB) || (isB && !isA)) {
        isValid = true;
    }

    console.log(indexA, indexB, char , password, isValid)
    return isValid;
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
            res = await script1();
        }
        if(part === 2){
            res = await script2();
        }
        const ended = Date.now();
        time = ended - started + 'ms'
    }

$: usedInput = useExample ? exampleArray : inputArray;
</script>
2 
<p>  
    <Toggle labelText="Use Example Input" {toggled} on:change={toggleInput}/>
</p>
<p>
    <button on:click={()=>{run(1)}}>Run1</button>
    <button on:click={()=>{run(2)}}>Run2</button>
</p>
<p>    
    {res}
</p>
<p>
in {time};
</p>


<style>

</style>