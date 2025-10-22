<script lang="ts">
	import { db } from "$lib/db";
	import {
		clearRead,
		markRead,
		reset,
	} from "$lib/helper functions/modify-db";
	import { liveQuery } from "dexie";
	import InputView from "./ReadingTracker Components/InputView.svelte";
	import TableView from "./ReadingTracker Components/TableView.svelte";

	const readingProgress = liveQuery(() => db.readingProgress.toArray());

	let viewToRender = $state("input");

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

	<div id="view-mode">
		<p>Mode:</p>
		<select bind:value={viewToRender}>
			<option value="input">Input</option>
			<option value="table">Table</option>
		</select>
	</div>

	{#if $readingProgress}
		{#if viewToRender === "input"}
			<InputView
				bind:selectedIndex
				{readingProgress}
				{handleDateChange}
				{showDialog}
			/>
		{:else if viewToRender === "table"}
			<TableView
				bind:selectedIndex
				{readingProgress}
				{handleDateChange}
				{showDialog}
			/>
		{/if}

		<button
			id="reset-all"
			onclick={() => showDialog("reset")}
		>
			Reset All
		</button>
	{:else}
		<div>Loading reading progress...</div>
	{/if}
</div>

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
	#view-mode {
		display: flex;
		align-items: center;

		gap: 0.5em;
	}
	#confirm {
		background-color: red;
	}

	#reset-all {
		position: absolute;
		background-color: red;
		bottom: 10em;
	}
</style>
