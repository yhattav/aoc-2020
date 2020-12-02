<script>
  import { Toggle } from "carbon-components-svelte";

    import {exampleArray, inputArray} from './day2Input.ts'


    async function script1() {
        let _res = 'connect here' ;
        return _res;
    }
    async function script2() {
        let _res = 'connect here' 
        return _res;
    }











// ------------------------ OPERATIONAL ------------------------------ //
    let res='no answer yet';
    let time = 'X';
    let initUseExample = window.localStorage.aocUseExample;
    let usedInput = initUseExample ? exampleArray : inputArray;
    let toggled = initUseExample === 'true';
    let useExample;


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