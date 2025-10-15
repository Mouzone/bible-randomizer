<script>
	import { liveQuery } from "dexie";
	import { db } from "$lib/db";

	const readingProgressStore = liveQuery(() => db.readingProgress.toArray());

	let i = $state(0);
	const readingProgress = $derived($readingProgressStore ?? []);
	const selectedProgress = $derived(readingProgress.at(i));
</script>

{#if readingProgress.length > 0}
	<select bind:value={i}>
		{#each readingProgress as progress, j}
			<option value={j}>{progress.book}</option>
		{/each}
	</select>

	<div>Date Read: {selectedProgress?.dateRead}</div>
{:else}
	<div>Loading reading progress...</div>
{/if}
