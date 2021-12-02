<script lang='ts'>
  import {
    Content,
    Breadcrumb,
    BreadcrumbItem,
    Grid,
    Row,
    Column,
    Tabs,
    TabContent,
    Tab,
    Select,
    PaginationNav,
    SelectItem,
  } from "carbon-components-svelte";
  import { onMount, afterUpdate, setContext } from "svelte";

  import Header from "./components/Header.svelte";
  import Theme from "./components/Theme.svelte";
  import Page from "./components/Page.svelte";


  let theme: "g10" = "g10";

  setContext('Pagination', {
    handlePageChange: (pageIndex: number) => {
      pageChanged(pageIndex);
    },
    getLocalPage,
    getCurrentPage,
  })
  setContext('Years', {
    handleYearChange: (yearIndex: number) => {
      yearChanged(yearIndex);
    },
    getLocalYear,
    getCurrentYear,
  })
  let currentPageIndex = getLocalPage();
  function getLocalPage() {
    console.log(window.localStorage.aocLocalYear)

    return Number(window.localStorage.aocLocalPage || 0);
  }
  let currentYearIndex = getLocalYear();
  function getLocalYear() {
    console.log(window.localStorage.aocLocalYear)
    return Number(window.localStorage.aocLocalYear || 0);
  }
  function pageChanged(pageIndex: number) {
    if (typeof pageIndex == "number") {
      window.localStorage.aocLocalPage = pageIndex;
    currentPageIndex = pageIndex;
    }
  }
  function yearChanged(yearIndex: number) {
    if (typeof yearIndex == "number") {
      window.localStorage.aocLocalYear = yearIndex;
      currentYearIndex = yearIndex;
    }
  }
  function getCurrentPage() {
    return currentPageIndex;
  }
  function getCurrentYear() {
    return currentYearIndex;
  }

</script>

<Theme persist bind:theme>
  <Header />
  <Content style="background: none; padding: 1rem">
    <Grid>
      <Row>
        <Column noGutter>
        <Page {currentPageIndex} {currentYearIndex}/>
        </Column>
      </Row>
    </Grid>
  </Content>
</Theme>
