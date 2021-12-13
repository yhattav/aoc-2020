<script lang="ts">
    import {script1, script2} from './day13script'
    import DayUI from "../../../components/DayUI.svelte";
    import MapRenderer from "./mapRenderer.svelte"
// ------------------------ OPERATIONAL ------------------------------ //
    let res = 'no answer yet';
    let time = 'X';
    let initUseExample = window.localStorage.aocUseExample === 'true';
    let toggled = initUseExample;
    let useExample = initUseExample;
    let CustomComponent;
    function toggleInput(event) {
        useExample = event.target.checked;
        window.localStorage.aocUseExample = useExample;
    }

    async function run(part) {
        const started = Date.now()
        if(part === 1){ 
            CustomComponent = null;
            res = await script1(useExample);
        }
        if(part === 2){
            CustomComponent = MapRenderer;
            res = await script2(useExample);
        }
        const ended = Date.now();
        time = ended - started + 'ms'
    }

</script>


<DayUI {res} {time} {toggleInput} {run} {toggled} {CustomComponent}/>

<style>

</style>