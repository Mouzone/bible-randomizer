<script>
	import BookGenerator from "$lib/components/BookGenerator.svelte";
	import ChapterGenerator from "$lib/components/ChapterGenerator.svelte";
	let componentToShow = $state("book");
</script>

<div>
	<button onclick={() => (componentToShow = "book")}>Generate book</button>
	<button onclick={() => (componentToShow = "chapter")}
		>Generate chapter</button
	>
</div>
{#if componentToShow === "book"}
	<BookGenerator />
{:else}
	<ChapterGenerator />
{/if}
