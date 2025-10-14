<script>
	import BookGenerator from "$lib/components/BookGenerator.svelte";
	import ChapterGenerator from "$lib/components/ChapterGenerator.svelte";
	let componentToShow = $state("book");
</script>

<div id="page">
	<div id="button-container">
		<button
			class:active={componentToShow === "book"}
			onclick={() => (componentToShow = "book")}
		>
			Generate book
		</button>
		<button
			class:active={componentToShow === "chapter"}
			onclick={() => (componentToShow = "chapter")}
		>
			Generate chapter
		</button>
	</div>

	{#if componentToShow === "book"}
		<BookGenerator />
	{:else}
		<ChapterGenerator />
	{/if}
</div>

<style>
	/* Global Reset & Swiss Typography */
	:global(body) {
		margin: 0;
		padding: 0;
		/* Using a clean, neutral sans-serif (Inter/Helvetica/Arial) */
		font-family: "Inter", "Helvetica Neue", Helvetica, Arial, sans-serif;
		color: black;
		background-color: white;
		line-height: 1.4;
	}

	#page {
		width: 100%;
		height: 100vh;
		display: flex;
		flex-direction: column;
		align-items: center;
		box-sizing: border-box;
		padding-top: 10vh;
		/* Increase negative space at the top */
	}

	/* Navigation Buttons: Clean, Grid-Aligned */
	#button-container {
		display: flex;
		border-bottom: 2px solid black;
		/* Strong separator line */
		margin-bottom: 4rem; /* Increase vertical spacing */
	}

	button {
		/* Objective, clean typography */
		background: white;
		border: 1px solid transparent; /* Neutral starting point */
		padding: 0.5rem 1.5rem;
		cursor: pointer;
		font-size: 1rem;
		font-weight: 500;
		letter-spacing: 0.1em;
		text-transform: uppercase; /* Use caps for navigation clarity */
		transition: all 0.1s;
	}

	/* Active State: Defined by contrast, not complex decoration */
	button.active {
		background-color: black;
		color: white;
		border-color: black;
	}

	button:not(.active):hover {
		background-color: #f0f0f0;
	}

	/* --- MOBILE ADJUSTMENTS --- */
	@media (max-width: 600px) {
		#page {
			padding-top: 5vh; /* Reduce top padding on small screens to save vertical space */
		}

		#button-container {
			margin-bottom: 2.5rem; /* Reduce spacing between nav and generator */
		}

		button {
			font-size: 0.9rem; /* Slightly smaller text for button to fit on smaller screens */
			padding: 0.5rem 1rem; /* Adjust padding */
		}
	}
</style>
