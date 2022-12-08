module.exports = ({
  year,
  day,
}) => {
const code =
    `
    <script lang="ts">

    import {script1, script2} from './day`+day+`script'
    import DayUI from "../../../components/DayUI.svelte";

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


<DayUI {res} {time} {toggleInput} {run} {toggled}/>

<style>

</style>
      `;

  return [
    code,
    '',
  ].join('\n');
  // #endregion
};
