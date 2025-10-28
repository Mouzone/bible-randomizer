<script lang="ts">
	import BookGenerator from "$lib/components/functions/BookGenerator.svelte";
	import ChapterGenerator from "$lib/components/functions/ChapterGenerator.svelte";
	import ReadingTracker from "$lib/components/functions/ReadingTracker.svelte";
	import DarkModeButton from "$lib/components/DarkModeButton.svelte";

	import rawLayoutData from "$lib/data/navigation-layout.json";
	import navButtonText from "$lib/data/navigation-text.json";
	import initalState from "$lib/data/bible-data.json";

	let books = $state(initalState);
	if (typeof window !== "undefined") {
		const storedState = localStorage.getItem("bibleProgress");
		if (storedState !== null) {
			books = JSON.parse(storedState);
		}
	}

	$effect(() => {
		if (typeof window !== "undefined") {
			localStorage.setItem("bibleProgress", JSON.stringify(books));
		}
	});

	const unread = $derived.by(() => {
		let otCount = 39;
		let ntCount = 27;
		let unreadBooks: Books = [];
		books.forEach((book) => {
			if (book.dateRead !== "") {
				if (book.testament === "old") {
					otCount -= 1;
				} else if (book.testament === "new") {
					ntCount -= 1;
				}
			} else {
				unreadBooks.push(book);
			}
		});

		return {
			otCount,
			ntCount,
			books: unreadBooks,
		};
	});

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
		<BookGenerator
			{books}
			unread={unread.books}
		/>
	{:else if componentToShow == "ChapterGenerator"}
		<ChapterGenerator {books} />
	{:else}
		<ReadingTracker
			{books}
			otCount={unread.otCount}
			ntCount={unread.ntCount}
		/>
	{/if}

	<button
		id="right"
		onclick={() => (componentToShow = rightComponent)}
		>{navButtonText[rightComponent]}</button
	>
	<DarkModeButton />
</div>

<style>
	#page {
		height: 100dvh;
		margin: 0;
		padding: 0;

		display: flex;
		justify-content: space-between;
		align-items: center;
	}
	#left {
		margin-left: 1em;
	}
	#right {
		margin-right: 1em;
	}
</style>
