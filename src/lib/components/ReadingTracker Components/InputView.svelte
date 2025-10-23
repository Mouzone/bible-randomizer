<script lang="ts">
	let { selectedIndex = $bindable(), booksData, handleDateChange } = $props();
</script>

{#if $booksData}
	<div id="function">
		<select bind:value={selectedIndex}>
			{#each $booksData as progress, i}
				<option value={i}>{progress.name}</option>
			{/each}
		</select>
		<input
			type="date"
			bind:value={$booksData[selectedIndex].dateRead}
			onchange={handleDateChange}
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
