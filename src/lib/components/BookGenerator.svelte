<script>
	import data from "$lib/bible-data.json";
	import { db } from "$lib/db";
	import { liveQuery } from "dexie";

	const readingProgress = liveQuery(() =>
		db.readingProgress.where("dateRead").equals("").toArray()
	);
	let useUnreadBooks = $state(false);
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
			onclick={() => getRandomBook()}>CAST LOT</button
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
	.generator-container {
		width: 100%;
		max-width: 480px;
		display: flex;
		flex-direction: column;
		align-items: flex-start; /* Asymmetrical alignment to the left */
		padding: 2rem;
	}

	.result-display {
		/* Hierarchy: Largest text for the result */
		font-size: 3.5rem;
		font-weight: 700;
		line-height: 1.1;
		text-transform: uppercase;
		letter-spacing: -0.05em;
		/* Tight kerning for large type */
		margin-bottom: 4rem;
		min-height: 3.5rem;
		text-align: left;
		/* Use a strong line as an element of the design */
		border-left: 5px solid black;
		padding-left: 1rem;
	}

	.spin-button {
		/* Minimalist, high-contrast action button */
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
		/* Align the button with the text alignment */
		margin-left: 1rem;
	}

	.spin-button:hover {
		background-color: black;
		color: white;
	}

	.spin-button:active {
		transform: translateY(1px);
	}

	/* --- MOBILE ADJUSTMENTS --- */
	@media (max-width: 600px) {
		.generator-container {
			padding: 1rem; /* Reduce overall padding on mobile */
		}

		.result-display {
			/* Substantially reduce the largest text on mobile screens */
			font-size: 2.25rem;
			margin-bottom: 2rem; /* Reduce vertical spacing */
		}
	}
</style>
