<script lang="ts">
	import BookGenerator from "$lib/components/functions/BookGenerator.svelte";
	import ChapterGenerator from "$lib/components/functions/ChapterGenerator.svelte";
	import ReadingTracker from "$lib/components/functions/ReadingTracker/ReadingTracker.svelte";
	import DarkModeButton from "$lib/components/DarkModeButton.svelte";
	import rawLayoutData from "$lib/data/navigation-layout.json";
	import navButtonText from "$lib/data/navigation-text.json";
	import initalState from "$lib/data/bible-data.json";

	let componentToShow: Components | null = $state(null);
	let books = $state(initalState);

	if (typeof window !== "undefined") {
		const storedBookState = localStorage.getItem("bibleProgress");
		const storedComponentState = localStorage.getItem("componentState");

		if (storedBookState !== null) {
			books = JSON.parse(storedBookState);
		}

		if (
			storedComponentState !== null &&
			(storedComponentState === "BookGenerator" ||
				storedComponentState === "ChapterGenerator" ||
				storedComponentState === "ReadingTracker")
		) {
			componentToShow = storedComponentState;
		} else {
			componentToShow = "BookGenerator";
		}
	}

	const layoutData = rawLayoutData as LayoutData;
	let leftComponent: Components = $derived(
		layoutData[componentToShow ?? "BookGenerator"]["left"]
	);
	let rightComponent: Components = $derived(
		layoutData[componentToShow ?? "BookGenerator"]["right"]
	);

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

	function updateComponent(newComponent: Components) {
		componentToShow = newComponent;
		if (typeof window !== "undefined") {
			localStorage.setItem("componentState", componentToShow);
		}
	}
</script>

{#if componentToShow}
	<div id="page">
		<button
			id="left"
			onclick={() => updateComponent(leftComponent)}
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
				bind:books
				otCount={unread.otCount}
				ntCount={unread.ntCount}
			/>
		{/if}

		<button
			id="right"
			onclick={() => updateComponent(rightComponent)}
			>{navButtonText[rightComponent]}</button
		>
		<DarkModeButton />
	</div>
{/if}

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
