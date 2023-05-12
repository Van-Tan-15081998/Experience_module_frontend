<template>
	<button
		@click="onBack"
		class="btn-back core-app-style__button green-harmony-color icon-effect-zoom-in">
		<i class="bi bi-reply"></i>
	</button>
</template>

<script>
export default {
	name: 'CoreBackButton',
	methods: {
		onBack() {
			this.$router.back();
		}
	}
}
</script>

<style scoped lang="scss">
.btn-back {
	width: 100%;
}
</style>