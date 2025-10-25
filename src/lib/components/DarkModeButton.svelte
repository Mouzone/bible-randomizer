<script lang="ts">
	// This state variable tracks whether dark mode is on or off.
	let darkMode = $state(false);

	// This effect runs whenever the 'darkMode' state changes.
	// Its only job is to add or remove the 'dark' class from the <html> element.
	$effect(() => {
		if (darkMode) {
			document.documentElement.classList.add("dark");
		} else {
			document.documentElement.classList.remove("dark");
		}
	});
</script>

<button
	class="dark-mode"
	onclick={() => (darkMode = !darkMode)}
>
	{darkMode ? "Light ☀️" : "Dark 🌙"}
</button>

<style>
	button {
		position: absolute;
		bottom: 0;
		right: 0;
		margin: 1em;

		background-color: black;
		color: white;
		border: 1px solid black;
		transition:
			background-color 0.2s,
			color 0.2s;
	}

	:global(html.dark) button {
		background-color: white;
		color: black;
		border: 1px solid black;
	}

	/* --- Global Theme Styles --- */
	:global(:root) {
		--background-color: #ffffff;
		--text-color: #222222;
	}

	:global(html.dark) {
		--background-color: #1a1a1a;
		--text-color: white;
	}

	:global(body) {
		background-color: var(--background-color);
		color: var(--text-color);
		transition:
			background-color 0.2s,
			color 0.2s; /* Smooth transition */
	}
</style>
