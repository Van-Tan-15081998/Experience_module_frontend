<template>
	<div class="core-table">
		<table class="table core-app-style__table">
			<thead class="thead-dark">
			<tr>
				<th
					v-for="(field, index) in columns"
					:key="index"
					scope="col">
					<div class="core-app-style__skeleton">
						<span class="skeleton-box" style="width:100%;height:30px;"></span>
					</div>
				</th>
			</tr>
			</thead>
			<tbody>

			<tr v-for="(data, index) in rows"
					:key="index">

				<td
					v-for="(slot, i) in columns"
					:key="i"
				>
					<div class="core-app-style__skeleton">
						<span class="skeleton-box" style="width:100%;height:30px;"></span>
					</div>
				</td>
			</tr>
			</tbody>
		</table>
	</div>
</template>

<script>
export default {
	name: 'CoreLoadingTable',
	props: {
		columns: {
			type: Number,
			default: 3
		},
		rows: {
			type: Number,
			default: 3
		},
	}
}
</script>

<style scoped lang="scss">
</style>