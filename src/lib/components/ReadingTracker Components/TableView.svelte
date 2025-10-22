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
					<td>
						<p id="name">{progress.book}</p>
					</td>
					<td>
						<input
							type="date"
							value={progress.dateRead}
							onchange={handleDateChange}
						/>
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
