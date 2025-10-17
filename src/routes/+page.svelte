<script>
	import BookGenerator from "$lib/components/BookGenerator.svelte";
	import ChapterGenerator from "$lib/components/ChapterGenerator.svelte";
	import ReadingTracker from "$lib/components/ReadingTracker.svelte";
	let componentToShow = $state("book");
</script>

<div id="page">
	<!-- <BookGenerator /> -->
	<!-- <ChapterGenerator /> -->
	<ReadingTracker />
</div>

<style>
	#page {
		height: 100vh;
		margin: 0;
		padding: 0;

		display: flex;
		justify-content: center;
		align-items: center;
	}
</style>
