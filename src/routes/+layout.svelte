<script lang="ts">
	import "normalize.css";
	import favicon from "$lib/assets/favicon.svg";

	let { children } = $props();
</script>

<svelte:head>
	<title>Lot Caster 3000</title>
	<link
		rel="icon"
		href={favicon}
	/>
</svelte:head>

{@render children?.()}

<style>
	:global {
		body {
			font-family: monospace;
		}
		button {
			-webkit-appearance: none;
			appearance: none;

			width: 7em;
			padding: 0.5em;
			border: none;
			border-radius: 5px;
		}
	}
</style>
