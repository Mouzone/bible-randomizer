<script>
	import { markRead } from "$lib/helper functions/modify-db";

	let { booksData } = $props();
</script>

<div class="table-container">
	<table>
		<thead>
			<tr>
				<th class="name"> Book </th>
				<th class="status"> Status </th>
			</tr>
		</thead>
		<tbody>
			{#each $booksData as book (book.id)}
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
	}

	th,
	td {
		text-align: left;
		overflow-x: scroll;
		border-bottom: 1px solid #ddd;
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
