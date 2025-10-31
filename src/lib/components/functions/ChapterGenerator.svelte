<script>
	import { fade, fly } from "svelte/transition";
	import GenerateButton from "../GenerateButton.svelte";

	const { books } = $props();
	let selectedIndex = $state(18);
	let chapter = $state(0);
	let animationKey = $state(0);
	function getRandomChapter() {
		const chaptersToChoose = books[selectedIndex].chapters;
		chapter = Math.floor(Math.random() * chaptersToChoose) + 1;
		animationKey += 1;
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

		<div id="chapter-display-container">
			{#key animationKey}
				<p
					in:fly={{ y: 20, duration: 300, delay: 300 }}
					out:fly={{ y: -20, duration: 300 }}
					id="chapter-display"
				>
					{chapter}
				</p>
			{/key}
		</div>
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
		flex: 0 0 50%;
		text-align: right;
	}
	#chapter-display-container {
		min-height: 1rem;
		display: flex;
		align-items: center;

		width: 3em;
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
