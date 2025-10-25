<script lang="ts">
	import { markRead } from "$lib/db/modify-db";

	let { books } = $props();
	let selectedIndex = $state(0);
</script>

{#if $books}
	<div id="function">
		<select bind:value={selectedIndex}>
			{#each $books as book, index}
				<option value={index}>{book.name}</option>
			{/each}
		</select>
		<input
			type="date"
			bind:value={$books[selectedIndex].dateRead}
			onchange={() =>
				markRead(
					$books[selectedIndex].id,
					$books[selectedIndex].dateRead
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
