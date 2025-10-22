<script>
	let {
		selectedIndex = $bindable(),
		readingProgress,
		handleDateChange,
	} = $props();
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
					<td id="name-col"> {progress.book}</td>
					<td>
						<div class="status-controls">
							<input
								type="date"
								value={progress.dateRead}
								onchange={handleDateChange}
							/>
						</div>
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
