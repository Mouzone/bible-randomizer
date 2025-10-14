<script>
	import data from "$lib/bible-data.json";

	let i = $state(0);
	let chapter = $state(1);

	function getRandomChapter() {
		const chaptersToChoose = data[i].chapters;
		chapter = Math.floor(Math.random() * chaptersToChoose);
	}
</script>

<div>
	<select>
		{#each data as book, j}
			<option
				value={j}
				onselect={() => (i = j)}>{book.bookName}</option
			>
		{/each}
	</select>

	<p>
		{#if i}
			{chapter}
		{:else}
			Press the button to generate a random book of the bible
		{/if}
	</p>
	<button onclick={() => getRandomChapter()}>Spin</button>
</div>

<style>
	* {
		padding: 0;
		margin: 0;
	}
	div {
		width: 100%;
		height: 100vh;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
	}
</style>
