<script>
	const { booksData, unread } = $props();

	let useUnreadBooks = $state(true);
	let book = $state("Nothing");

	function getRandomBook() {
		if (useUnreadBooks) {
			const randomIndex = Math.floor(Math.random() * unread.length);
			book = unread[randomIndex].name;
		} else {
			const randomIndex = Math.floor(Math.random() * $booksData.length);
			book = $booksData[randomIndex].name;
		}
	}
</script>

<div id="component">
	<div id="generator-container">
		<p id="result-display">
			{book}
		</p>
		<div id="space-container">
			<button
				onclick={() => getRandomBook()}
				disabled={!$booksData}>Cast Lot</button
			>
		</div>
	</div>

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
		margin-top: 2em;
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
	#switch {
		margin-top: 1em;
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
