<script lang="ts">
	import { onMount } from "svelte";

	let dotCount = $state(1);

	onMount(() => {
		const interval = setInterval(() => {
			dotCount = (dotCount % 3) + 1;
		}, 500);

		return () => {
			clearInterval(interval);
		};
	});

	const dots = $derived(".".repeat(dotCount));
</script>

<div id="loading-page">
	<span>LC3</span>
	<p>Loading{dots}</p>
</div>

<style>
	#loading-page {
		height: 100dvh;

		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		gap: 2em;
	}
	span,
	p {
		margin: 0;
		padding: 0;
	}

	span {
		font-weight: bold;
		font-size: 5em;
	}
</style>
