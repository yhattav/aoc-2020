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
        "13":  () => import(`../days/day13/Day13.svelte`).catch(e=>console.error(e)),
        "14":  () => import(`../days/day14/Day14.svelte`).catch(e=>console.error(e)),
        "15":  () => import(`../days/day15/Day15.svelte`).catch(e=>console.error(e)),
        "16":  () => import(`../days/day16/Day16.svelte`).catch(e=>console.error(e)),
        "17":  () => import(`../days/day17/Day17.svelte`).catch(e=>console.error(e)),
        "18":  () => import(`../days/day18/Day18.svelte`).catch(e=>console.error(e)),
        "19":  () => import(`../days/day19/Day19.svelte`).catch(e=>console.error(e)),
        "20":  () => import(`../days/day20/Day20.svelte`).catch(e=>console.error(e)),
        "21":  () => import(`../days/day21/Day21.svelte`).catch(e=>console.error(e)),
        "22":  () => import(`../days/day22/Day22.svelte`).catch(e=>console.error(e)),
        "23":  () => import(`../days/day23/Day23.svelte`).catch(e=>console.error(e)),
        "24":  () => import(`../days/day24/Day24.svelte`).catch(e=>console.error(e)),
        "25":  () => import(`../days/day25/Day25.svelte`).catch(e=>console.error(e)),
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
