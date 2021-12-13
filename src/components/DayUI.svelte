<script lang="ts">

    import { 
    Toggle,
    Tile,
    Button,
    Grid,
    Row,
    Column,
    } from "carbon-components-svelte";

// ------------------------ OPERATIONAL ------------------------------ //
    export let res,time,toggled,toggleInput,run,CustomComponent;
</script>


<Grid>
    <Row>
        <Column noGutter>
        <Tile><Toggle labelText="Use Example Input" {toggled} on:change={toggleInput}/></Tile>
<Tile>
                <Button kind="danger" on:click={()=>{run(1)}}>Run1</Button>

                <Button kind="danger" on:click={()=>{run(2)}}>Run2</Button>
</Tile>
        </Column>
        <Column>
            <h2>    
            {#if typeof CustomComponent === 'function'}
                <svelte:component this={CustomComponent} {res}/>
            {:else}
                {res}
            {/if}
            </h2>
        <p>
            in {time};
        </p>
        </Column>
    </Row>
</Grid>

<style>

</style>