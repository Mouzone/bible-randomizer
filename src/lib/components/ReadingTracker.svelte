<script lang="ts">
	import { db } from "$lib/db";
	import { markRead, reset } from "$lib/helper functions/modify-db";
	import { liveQuery } from "dexie";
	import InputView from "./ReadingTracker Components/InputView.svelte";
	import TableView from "./ReadingTracker Components/TableView.svelte";

	const { booksData } = $props();
	const unreadCounts = $derived.by(() => {
		if (!$booksData) {
			return {
				ot: 29,
				nt: 27,
			};
		}

		let otCount = 0;
		let ntCount = 0;

		for (const book of $booksData) {
			if (book.dateRead === "") {
				if (book.testament === "old") {
					otCount++;
				} else if (book.testament === "new") {
					ntCount++;
				}
			}
		}

		return {
			ot: otCount,
			nt: ntCount,
		};
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
	let selectedId = $derived($booksData?.[selectedIndex]?.id);

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

	{#if $booksData}
		{#if viewToRender === "input"}
			<InputView
				bind:selectedIndex
				{booksData}
				{handleDateChange}
			/>
		{:else if viewToRender === "table"}
			<TableView
				bind:selectedIndex
				{booksData}
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
			<span>{unreadCounts.ot}</span>
		</p>
		<p>
			NT:
			<span> {unreadCounts.nt} </span>
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
