<script lang="ts">
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
			onchange={() => {}}
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
