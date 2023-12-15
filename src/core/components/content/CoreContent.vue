<template>
	<div>
		<div
			v-if="getIsLabelMaster"
			class="core-content">
			<div class="content-wrapper c-label-master">
				<div class="content"
				>
					<slot name="content-side"></slot>
				</div>
			</div>
		</div>
		<div
			v-else
			class="core-content">
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
.core-content {
	width: 100%;
	height: fit-content;

	.content-wrapper {
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
    justify-content: flex-start;
    align-items: center;
    align-content: flex-start;

    padding: 10px;
    color: #555;
    background-color: #F5F6CF;
    border-radius: 6px;
    border: 1px solid #626262;
    box-shadow: -4px -2px 4px 0px #262830, 4px 2px 6px 0px #111316;
    transition: 0.2s;

    &.c-label-master {
      .content {
        height: auto;
        width: 100%;
        font-size: 20px;
        font-weight: 600;
        color: #555;
        line-height: 1.4;
        padding-left: 0 !important;
      }
    }

		.label {
      width: fit-content;
      min-width: 200px;
      max-width: 300px;
      height: fit-content;
      font-weight: 600;
      padding-right: 10px;

      border-right: 1px dashed #626262;
		}

		.content {
      //min-width: calc(100% - 200px);
      //max-width: calc(100% - 300px);
      height: fit-content;
      font-weight: 600;
      overflow: hidden;

      padding-left: 10px;
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