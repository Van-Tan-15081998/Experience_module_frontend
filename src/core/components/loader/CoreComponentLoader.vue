<template>
	<div class="loader-wrapper core-display-flex__center">
		<core-loader></core-loader>
	</div>
</template>

<script>
import CoreLoader from "@/core/components/loader/CoreLoader.vue";
export default {
	name: 'CoreComponentLoader',
	components: {
		CoreLoader
	},
	props: {

	}
}
</script>

<style scoped lang="scss">
.loader-wrapper {
	position: absolute;
	width: 100%;
	min-height: 100px;
	height: 100%;
	top: 0;
	left: 0;
	z-index: 9999;
	background-color: rgba(0, 0, 0, 0.5);
	//background-color: #1b1f23;
}

</style>