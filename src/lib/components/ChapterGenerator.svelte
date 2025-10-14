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
		<div class="select-wrapper">
			<select
				bind:value={i}
				class="minimal-select"
			>
				{#each data as book, j}
					<option value={j}>{book.bookName}</option>
				{/each}
			</select>
		</div>

		<p class="chapter-display">
			CHAPTER: <span class="chapter-number">{chapter}</span>
		</p>
	</div>

	<button
		class="spin-button"
		onclick={() => getRandomChapter()}>CAST LOT</button
	>
</div>

<style>
	.generator-container {
		width: 100%;
		max-width: 600px;
		display: flex;
		flex-direction: column;
		align-items: center;

		padding: 2rem;
	}

	.display-group {
		width: 52%;
		display: flex;
		justify-content: space-between;

		align-items: center;
		gap: 1rem;
		margin-bottom: 2rem;
	}

	.select-wrapper {
		flex: 1;
		height: 5.5rem;
		display: flex;
		align-items: center;
		/* FIX: Set a maximum width for the wrapper to control the select's size */
		max-width: 180px;
		/* Adjust this value (e.g., 350px) to comfortably fit your longest book name */
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
		/* IMPORTANT: Setting width: 100% here ensures it takes the size of its parent (.select-wrapper) */
		width: 100%;
		font-family: inherit;
		text-transform: uppercase;
		flex-grow: 1;
	}

	.chapter-display {
		font-size: 0.8rem;
		font-weight: 600;
		text-transform: uppercase;
		letter-spacing: 0.1em;
		display: flex;
		flex-direction: column;
		align-items: flex-end;
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
		margin-left: 0;
	}

	.spin-button:hover {
		background-color: black;
		color: white;
	}

	/* --- MOBILE ADJUSTMENTS --- */
	@media (max-width: 600px) {
		.generator-container {
			padding: 1rem;
			max-width: 100%; /* Allow it to take up more horizontal space if needed */
		}

		.display-group {
			width: 100%; /* Take full width on mobile */
			flex-direction: column; /* Stack select and chapter display vertically */
			align-items: center;
			gap: 2rem; /* Increase gap for vertical stacking */
			margin-bottom: 3rem;
		}

		.select-wrapper {
			max-width: 300px; /* Give the select a reasonable maximum width, wider than before */
			width: 80%; /* Ensure it's responsive within the 100% display-group */
			height: auto; /* Reset fixed height */
		}

		.chapter-display {
			align-items: center; /* Center the text when it's on its own line */
		}

		.chapter-number {
			font-size: 3rem; /* Reduce the large chapter number text */
		}

		.spin-button {
			/* Make the button full width to be a clear touch target */
			width: 80%;
			max-width: 300px;
		}
	}
</style>
