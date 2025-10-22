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
	#function {
		align-items: center;
	}
	select {
		text-align: right;
	}
	@media (max-width: 640px) {
		#function {
			flex-direction: column;
		}
	}
</style>
