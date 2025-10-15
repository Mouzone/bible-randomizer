<script>
	import { liveQuery } from "dexie";
	import { db } from "$lib/db";

	const readingProgress = liveQuery(() => db.readingProgress.toArray());

	async function markRead(index, date) {
		await db.readingProgress.update(index, { dateRead: date });
	}

	async function clearRead(index) {
		await db.readingProgress.update(index, { dateRead: "" });
	}
	let i = $state(0);
</script>

<!-- fix the usage of index, since id and index are not necessarily the same -->
{#if $readingProgress}
	<select bind:value={i}>
		{#each $readingProgress as progress, j}
			<option value={j}>{progress.book}</option>
		{/each}
	</select>
	<input
		type="date"
		value={$readingProgress.at(i)?.dateRead}
		onchange={(event) => markRead(i, event?.target.value)}
	/>
	<button onclick={() => clearRead(i)}> x</button>
{:else}
	<div>Loading reading progress...</div>
{/if}
