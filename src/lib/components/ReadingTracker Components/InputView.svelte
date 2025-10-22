<script lang="ts">
	let {
		selectedIndex = $bindable(),
		readingProgress,
		handleDateChange,
		showDialog,
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
		<button
			onclick={() => showDialog("mark unread")}
			disabled={!$readingProgress[selectedIndex]?.dateRead}
		>
			Reset
		</button>
	</div>
{/if}

<style>
	#function {
		display: flex;
		align-items: center;
		gap: 1em;
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
