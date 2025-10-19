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
