<script>
	import data from "$lib/bible-data.json";

	let i = $state(18);
	let chapter = $state(0);

	function getRandomChapter() {
		const chaptersToChoose = data[i].chapters;
		chapter = Math.floor(Math.random() * chaptersToChoose) + 1;
	}
</script>

<div id="generator-container">
	<div id="display-group">
		<div id="select-wrapper">
			<select
				bind:value={i}
				id="minimal-select"
			>
				{#each data as book, j}
					<option value={j}>{book.bookName}</option>
				{/each}
			</select>
		</div>

		<p id="chapter-display">
			CHAPTER: <span id="chapter-number">{chapter}</span>
		</p>
	</div>

	<button
		id="spin-button"
		onclick={() => getRandomChapter()}>Cast Lot</button
	>
</div>

<style>
	#
</style>
