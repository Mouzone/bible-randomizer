<script lang="ts">
	import BookGenerator from "$lib/components/functions/BookGenerator.svelte";
	import ChapterGenerator from "$lib/components/functions/ChapterGenerator.svelte";
	import ReadingTracker from "$lib/components/functions/ReadingTracker.svelte";
	import rawLayoutData from "$lib/data/navigation-layout.json";
	import navButtonText from "$lib/data/navigation-text.json";
	import DarkModeButton from "$lib/components/DarkModeButton.svelte";

	import { db } from "$lib/db/db";
	import { liveQuery } from "dexie";

	const books = liveQuery(() => db.readingProgress.toArray());
	const unread = $derived.by(() => {
		if (!$books) {
			return {
				books: [],
				otCount: 29,
				ntCount: 27,
			};
		}

		let otCount = 0;
		let ntCount = 0;
		let unreadBooks = [];
		for (const book of $books) {
			if (book.dateRead === "") {
				unreadBooks.push(book);
				if (book.testament === "old") {
					otCount++;
				} else if (book.testament === "new") {
					ntCount++;
				}
			}
		}

		return {
			books: unreadBooks,
			otCount,
			ntCount,
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
