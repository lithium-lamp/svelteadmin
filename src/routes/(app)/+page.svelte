<script lang="ts">
    type Stats = {
        cmdline: string[];
        database: string[];
        goroutines: string[];
    };

    import { data } from './data.js'
</script>

<main>
    <div>
    {#await JSON.stringify($data, undefined, 2) then name}
        <pre>
            cmdline: {JSON.stringify(JSON.parse(name).cmdline, undefined, 2)}
            database: {JSON.stringify(JSON.parse(name).database, undefined, 2)}
            goroutines: {JSON.stringify(JSON.parse(name).goroutines, undefined, 2)}
            total_processing_time_μs: {JSON.stringify(JSON.parse(name).total_processing_time_μs, undefined, 2)}
            total_requests_received: {JSON.stringify(JSON.parse(name).total_requests_received, undefined, 2)}
            total_responses_sent: {JSON.stringify(JSON.parse(name).total_responses_sent, undefined, 2)}
            total_responses_sent_by_status: {JSON.stringify(JSON.parse(name).total_responses_sent_by_status, undefined, 2)}
            version: {JSON.stringify(JSON.parse(name).version, undefined, 2)}
        </pre>
    {/await}
    </div>
</main>