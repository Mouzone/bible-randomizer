<script lang="ts">
	import { db } from "$lib/db";
	import {
		clearRead,
		markRead,
		reset,
	} from "$lib/helper functions/modify-db";
	import { liveQuery } from "dexie";

	const readingProgress = liveQuery(() => db.readingProgress.toArray());
	let dialogElement: HTMLDialogElement;
	let dialogMode = $state("reset");
	let selectedIndex = $state(0);
</script>

{#if $readingProgress}
	<div id="modal">
		<dialog bind:this={dialogElement}>
			<button onclick={() => dialogElement.close()}> Cancel </button>
			<button
				onclick={() => {
					if (dialogMode === "mark unread") {
						clearRead($readingProgress[selectedIndex].id);
					} else if (dialogMode === "reset") {
						reset();
					}
					dialogElement.close();
				}}>Confirm</button
			>
		</dialog>
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
				onclick={() => {
					dialogMode = "mark unread";
					dialogElement.showModal();
				}}
			>
				Mark Unread
			</button>
		</div>

		<button
			id="reset-all"
			onclick={() => {
				dialogMode = "reset";
				dialogElement.showModal();
			}}
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
	dialog {
		background-color: white;
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
		background-color: red;
		bottom: 10em;
	}
	@media (max-width: 640px) {
		#selection-group {
			display: flex;
			flex-direction: column;
			gap: 1em;
		}
	}
</style>
