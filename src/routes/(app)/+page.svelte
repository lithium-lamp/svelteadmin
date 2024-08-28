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
        <pre>cmdline: {JSON.stringify($data.cmdline, undefined, 2)}</pre>
        <pre>database: {JSON.stringify($data.database, undefined, 2)}</pre>
        <pre>goroutines: {JSON.stringify($data.goroutines, undefined, 2)}</pre>
        <!--<pre>memstats: {}</pre>-->
        <pre>total_processing_time_μs: {JSON.stringify($data.total_processing_time_μs, undefined, 2)}</pre>
        <pre>total_requests_received: {JSON.stringify($data.total_requests_received, undefined, 2)}</pre>        
        <pre>total_responses_sent: {JSON.stringify($data.total_responses_sent, undefined, 2)}</pre>        
        <pre>total_responses_sent_by_status: {JSON.stringify($data.total_responses_sent_by_status, undefined, 2)}</pre>        
        <pre>version: {JSON.stringify($data.version, undefined, 2)}</pre>        
    </div>
</main>