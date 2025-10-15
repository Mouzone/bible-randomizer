<script>
	import { db } from "$lib/db";
	import {
		clearRead,
		markRead,
		reset,
	} from "$lib/helper functions/modify-db";
	import { liveQuery } from "dexie";

	const readingProgress = liveQuery(() => db.readingProgress.toArray());

	let selectedIndex = $state(0);
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
			markRead(
				$readingProgress[selectedIndex].id,
				event.currentTarget.value
			)}
	/>
	<button onclick={() => clearRead($readingProgress[selectedIndex].id)}>
		x</button
	>
	<button onclick={() => reset()}> Reset </button>
{:else}
	<div>Loading reading progress...</div>
{/if}
