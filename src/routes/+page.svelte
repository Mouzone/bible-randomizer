<script>
	import BookGenerator from "$lib/components/BookGenerator.svelte";
	import ChapterGenerator from "$lib/components/ChapterGenerator.svelte";
	import ReadingTracker from "$lib/components/ReadingTracker.svelte";
	let componentToShow = $state("book");
</script>

<div id="page">
	<BookGenerator />
	<ChapterGenerator />
</div>
<ReadingTracker />

<style>
</style>
