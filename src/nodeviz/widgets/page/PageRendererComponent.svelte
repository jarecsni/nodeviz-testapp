<script type="ts">
    export let value:{content:()=>Promise<{default:string}>};
</script>
{#await value.content() then pageContent}
    {#if pageContent === undefined} 
        <p>No content.</p>
    {:else}
        {@html pageContent.default}
    {/if}
{/await}
