<script lang="ts">
	import InputView from "./InputView.svelte";
	import TableView from "./TableView.svelte";
	import { fly } from "svelte/transition";
	import initialState from "$lib/data/bible-data.json";

	let { books = $bindable(), otCount, ntCount } = $props();

	let viewToRender = $state("input");

	let dialogElement: HTMLDialogElement | null = $state(null);

	function handleConfirm() {
		books = initialState;
		if (typeof window !== "undefined") {
			localStorage.setItem("bibleProgress", JSON.stringify(books));
		}
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

	<div class="transition-wrapper">
		{#key viewToRender}
			<div
				in:fly={{ x: 20, duration: 300, delay: 300 }}
				out:fly={{ x: -20, duration: 300 }}
				class="view-container"
			>
				{#if viewToRender === "input"}
					<InputView bind:books />
				{:else if viewToRender === "table"}
					<TableView bind:books />
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
		justify-content: space-between;
		align-items: center;
		gap: 1em;
		height: 22em;
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
