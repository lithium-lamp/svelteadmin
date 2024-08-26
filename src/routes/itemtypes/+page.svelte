<script lang="ts">
    import DataTable from "./data-table.svelte";

	export let data;
</script>
   
<div class="container mx-auto py-10">
    {#await data}
    <p>f</p>
    {:then {itemtypes, itemtypes_metadata}}
        <DataTable {itemtypes} {itemtypes_metadata}/>
    {:catch error}
        <p style="color: red">{error.message}</p>
    {/await}
</div>