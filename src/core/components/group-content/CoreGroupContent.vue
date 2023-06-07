<template>
	<div class="core-app-style__group-content">
		<div class="label">
			{{ coreGroupContentLabel }}
		</div>
		<div class="group-content-wrapper">
			<div class="group-content">
				<slot name="content-side"></slot>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	name: 'CoreGroupContent',
	props: {
		coreGroupContentLabel: {
			type: [String],
			default: 'Label'
		},

	}
}
</script>

<style scoped lang="scss">
.core-app-style__group-content {
	width: 100%;
	height: fit-content;

	display: flex;
	flex-direction: column;
	flex-wrap: wrap;
	justify-content: flex-start;
	align-items: start;
	align-content: start;

	margin-bottom: 10px;

	.label {
		width: fit-content;
		min-width: 200px;
		max-width: 300px;
		height: 30px;
		font-weight: 600;
	}

	.group-content-wrapper {
		position: relative;
		width: 100%;
		padding: 5px 10px;
		border-radius: 6px;

		&:after {
			z-index: 1;
			content: '';
			position: absolute;
			left: 0;
			top: 0;
			right: 0;
			bottom: 0;
			border-radius: 6px;
			box-shadow: 2px 2px 2px 0px #111316 inset,
			-2px -2px 2px 0px #262830 inset;
		}

		.group-content {
			z-index: 10;
			position: relative;
			left: 0;
			top: 0;

			display: flex;
			flex-direction: column;
			flex-wrap: wrap;
			justify-content: flex-start;
			align-items: start;
			align-content: start;
		}
	}
}
</style>