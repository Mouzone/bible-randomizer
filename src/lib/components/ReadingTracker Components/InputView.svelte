<script lang="ts">
	let {
		selectedIndex = $bindable(),
		readingProgress,
		handleDateChange,
	} = $props();
</script>

{#if $readingProgress}
	<div id="function">
		<select bind:value={selectedIndex}>
			{#each $readingProgress as progress, i}
				<option value={i}>{progress.book}</option>
			{/each}
		</select>
		<input
			type="date"
			value={$readingProgress[selectedIndex]?.dateRead}
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
