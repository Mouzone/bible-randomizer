<script lang="ts">
	import { db } from "$lib/db";
	import {
		clearRead,
		markRead,
		reset,
	} from "$lib/helper functions/modify-db";
	import { liveQuery } from "dexie";

	const readingProgress = liveQuery(() => db.readingProgress.toArray());
	let dialogElement: HTMLDialogElement | null = $state(null);
	let dialogMode: "reset" | "mark unread" = $state("reset");
	let selectedIndex = $state(0);
	let selectedId = $derived($readingProgress?.[selectedIndex]?.id);

	function showDialog(mode: "reset" | "mark unread") {
		dialogMode = mode;
		dialogElement?.showModal();
	}
	function handleConfirm() {
		dialogMode === "mark unread" ? clearRead(selectedId) : reset();

		dialogElement?.close();
	}
	function handleDateChange(event: Event) {
		const date = (event.currentTarget as HTMLInputElement).value;
		markRead(selectedId, date);
	}
</script>

{#if $readingProgress}
	<div id="modal">
		<dialog bind:this={dialogElement}>
			<p>
				Reset reading status for
				<span>
					{#if dialogMode === "mark unread"}
						{$readingProgress[selectedIndex].book}
					{:else if dialogMode === "reset"}
						<span>ALL</span>
					{/if}
				</span>
			</p>
			<div>
				<button onclick={() => dialogElement?.close()}> Cancel </button>
				<button
					id="confirm"
					onclick={handleConfirm}>Confirm</button
				>
			</div>
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
					onchange={handleDateChange}
				/>
			</div>
			<button onclick={() => showDialog("mark unread")}>
				Mark Unread
			</button>
		</div>

		<button
			id="reset-all"
			onclick={() => showDialog("reset")}
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
		border: none;
		border-radius: 5px;
		padding: 2em;
	}
	p {
		text-align: center;
	}
	span {
		font-weight: bold;
	}
	dialog > div {
		display: flex;
		justify-content: center;
		gap: 1em;
	}
	#confirm {
		background-color: red;
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
