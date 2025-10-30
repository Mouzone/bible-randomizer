<script lang="ts">
	let darkMode = $state(false);

	if (typeof window !== "undefined") {
		const storedState = localStorage.getItem("darkMode");
		if (storedState !== null) {
			darkMode = storedState === "true";
		}
	}

	$effect(() => {
		if (darkMode) {
			document.documentElement.classList.add("dark");
		} else {
			document.documentElement.classList.remove("dark");
		}
		localStorage.setItem("darkMode", `${darkMode}`);
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
		top: 0;
		right: 0;
		margin: 2em 2em 0 0;
		padding: 0.5em;

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
