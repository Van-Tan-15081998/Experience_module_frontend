<template>
	<button
		:class="{'active': isRefreshing}"
		@click="isRefreshing = !isRefreshing"
		class="core-refresh">
		<core-refresh/>
	</button>
</template>

<script>
import CoreRefresh from "@/core/components/loader/CoreRefresh.vue";
export default {
	name: 'CoreComponentRefresh',
	components: {
		CoreRefresh
	},
	// props: {
	// 	isRefreshing: {
	// 		type: Boolean,
	// 		default: false
	// 	}
	// }
	data() {
		return {
			isRefreshing: false
		}
	}
}
</script>

<style scoped lang="scss">

</style>