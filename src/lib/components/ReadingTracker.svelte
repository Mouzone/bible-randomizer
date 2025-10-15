<script>
	import { liveQuery } from "dexie";
	import { db } from "$lib/db";

	const readingProgress = liveQuery(() => db.readingProgress.toArray());

	let selectedIndex = $state(0);

	async function markRead(id, date) {
		await db.readingProgress.update(id, { dateRead: date });
	}

	async function clearRead(id) {
		await db.readingProgress.update(id, { dateRead: "" });
	}
</script>

{#if $readingProgress}
	<select bind:value={selectedIndex}>
		{#each $readingProgress as progress, i}
			<option value={i}>{progress.book}</option>
		{/each}
	</select>
	<input
		type="date"
		value={$readingProgress[selectedIndex]?.dateRead}
		onchange={(event) =>
			markRead($readingProgress[selectedIndex].id, event?.target.value)}
	/>
	<button onclick={() => clearRead($readingProgress[selectedIndex].id)}>
		x</button
	>
{:else}
	<div>Loading reading progress...</div>
{/if}
