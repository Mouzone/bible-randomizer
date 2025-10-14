<script>
	import data from "$lib/bible-data.json";

	let book = $state("");

	function getRandomBook() {
		const randomIndex = Math.floor(Math.random() * data.length);
		book = data[randomIndex].bookName;
	}
</script>

<div>
	<p>
		{#if book}
			{book}
		{:else}
			Press the button to generate a random book of the bible
		{/if}
	</p>
	<button onclick={() => getRandomBook()}>Spin</button>
</div>

<style>
	div {
		width: 100%;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
	}
</style>
