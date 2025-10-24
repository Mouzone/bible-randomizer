<script>
	import { markRead } from "$lib/helper functions/modify-db";

	let { booksData } = $props();
</script>

<div class="table-container">
	<table>
		<thead>
			<tr>
				<th> Book </th>
				<th> Status </th>
			</tr>
		</thead>
		<tbody>
			{#each $booksData as book (book.id)}
				<tr>
					<td>
						<p id="name">{book.name}</p>
					</td>
					<td>
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

	.table-container table {
		width: 100%;
		border-collapse: collapse;
	}

	th,
	td {
		text-align: left;
		overflow-x: scroll;
		border-bottom: 1px solid #ddd;
	}

	@media (max-width: 640px) {
		#name {
			width: 5px;
		}
		input {
			margin-left: 8px;
		}
	}
</style>
