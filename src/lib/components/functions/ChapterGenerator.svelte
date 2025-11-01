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

<div id="component">
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

		<div id="result-display-container">
			{#key animationKey}
				<p
					in:fly={{ y: 20, duration: 200, delay: 200 }}
					out:fly={{ y: -20, duration: 200 }}
					id="result-display"
				>
					{chapter}
				</p>
			{/key}
		</div>
	</div>

	<GenerateButton generatorFunc={getRandomChapter} />
</div>

<style>
	#component {
		display: flex;
		flex-direction: column;
		align-items: center;
	}
	#display-group {
		height: 3em;
		width: 15em;
		display: flex;
		align-items: center;
		justify-content: center;

		gap: 1em;
		margin-top: 3em;
		margin-bottom: 0.75em;
	}
	select {
		padding: 2px;
		text-align: right;
	}
	#result-display-container {
		width: 20%;
	}

	@media (max-width: 640px) {
		#component {
			gap: 1.5em;
		}
		#display-group {
			flex-direction: column;
			gap: 0;
		}
		select {
			order: 1;
		}
		#result-display-container {
			height: 3em;
		}
		#result-display {
			text-align: center;
		}
	}
</style>
