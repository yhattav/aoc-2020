<script lang="ts">
    import { Toggle } from "carbon-components-svelte";
    import {script1, script2} from './day3script.ts'

// ------------------------ OPERATIONAL ------------------------------ //
    let res = 'no answer yet';
    let time = 'X';
    let initUseExample = window.localStorage.aocUseExample === 'true';
    let toggled = initUseExample;
    let useExample = initUseExample;

    function toggleInput(event) {
        useExample = event.target.checked;
        window.localStorage.aocUseExample = useExample;
    }

    async function run(part) {
        const started = Date.now()
        if(part === 1){ 
            res = await script1(useExample);
        }
        if(part === 2){
            res = await script2(useExample);
        }
        const ended = Date.now();
        time = ended - started + 'ms'
    }

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