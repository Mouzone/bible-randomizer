<script>
	let darkMode = $state(true);
</script>

<button
	id="dark-mode"
	onclick={() => (darkMode = !darkMode)}
>
	{darkMode ? "Light ☀️" : "Dark 🌙"}</button
>

<style>
	#dark-mode {
		position: absolute;
		bottom: 0;
		right: 0;
		margin: 1em;
	}
</style>
