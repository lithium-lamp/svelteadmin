<script lang="ts">
    import DataTable from "./data-table.svelte";

	export let data;
</script>
   
<div class="container mx-auto py-10">
    {#await data}
        <p>f</p>
    {:then {recipies, recipies_metadata}}
        <DataTable {recipies} {recipies_metadata}/>
    {:catch error}
        <p style="color: red">{error.message}</p>
    {/await}
</div>