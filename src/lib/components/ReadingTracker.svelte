<script lang="ts">
	import { db } from "$lib/db";
	import { markRead, reset } from "$lib/helper functions/modify-db";
	import { liveQuery } from "dexie";
	import InputView from "./ReadingTracker Components/InputView.svelte";
	import TableView from "./ReadingTracker Components/TableView.svelte";

	const readingProgress = liveQuery(() => db.readingProgress.toArray());
	const unreadOt = $derived.by(() => {
		if (!$readingProgress) {
			return 27;
		} else {
			return $readingProgress.filter(
				(book) => book.testament === "old" && book.dateRead === ""
			).length;
		}
	});
	const unreadNt = $derived.by(() => {
		if (!$readingProgress) {
			return 27;
		} else {
			return $readingProgress.filter(
				(book) => book.testament === "new" && book.dateRead === ""
			).length;
		}
	});
	const unreadNT = liveQuery(() =>
		db.readingProgress
			.where(["testament", "dateRead"])
			.equals(["new", ""])
			.count()
	);
	let viewToRender = $state("input");

	let dialogElement: HTMLDialogElement | null = $state(null);

	let selectedIndex = $state(0);
	let selectedId = $derived($readingProgress?.[selectedIndex]?.id);

	function handleConfirm() {
		reset();
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
				<span>ALL</span>
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
			/>
		{:else if viewToRender === "table"}
			<TableView
				bind:selectedIndex
				{readingProgress}
				{handleDateChange}
			/>
		{/if}

		<button
			id="reset-all"
			onclick={() => dialogElement?.showModal()}
		>
			Reset All
		</button>
	{:else}
		<div>Loading reading progress...</div>
	{/if}
	<div id="data-display">
		<span>Unread</span>
		<p>
			OT:
			<span>{unreadOt}</span>
		</p>
		<p>
			NT:
			<span> {unreadNt} </span>
		</p>
	</div>
</div>

<style>
	#modal {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 1em;
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
		bottom: 12em;
	}
	#data-display {
		display: flex;
		gap: 1em;
		align-items: center;
	}
</style>
