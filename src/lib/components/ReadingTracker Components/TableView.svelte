<script lang="ts">
	import { markRead } from "$lib/helper functions/modify-db";

	let { booksData } = $props();

	// desc and asc for date desecending and date ascending
	type SortModes = "none" | "asc" | "desc";
	let sortMode: SortModes = $state("none");

	function changeSort() {
		if (sortMode === "none") {
			sortMode = "asc";
		} else if (sortMode === "asc") {
			sortMode = "desc";
		} else if (sortMode === "desc") {
			sortMode = "none";
		}
	}

	let modifiedBooksData = $derived.by(() => {
		const data = $booksData ? [...$booksData] : [];

		if (sortMode === "none") {
			return data;
		}
		const datedBooks = [];
		const undatedBooks = [];

		for (const book of data) {
			if (book.dateRead) {
				datedBooks.push(book);
			} else {
				undatedBooks.push(book);
			}
		}

		datedBooks.sort((a, b) => {
			const dateA = new Date(a.dateRead).getTime();
			const dateB = new Date(b.dateRead).getTime();

			if (sortMode === "asc") {
				return dateA - dateB;
			} else {
				return dateB - dateA;
			}
		});

		return [...datedBooks, ...undatedBooks];
	});

	const iconToShow: Record<SortModes, string> = {
		none: "↕️",
		asc: "⬆️",
		desc: "⬇️",
	};
</script>

<div class="table-container">
	<table>
		<thead>
			<tr>
				<th class="name"> Book </th>
				<th class="status">
					<button
						id="sort"
						onclick={changeSort}
					>
						Status
						{iconToShow[sortMode]}
					</button>
				</th>
			</tr>
		</thead>
		<tbody>
			{#each modifiedBooksData as book (book.id)}
				<tr>
					<td>
						<p class="name">{book.name}</p>
					</td>
					<td class="status">
						<input
							type="date"
							bind:value={book.dateRead}
							onchange={() => {
								markRead(book.id, book.dateRead);
							}}
						/>
					</td>
				</tr>
			{/each}
		</tbody>
	</table>
</div>

<style>
	.table-container {
		height: 23dvh;
		overflow-y: auto;
	}

	table {
		margin: 0 1em 0 1em;
		border-spacing: 0;
	}

	th,
	td {
		text-align: left;
		overflow-x: scroll;
		border-bottom: 1px solid #ddd;
	}
	th {
		padding-bottom: 0.5em;
	}
	#sort {
		font-weight: bold;
	}
	.name {
		padding-right: 1em;
	}

	@media (max-width: 640px) {
		.name {
			width: 5px;
			padding-right: 0;
		}
		.status {
			padding-left: 1em;
		}
	}
</style>
