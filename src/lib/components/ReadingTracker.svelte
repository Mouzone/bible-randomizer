<script lang="ts">
	import { markRead, reset } from "$lib/helper functions/modify-db";
	import InputView from "./ReadingTracker Components/InputView.svelte";
	import TableView from "./ReadingTracker Components/TableView.svelte";

	const { booksData, otCount, ntCount } = $props();

	let viewToRender = $state("input");

	let dialogElement: HTMLDialogElement | null = $state(null);

	function handleConfirm() {
		reset();
		dialogElement?.close();
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
			<InputView {booksData} />
		{:else if viewToRender === "table"}
			<TableView {booksData} />
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
			<span>{otCount}</span>
		</p>
		<p>
			NT:
			<span> {ntCount} </span>
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
