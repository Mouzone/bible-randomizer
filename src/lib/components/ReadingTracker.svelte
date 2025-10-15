<script>
	import { liveQuery } from "dexie";
	import { db } from "$lib/db";

	let readingProgress = liveQuery(() => db.readingProgress.toArray());
</script>

<ul>
	{#if $readingProgress}
		{#each $readingProgress as progress (progress.id)}
			<li>{progress.book}</li>
		{/each}
	{/if}
</ul>
