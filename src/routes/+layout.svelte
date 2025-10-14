<script lang="ts">
	import favicon from "$lib/assets/favicon.svg";
	// import { onMount } from "svelte";
	// import { initDB } from "$lib/db.js";

	let { children } = $props();

	// onMount(async () => {
	// 	try {
	// 		const db = await initDB();

	// 		const tx = db.transaction("Books", "readonly");
	// 		const books = await tx.store.getAll();
	// 		console.log(books);
	// 	} catch (error) {
	// 		console.error(
	// 			"Failed to initialize and load data from IndexedDB:",
	// 			error
	// 		);
	// 	}
	// });
</script>

<svelte:head>
	<link
		rel="icon"
		href={favicon}
	/>
</svelte:head>

{@render children?.()}
