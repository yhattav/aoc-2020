<script lang="ts">
  import {
    SkipToContent,
    Header,
    HeaderUtilities,
    HeaderGlobalAction,
    PaginationNav,
  } from "carbon-components-svelte";
  import Notification20 from "carbon-icons-svelte/lib/Notification20";
  import UserAvatar20 from "carbon-icons-svelte/lib/UserAvatar20";
  import AppSwitcher20 from "carbon-icons-svelte/lib/AppSwitcher20";
  import { getContext } from "svelte";

  const ctx: { dark: any; light: any; updateVar: any } = getContext("Theme");
  const pagination = getContext("Pagination");
  $: if (ctx) {
    ctx.dark.subscribe((value) => {
    });
    ctx.light.subscribe((value) => {
    });
    ctx.updateVar("--cds-productive-heading-06-font-size", "4rem");
  }
  let startPage = pagination.getCurrentPage();

  function handlePageChange(event: event) {
    const pageIndex = event.detail.page;
    pagination.handlePageChange(pageIndex);
  }
</script>

<Header company="YHATTAV" platformName="Advent of Code 2020" href="/">


  <HeaderUtilities>
    <PaginationNav page={startPage} total={25} on:change={handlePageChange} />
  </HeaderUtilities>
</Header>
