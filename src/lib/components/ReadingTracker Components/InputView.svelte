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
		<div id="selection-group">
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
		<button onclick={() => showDialog("mark unread")}> Mark Unread </button>
	</div>
{/if}

<style>
	#function {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 1em;
	}
	select {
		text-align: right;
	}
</style>
