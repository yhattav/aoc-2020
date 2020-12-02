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
  import Day1 from "./days/day1/Day1.svelte";


  let theme: "g10" = "g10";

  setContext('Pagination', {
    handlePageChange: (pageIndex: number) => {
      pageChanged(pageIndex);
    },
    getLocalPage,
    getCurrentPage,
  })
  let currentPageIndex = getLocalPage();
  function getLocalPage() {
    return Number(window.localStorage.aocLocalPage || 0);
  }
  function pageChanged(pageIndex: number) {
    if (typeof pageIndex == "number") {
      window.localStorage.aocLocalPage = pageIndex;
    currentPageIndex = pageIndex;
    }
  }
  function getCurrentPage() {
    return currentPageIndex;
  }
  // function loadPage(pageIndex: numebr) {
  //   // import(`./days/day${pageIndex+1}/Day${pageIndex+1}.svelte`).then(module=>{
  //   import(`./days/day1/Day1.svelte`).then((module)=>{
  //     PageComponent = module.default;
  //   }).catch(error=>{
  //     console.error(error);
  //   });
  // };
  // $: loadPage(currentPageIndex);
</script>

<Theme persist bind:theme>
  <Header />
  <Content style="background: none; padding: 1rem">
    <Grid>
      <Row>
        <Column noGutter>
        <Page {currentPageIndex}/>
        </Column>
      </Row>
    </Grid>
  </Content>
</Theme>
