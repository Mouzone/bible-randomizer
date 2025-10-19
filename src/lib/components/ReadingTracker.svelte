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
	<div id="modal">
		<div id="function">
			<div id="selection-group">
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
			</div>
			<button
				onclick={() => clearRead($readingProgress[selectedIndex].id)}
			>
				Mark Unread
			</button>
		</div>

		<button
			id="reset-all"
			onclick={() => reset()}
		>
			Reset All
		</button>
	</div>
{:else}
	<div>Loading reading progress...</div>
{/if}

<style>
	#modal {
		display: flex;
		flex-direction: column;
		align-items: center;
	}
	#function {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 1em;
	}
	select {
		text-align: right;
	}
	#reset-all {
		position: absolute;
		width: 8em;
		background-color: red;
		border-radius: 5px;
		bottom: 10em;
	}
</style>
