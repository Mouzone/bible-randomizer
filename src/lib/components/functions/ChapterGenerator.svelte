<script>
	import GenerateButton from "../GenerateButton.svelte";

	const { books } = $props();
	let selectedIndex = $state(18);
	let chapter = $state(0);

	function getRandomChapter() {
		const chaptersToChoose = books[selectedIndex].chapters;
		chapter = Math.floor(Math.random() * chaptersToChoose) + 1;
	}
</script>

<div id="generator-container">
	<div id="display-group">
		<select
			bind:value={selectedIndex}
			id="minimal-select"
			onchange={() => (chapter = 0)}
		>
			{#each books as book, index}
				<option value={index}>{book.name}</option>
			{/each}
		</select>

		<p id="chapter-display">
			{chapter}
		</p>
	</div>

	<GenerateButton generatorFunc={getRandomChapter} />
</div>

<style>
	#generator-container {
		display: flex;
		flex-direction: column;
		align-items: center;
	}
	#display-group {
		width: 15em;
		display: flex;
		align-items: center;
		justify-content: center;

		gap: 0.75em;
	}
	select {
		padding: 2px 0px 2px 2px;
		flex: 0 1 50%;
		text-align: right;
	}
	#chapter-display {
		flex: 1 1 50%;
		text-align: left;
	}

	@media (max-width: 640px) {
		#display-group {
			flex-direction: column;
			gap: 0.5em;
			margin-bottom: 1em;
		}
		select {
			order: 1;
		}
		#chapter-display {
			order: 0;
			margin: 0;
		}
	}
</style>
