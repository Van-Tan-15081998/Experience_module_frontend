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

<style scoped lang="scss">
.core-app-style__content {
	width: 100%;
	height: fit-content;

	.content-wrapper {
		padding: 10px;
		color: #626262;
		transition: 0.2s;
		border-radius: 6px;

		display: flex;
		flex-direction: row;
		flex-wrap: nowrap;
		justify-content: flex-start;
		align-items: center;
		align-content: flex-start;

		box-shadow: -4px -2px 4px 0px #262830,
		4px 2px 6px 0px #111316;

		.label {
			width: fit-content;
			min-width: 200px;
			max-width: 300px;
			height: fit-content;
			font-weight: 600;
		}

		.content {
			height: fit-content;
			font-weight: 600;
		}

		&:hover {
			cursor: pointer;

			.label {

			}
			.content {

			}
		}
	}
}
</style>