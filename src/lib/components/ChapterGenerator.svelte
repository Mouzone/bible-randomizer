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

<div id="modal">
	<div id="display">
		<select bind:value={i}>
			{#each data as book, j}
				<option value={j}>{book.bookName}</option>
			{/each}
		</select>

		<p>
			{chapter}
		</p>
	</div>

	<button onclick={() => getRandomChapter()}>Spin</button>
</div>

<style>
	#modal {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
	}
	#display {
		width: 100%;
		display: flex;
		gap: 1em;
		align-items: center;
	}
</style>
