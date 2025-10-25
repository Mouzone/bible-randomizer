<script lang="ts">
	import { markRead } from "$lib/helper functions/modify-db";

	let { booksData } = $props();
	let selectedIndex = $state(0);
</script>

{#if $booksData}
	<div id="function">
		<select bind:value={selectedIndex}>
			{#each $booksData as book, i}
				<option value={i}>{book.name}</option>
			{/each}
		</select>
		<input
			type="date"
			bind:value={$booksData[selectedIndex].dateRead}
			onchange={() =>
				markRead(
					$booksData[selectedIndex].id,
					$booksData[selectedIndex].dateRead
				)}
		/>
	</div>
{/if}

<style>
	select {
		text-align: right;
	}
	@media (max-width: 640px) {
		#function {
			display: flex;
			flex-direction: column;
			align-items: center;
			gap: 0.5em;
		}
	}
</style>
