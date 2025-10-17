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

<div class="generator-container">
	{#if $readingProgress}
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
	{/if}
	<label class="switch">
		<input
			type="checkbox"
			id="generateFromUnread"
			bind:checked={useUnreadBooks}
		/>
		<span class="toggle-text">Only unread books</span>
	</label>
</div>

<style>
</style>
