<template>
	<div class="core-table">
		<table class="table table-bordered">
			<thead class="thead-dark">
			<tr>
				<th
					v-for="(field, index) in columns"
					:key="index"
					scope="col">
					<span class="skeleton-box" style="width:100px;height:20px;"></span>
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
					<span class="skeleton-box" style="width:100px;height:20px;"></span>
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

.skeleton-box {
	display: inline-block;
	height: 1em;
	position: relative;
	overflow: hidden;
	background-color: #DDDBDD;

	&::after {
		position: absolute;
		top: 0;
		right: 0;
		bottom: 0;
		left: 0;
		transform: translateX(-100%);
		background-image: linear-gradient(90deg, rgba(#fff, 0) 0, rgba(#fff, 0.2) 20%, rgba(#fff, 0.5) 60%, rgba(#fff, 0)
		);
		animation: shimmer 2s infinite;
		content: '';
	}

	@keyframes shimmer {
		100% {
			transform: translateX(100%);
		}
	}
}
</style>