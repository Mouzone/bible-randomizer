<script>
	let {
		selectedIndex = $bindable(),
		readingProgress,
		handleDateChange,
		showDialog,
	} = $props();
</script>

<div class="table-container">
	<table>
		<thead>
			<tr>
				<th> Book </th>
				<th> Status </th>
				<th></th>
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
							onchange={handleDateChange}
						/>
					</td>
					<td>
						<button
							onclick={() => showDialog("mark unread")}
							disabled={!progress.dateRead}
						>
							Reset
						</button>
					</td>
				</tr>
			{/each}
		</tbody>
	</table>
</div>

<style>
	.table-container {
		height: 40dvh;
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
