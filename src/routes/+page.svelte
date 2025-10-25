<script lang="ts">
	import BookGenerator from "$lib/components/BookGenerator.svelte";
	import ChapterGenerator from "$lib/components/ChapterGenerator.svelte";
	import ReadingTracker from "$lib/components/ReadingTracker.svelte";
	import rawLayoutData from "$lib/navigation-layout.json";
	import navButtonText from "$lib/navigation-text.json";

	import { db } from "$lib/db";
	import { liveQuery } from "dexie";

	const booksData = liveQuery(() => db.readingProgress.toArray());
	const unread = $derived.by(() => {
		if (!$booksData) {
			return {
				books: [],
				otCount: 29,
				ntCount: 27,
			};
		}

		let otCount = 0;
		let ntCount = 0;
		let books = [];
		for (const book of $booksData) {
			if (book.dateRead === "") {
				books.push(book);
				if (book.testament === "old") {
					otCount++;
				} else if (book.testament === "new") {
					ntCount++;
				}
			}
		}

		return {
			books,
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
	let darkMode = $state(true);
</script>

<div id="page">
	<button
		id="left"
		onclick={() => (componentToShow = leftComponent)}
		>{navButtonText[leftComponent]}</button
	>
	{#if componentToShow === "BookGenerator"}
		<BookGenerator
			{booksData}
			unread={unread.books}
		/>
	{:else if componentToShow == "ChapterGenerator"}
		<ChapterGenerator {booksData} />
	{:else}
		<ReadingTracker
			{booksData}
			otCount={unread.otCount}
			ntCount={unread.ntCount}
		/>
	{/if}

	<button
		id="right"
		onclick={() => (componentToShow = rightComponent)}
		>{navButtonText[rightComponent]}</button
	>
	<button
		id="dark-mode"
		onclick={() => (darkMode = !darkMode)}
	>
		{darkMode ? "Light ☀️" : "Dark 🌙"}</button
	>
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
	#dark-mode {
		position: absolute;
		bottom: 0;
		right: 0;
		margin: 1em;
	}
</style>
