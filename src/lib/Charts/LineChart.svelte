<script>
	import { Line } from 'svelte-chartjs';
	import { data } from './data.js';
</script>

<Line {data} options={{ responsive: true }} />
