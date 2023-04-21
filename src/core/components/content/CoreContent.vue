<template>
	<div class="core-app-style__content">
		<div class="content-wrapper">
			<div class="label">
				{{ label }}
			</div>
			<div class="content">
				<slot name="content-side"></slot>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	name: 'CoreContent',
	props: {
		label: {
			type: [String],
			default: 'Label'
		},

	}
}
</script>

<style scoped>

</style>