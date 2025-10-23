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
			book = $readingProgress[randomIndex].name;
		} else {
			const randomIndex = Math.floor(Math.random() * data.length);
			book = data[randomIndex].name;
		}
	}
</script>

<div id="component">
	{#if $readingProgress}
		<div id="generator-container">
			<p id="result-display">
				{#if book}
					{book}
				{:else}
					Nothing
				{/if}
			</p>
			<div id="space-container">
				<button onclick={() => getRandomBook()}>Cast Lot</button>
			</div>
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
		<span>Only unread books</span>
	</label>
</div>

<style>
	#generator-container {
		width: 20em;
		display: flex;
		align-items: center;
		justify-content: center;
		gap: 1em;
		margin-bottom: 0.5em;
	}
	#result-display {
		flex: 1 0 50%;
		text-align: right;
	}
	#space-container {
		flex: 0 0 50%;
		justify-content: left;
	}
	#loading-text {
		text-align: center;
	}
	#switch {
		display: flex;
		justify-content: center;
		gap: 0.5em;
	}
	@media (max-width: 640px) {
		#generator-container {
			width: 15em;
			flex-direction: column;
			gap: 0;
			margin-bottom: 1em;
		}
	}
</style>
