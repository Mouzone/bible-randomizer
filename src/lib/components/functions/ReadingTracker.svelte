<script lang="ts">
	import { reset } from "$lib/db/modify-db";
	import InputView from "./ReadingTracker Components/InputView.svelte";
	import TableView from "./ReadingTracker Components/TableView.svelte";
	import { fly } from "svelte/transition";

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
		<div class="transition-wrapper">
			{#key viewToRender}
				<div
					in:fly={{ y: 20, duration: 300, delay: 300 }}
					out:fly={{ y: -20, duration: 300 }}
					class="view-container"
				>
					{#if viewToRender === "input"}
						<InputView {booksData} />
					{:else if viewToRender === "table"}
						<TableView {booksData} />
					{/if}
				</div>
			{/key}
		</div>

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

	.transition-wrapper {
		display: grid;
		place-items: center;
		width: 100%;
		overflow: hidden;
	}

	.view-container {
		grid-area: 1 / 1;

		width: 100%;
		display: flex;
		justify-content: center;
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
