<script>
	import { liveQuery } from "dexie";
	import { db } from "$lib/db";

	const readingProgressStore = liveQuery(() => db.readingProgress.toArray());
	const readingProgress = $derived($readingProgressStore ?? []);

	async function markRead(index, date) {
		await db.readingProgress.update(index, { dateRead: date });
	}

	async function clearRead(index) {
		await db.readingProgress.update(index, { dateRead: "" });
	}
	let i = $state(0);
</script>

{#if readingProgress.length > 0}
	<select bind:value={i}>
		{#each readingProgress as progress, j}
			<option value={j}>{progress.book}</option>
		{/each}
	</select>
	<input
		type="date"
		value={readingProgress.at(i)?.dateRead}
	/>
	<button onclick={() => clearRead(i)}> x</button>
{:else}
	<div>Loading reading progress...</div>
{/if}
