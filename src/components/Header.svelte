<script lang="ts">
  import {
    SkipToContent,
    Header,
    HeaderUtilities,
    HeaderGlobalAction,
    PaginationNav,
    Dropdown,
  } from "carbon-components-svelte";
  import Notification20 from "carbon-icons-svelte/lib/Notification20";
  import UserAvatar20 from "carbon-icons-svelte/lib/UserAvatar20";
  import AppSwitcher20 from "carbon-icons-svelte/lib/AppSwitcher20";
  import { getContext } from "svelte";
  import {pages} from '../pages'
  const ctx: { dark: any; light: any; updateVar: any } = getContext("Theme");
  const pagination = getContext("Pagination");
  const years = getContext("Years");
  $: if (ctx) {
    ctx.dark.subscribe((value) => {
    });
    ctx.light.subscribe((value) => {
    });
    ctx.updateVar("--cds-productive-heading-06-font-size", "4rem");
  }
  $: handleYearChange(sellectedYear)
  let startPage = pagination.getCurrentPage();
  let startYear = years.getCurrentYear();
  let sellectedYear = startYear;
  $: numOfAvailablePages = Object.keys(pages[`${sellectedYear+2020}`]).length;
  function handlePageChange(event: event) {
    const pageIndex = event.detail.page;
    pagination.handlePageChange(pageIndex);
  }
  function handleYearChange(yearIndex) {

    // const yearIndex = event.detail.page;
    years.handleYearChange(yearIndex);
  }
</script>

<Header company="YHATTAV" platformName="Advent of Code" href="/">

  <Dropdown
  bind:selectedIndex={sellectedYear}

  items={[{ id: '2020', text: '2020' }, { id: '2021', text: '2021' }]}
/>
  <HeaderUtilities>
    <PaginationNav page={startPage} total={numOfAvailablePages} on:change={handlePageChange} />
  </HeaderUtilities>
</Header>
