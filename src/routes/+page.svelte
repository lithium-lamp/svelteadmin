<script lang="ts">
    import { data } from './data.js'
</script>

<main>
    <div>
        <pre>{JSON.stringify($data, undefined, 2)}</pre>
    </div>
</main>
        
<!--

{#await debugvars}
    <p>sadasd</p>
{:then debugvars}
    <p></p>
    {#each debugvars.cmdline as cmdline}
        <p>{cmdline}</p>
    {/each}

    <p>Database: {debugvars.database}</p>
    <p>Goroutines: {debugvars.goroutines}</p>
    <p>Memstats: {debugvars.memstats}</p>
    <p>Timestamp: {debugvars.timestamp}</p>
    <p>Total processing time μs: {debugvars.total_processing_time_μs}</p>

    <p>Total requests received: {debugvars.total_requests_received}</p>
    <p>Total responses sent: {debugvars.total_responses_sent}</p>
    <p>Total responses sent by status: {debugvars.total_responses_sent_by_status}</p>
    <p>Version: {debugvars.version}</p>

{/await}
-->