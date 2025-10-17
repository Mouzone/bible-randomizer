<script>
	import data from "$lib/bible-data.json";
	import { db } from "$lib/db";
	import { liveQuery } from "dexie";

	const readingProgress = liveQuery(() =>
		db.readingProgress.where("dateRead").equals("").toArray()
	);
	let useUnreadBooks = $state(true);
	let book = $state("");

	function getRandomBook() {
		if (useUnreadBooks) {
			const randomIndex = Math.floor(
				Math.random() * $readingProgress.length
			);
			book = $readingProgress[randomIndex].book;
		} else {
			const randomIndex = Math.floor(Math.random() * data.length);
			book = data[randomIndex].bookName;
		}
	}
</script>

<div id="component">
	{#if $readingProgress}
		<div id="generator-container">
			<p class="result-display">
				{#if book}
					{book}
				{:else}
					Nothing
				{/if}
			</p>
			<button
				class="spin-button"
				onclick={() => getRandomBook()}>Cast Lot</button
			>
		</div>
	{:else}
		<p id="loading-text">Loading...</p>
	{/if}
	<label id="switch">
		<input
			type="checkbox"
			id="generateFromUnread"
			bind:checked={useUnreadBooks}
		/>
		<span class="toggle-text">Only unread books</span>
	</label>
</div>

<style>
	#component {
		width: 12em;
		display: flex;
		flex-direction: column;
	}
	#generator-container {
		display: flex;
		align-items: center;
		justify-content: space-between;

		gap: 1em;
	}
	#loading-text {
		text-align: center;
	}
	button {
		height: 2em;
	}
	#switch {
		align-self: center;
	}
</style>
