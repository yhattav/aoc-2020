<script lang="ts">
    export let res = 'no answer yet';

    const charToClass = (char)=> {
        let stringClass = '';
        switch(char) {
            case '#': 
            stringClass = 'wall'
            break;
        }
        return stringClass
    }
</script>

{#if typeof res === 'object'}
    <table>
        {#each res as line}
        <tr>
            {#each line as char}
            <th class={charToClass(char)}></th>
            {/each}
        </tr>
        {/each}
    </table>
{/if}
<style>
    tr { 
        height: auto;
    }
    th { 
        height:10px;
        width:10px;
    }
    .wall {
        background-color: black;
    }
</style>