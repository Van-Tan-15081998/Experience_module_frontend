<template>
	<button
		:class="{'active': isRefreshing}"
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
	props: {
		isRefreshing: {
			type: Boolean,
			default: false
		}
	},
	watch: {

	}
}
</script>

<style scoped lang="scss">

</style>