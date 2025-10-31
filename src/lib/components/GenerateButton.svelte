<script>
	let { disabled = false, generatorFunc } = $props();
	let pressed = $state(false);

	function handleClick() {
		pressed = true;
		setTimeout(() => {
			pressed = false;
			generatorFunc();
		}, 500);
	}
</script>

<button
	onclick={handleClick}
	disabled={disabled || pressed}
>
	{#if pressed}
		Casting
	{:else}
		Cast Lot
	{/if}
</button>
