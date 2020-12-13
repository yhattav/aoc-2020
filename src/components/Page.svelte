<script lang="ts">
  export let currentPageIndex = 0;
  import { setContext } from "svelte";
    const pages = {
        "1":  () => import(`../days/day1/Day1.svelte`).catch(e=>console.error(e)),
        "2":  () => import(`../days/day2/Day2.svelte`).catch(e=>console.error(e)),
        "3":  () => import(`../days/day3/Day3.svelte`).catch(e=>console.error(e)),
        "4":  () => import(`../days/day4/Day4.svelte`).catch(e=>console.error(e)),
        "5":  () => import(`../days/day5/Day5.svelte`).catch(e=>console.error(e)),
        "6":  () => import(`../days/day6/Day6.svelte`).catch(e=>console.error(e)),
        "7":  () => import(`../days/day7/Day7.svelte`).catch(e=>console.error(e)),
        "8":  () => import(`../days/day8/Day8.svelte`).catch(e=>console.error(e)),
        "9":  () => import(`../days/day9/Day9.svelte`).catch(e=>console.error(e)),
        "10":  () => import(`../days/day10/Day10.svelte`).catch(e=>console.error(e)),
        "11":  () => import(`../days/day11/Day11.svelte`).catch(e=>console.error(e)),
        "12":  () => import(`../days/day12/Day12.svelte`).catch(e=>console.error(e)),
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
