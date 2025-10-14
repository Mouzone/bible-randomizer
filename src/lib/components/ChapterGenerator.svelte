<script>
	import data from "$lib/bible-data.json";

	let i = $state(18);
	let chapter = $state(0);

	function getRandomChapter() {
		const chaptersToChoose = data[i].chapters;
		chapter = Math.floor(Math.random() * chaptersToChoose) + 1;
	}
</script>

<div class="generator-container">
	<div class="display-group">
		<select
			bind:value={i}
			class="minimal-select"
		>
			{#each data as book, j}
				<option value={j}>{book.bookName}</option>
			{/each}
		</select>

		<p class="chapter-display">
			Chapter: <span class="chapter-number">{chapter}</span>
		</p>
	</div>

	<button
		class="spin-button"
		onclick={() => getRandomChapter()}>SPIN CHAPTER</button
	>
</div>

<style>
	.generator-container {
		width: 100%;
		max-width: 600px;
		display: flex;
		flex-direction: column;
		align-items: flex-start;
		padding: 2rem;
	}

	.display-group {
		width: 100%;
		display: flex;
		justify-content: space-between;
		/* FIX: Vertically center the items relative to each other */
		align-items: center;
		gap: 2rem;
		margin-bottom: 4rem;
	}

	/* Select Wrapper: Ensures the label and select are styled together */
	.select-wrapper {
		flex: 1;
		display: flex;
		flex-direction: column;
		align-items: flex-start;
	}

	label {
		font-size: 0.8rem;
		font-weight: 600;
		text-transform: uppercase;
		letter-spacing: 0.1em;
		margin-bottom: 0.5rem;
	}

	/* Minimalist Select Styling */
	.minimal-select {
		padding: 0.75rem 0.5rem;
		font-size: 1rem;
		border: 2px solid black;
		background-color: white;
		border-radius: 0;
		appearance: none;
		cursor: pointer;
		width: 100%;
		font-family: inherit;
		text-transform: uppercase;
	}

	/* Chapter Result Box: Structured Data Display */
	.chapter-result-box {
		display: flex;
		flex-direction: column;
		align-items: flex-end;
		min-width: 150px;
		/* Removed padding-top: 2rem; to allow vertical centering */
	}

	.label {
		font-size: 0.8rem;
		font-weight: 600;
		text-transform: uppercase;
		letter-spacing: 0.1em;
	}

	.chapter-number {
		font-weight: 700;
		font-size: 4rem;
		line-height: 1;
		margin-top: 0.1em;
	}

	/* Button Styling (Consistent) */
	.spin-button {
		background-color: white;
		color: black;
		border: 2px solid black;
		padding: 1rem 2.5rem;
		cursor: pointer;
		font-size: 1.1rem;
		font-weight: 600;
		text-transform: uppercase;
		letter-spacing: 0.15em;
		transition: background-color 0.1s;

		/* Align button to the same column as the select input for the grid */
		margin-left: 0;
	}

	.spin-button:hover {
		background-color: black;
		color: white;
	}
</style>
