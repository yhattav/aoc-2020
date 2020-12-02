<script lang="ts">
  export let currentPageIndex = 0;
  import { setContext } from "svelte";
    const pages = {
        "1":  () => import(`../days/day1/Day1.svelte`).catch(e=>console.error(e)),
        "2":  () => import(`../days/day2/Day2.svelte`).catch(e=>console.error(e)),
        "3":  () => import(`../days/day3/Day3.svelte`).catch(e=>console.error(e)),
      };


let PageComponent;

  function loadPage(pageIndex: numebr) {
    console.log('Loading page:', pageIndex);
      pages[`${pageIndex+1}`]().then(module=>{
        PageComponent = module.default;
      })
  };
  $: loadPage(currentPageIndex);
</script>

<svelte:component this={PageComponent}/>
