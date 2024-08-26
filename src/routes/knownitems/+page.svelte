<script lang="ts">
    import DataTable from "./data-table.svelte";

	export let data;
</script>
   
<div class="container mx-auto py-10">
    {#await data}
    <p>f</p>
    {:then {knownitems, knownitems_metadata}}
        <DataTable {knownitems} {knownitems_metadata}/>
    {:catch error}
        <p style="color: red">{error.message}</p>
    {/await}
</div>