<script>
	import BookGenerator from "$lib/components/BookGenerator.svelte";
	import ChapterGenerator from "$lib/components/ChapterGenerator.svelte";
	let componentToShow = $state("book");
</script>

<div id="page">
	<div id="button-container">
		<button onclick={() => (componentToShow = "book")}>Generate book</button
		>
		<button onclick={() => (componentToShow = "chapter")}
			>Generate chapter</button
		>
	</div>

	{#if componentToShow === "book"}
		<BookGenerator />
	{:else}
		<ChapterGenerator />
	{/if}
</div>

<style>
	#page {
		width: 100%;
		height: 100vh;
		display: flex;
		flex-direction: column;
		align-items: center;
		box-sizing: border-box;
	}
	#button-container {
		display: flex;
	}
</style>
