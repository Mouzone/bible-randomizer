<script>
	import data from "$lib/bible-data.json";

	let i = $state(18);
	let chapter = $state(0);

	function getRandomChapter() {
		const chaptersToChoose = data[i].chapters;
		chapter = Math.floor(Math.random() * chaptersToChoose);
		console.log(i, data[i]);
	}
</script>

<div>
	<select bind:value={i}>
		{#each data as book, j}
			<option value={j}>{book.bookName}</option>
		{/each}
	</select>

	<p>
		{chapter}
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
