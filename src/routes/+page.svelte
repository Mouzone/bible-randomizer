<script lang="ts">
	import BookGenerator from "$lib/components/BookGenerator.svelte";
	import ChapterGenerator from "$lib/components/ChapterGenerator.svelte";
	import ReadingTracker from "$lib/components/ReadingTracker.svelte";
	import rawLayoutData from "$lib/navigation-layout.json";
	import navButtonText from "$lib/navigation-text.json";

	type Components = "BookGenerator" | "ChapterGenerator" | "ReadingTracker";
	type LayoutEntry = {
		left: Components;
		right: Components;
	};
	type LayoutData = Record<Components, LayoutEntry>;
	const layoutData = rawLayoutData as LayoutData;

	let componentToShow: Components = $state("BookGenerator");
	let leftComponent: Components = $derived(
		layoutData[componentToShow]["left"]
	);
	let rightComponent: Components = $derived(
		layoutData[componentToShow]["right"]
	);
</script>

<div id="page">
	<button
		id="left"
		onclick={() => (componentToShow = leftComponent)}
		>{navButtonText[leftComponent]}</button
	>
	{#if componentToShow === "BookGenerator"}
		<BookGenerator />
	{:else if componentToShow == "ChapterGenerator"}
		<ChapterGenerator />
	{:else}
		<ReadingTracker />
	{/if}
	<button
		id="right"
		onclick={() => (componentToShow = rightComponent)}
		>{navButtonText[rightComponent]}</button
	>
</div>

<style>
	#page {
		font-family: monospace;
		height: 100vh;
		margin: 0;
		padding: 0;

		display: flex;
		justify-content: space-between;
		align-items: center;
	}
	button {
		width: 7em;
		padding: 0.5em;
	}
	#left {
		margin-left: 1em;
	}
	#right {
		margin-right: 1em;
	}
	@media (max-width: 640px) {
		#page {
			height: 85vh;
		}
	}
</style>
