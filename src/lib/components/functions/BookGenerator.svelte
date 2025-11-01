<script>
	import { fly } from "svelte/transition";
	import GenerateButton from "../GenerateButton.svelte";

	const { books, unread } = $props();

	let useUnreadBooks = $state(true);
	let book = $state("Nothing");
	let animationKey = $state(0);

	function getRandomBook() {
		if (useUnreadBooks) {
			if (unread.length >= 1) {
				const randomIndex = Math.floor(Math.random() * unread.length);
				book = unread[randomIndex].name;
			}
		} else {
			const randomIndex = Math.floor(Math.random() * books.length);
			book = books[randomIndex].name;
		}
		animationKey += 1;
	}
</script>

<div id="component">
	<div id="display-group">
		<div id="result-display-container">
			{#key animationKey}
				<p
					id="result-display"
					in:fly={{ y: 20, duration: 300, delay: 300 }}
					out:fly={{ y: -20, duration: 300 }}
				>
					{book}
				</p>
			{/key}
		</div>

		<GenerateButton
			disabled={useUnreadBooks && !unread}
			generatorFunc={getRandomBook}
		/>
	</div>

	<label id="switch">
		<input
			type="checkbox"
			id="generateFromUnread"
			bind:checked={useUnreadBooks}
			onchange={() => (book = "Nothing")}
		/>
		<span>Only unread books</span>
	</label>
</div>

<style>
	#component {
		display: flex;
		flex-direction: column;
		align-items: center;

		gap: 0.5em;
	}
	#display-group {
		height: 3em;
		width: 16em;
		display: flex;
		gap: 1em;
		align-items: center;
		justify-content: center;

		margin-top: 2em;
	}
	#result-display-container {
		width: 70%;
		text-align: right;
	}

	@media (max-width: 640px) {
		#component {
			gap: 2em;
		}
		#display-group {
			flex-direction: column;
			gap: 0;
		}
		#result-display-container {
			height: 3em;
		}
		#result-display {
			text-align: center;
		}
	}
</style>
