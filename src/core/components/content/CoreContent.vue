<template>
	<div>
		<div
			v-if="getIsLabelMaster"
			class="core-app-style__content">
			<div class="content-wrapper core-app-style__text c-label-master">
				<div class="content"
				>
					<slot name="content-side"></slot>
				</div>
			</div>
		</div>
		<div
			v-else
			class="core-app-style__content">
			<div class="content-wrapper">
				<div class="label">
					{{ label }}
				</div>
				<div class="content"
				>
					<slot name="content-side"></slot>
				</div>
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
		isLabelMaster: {
			type: [Boolean],
		}
	},
	computed: {
		getIsLabelMaster() {
			return this.isLabelMaster;
		}
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

		border: 1px solid #626262;
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
			min-width: calc(100% - 200px);
			max-width: calc(100% - 300px);
			height: fit-content;
			font-weight: 600;
			overflow: hidden;
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