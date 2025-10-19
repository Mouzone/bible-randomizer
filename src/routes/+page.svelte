<script>
	import BookGenerator from "$lib/components/BookGenerator.svelte";
	import ChapterGenerator from "$lib/components/ChapterGenerator.svelte";
	import ReadingTracker from "$lib/components/ReadingTracker.svelte";
	import layoutData from "$lib/navigation-layout.json";
	import navButtonText from "$lib/navigation-text.json";
	let componentToShow = $state("BookGenerator");
	let leftComponent = $derived(layoutData[componentToShow]["left"]);
	let rightComponent = $derived(layoutData[componentToShow]["right"]);
</script>

<div id="page">
	<button onclick={() => (componentToShow = leftComponent)}
		>{navButtonText[leftComponent]}</button
	>
	{#if componentToShow === "BookGenerator"}
		<BookGenerator />
	{:else if componentToShow == "ChapterGenerator"}
		<ChapterGenerator />
	{:else}
		<ReadingTracker />
	{/if}
	<button onclick={() => (componentToShow = rightComponent)}
		>{navButtonText[rightComponent]}</button
	>
</div>

<style>
	#page {
		height: 100vh;
		margin: 0;
		padding: 0;

		display: flex;
		justify-content: space-between;
		align-items: center;
	}
	button {
		width: 5em;
		margin: 1em;
	}
</style>
