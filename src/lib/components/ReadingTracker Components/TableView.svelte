<script>
	import { db } from "$lib/db";
	import { liveQuery } from "dexie";

	const readingProgress = liveQuery(() => db.readingProgress.toArray());
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
			{#each $readingProgress as progress (progress.id)}
				<tr>
					<td> {progress.book}</td>
					<td>
						<input
							type="date"
							value={progress.dateRead}
							onchange={() => {}}
						/>
						{#if progress.dateRead}
							<button onclick={() => {}}> Reset </button>
						{/if}
					</td>
				</tr>
			{/each}
		</tbody>
	</table>
</div>

<style>
	.table-container {
		height: 70dvh;
		width: 40%;

		overflow-y: auto;
	}

	.table-container table {
		width: 100%;
		border-collapse: collapse;
	}

	th,
	td {
		padding: 8px;
		text-align: left;
		border-bottom: 1px solid #ddd;
	}
</style>
