<script lang="ts">
  export let currentPageIndex = 0;
  export let currentYearIndex = 0;
  import { setContext } from "svelte";
  import {pages} from '../pages'
  $: numOfAvailablePages = Object.keys(pages[`${currentYearIndex+2020}`]).length;

let PageComponent;

  function loadPage(pageIndex: number, yearIdx: number) {
    const page = `${Math.min(numOfAvailablePages-1,pageIndex)+1}`;
    const year = `${yearIdx + 2020}`;
    console.log('Loading page:', page, ' Of AOC ', year);
    let pageLoader = pages[year][page];
    pageLoader().then(module=>{
      PageComponent = module.default;
    })
  };
  $: loadPage(currentPageIndex, currentYearIndex);
</script>

<svelte:component this={PageComponent}/>
