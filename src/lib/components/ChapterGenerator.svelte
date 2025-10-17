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
		onclick={() => getRandomChapter()}>Cast Lot</button
	>
</div>

<style>
</style>
