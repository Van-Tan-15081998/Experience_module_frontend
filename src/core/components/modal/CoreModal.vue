<template>
	<Transition name="modal">
		<div v-if="show">
			<div class="core-neumorphism-style dark-mode">
				<div class="core-app-style__modal">
					<div class="modal-mask">
						<div class="modal-wrapper">
							<div
								:style="{width: width + 'px'}"
								class="modal-container">
								<div class="modal-header">
									<slot name="header">default header</slot>
								</div>

								<div
									:style="{height: height + 'px'}"
									class="modal-body"
								>
									<div class="modal-body-class">
										<slot name="body">default body</slot>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</Transition>
</template>

<script>
	export default {
		name: "CoreModal",
		props: {
			show: {
					type: Boolean,
					default: false
			},
			width: {
				type: Number,
				default: 1000
			},
			height: {
				type: Number,
				default: 700
			},
		},
		data() {
			return {
					loading: false
			}
		},
	}
</script>

<style scoped lang="scss">
.core-app-style__modal {
	.modal-mask {
		position: fixed;
		z-index: 9998;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		background-color: rgba(0, 0, 0, 0.5);
		display: table;
		transition: opacity 0.5s ease;
	}

	.modal-wrapper {
		display: table-cell;
		vertical-align: middle;
		height: auto;
		transition: 0.2s;
	}

	.modal-container {
		width: 1200px;
		margin: 0 auto;
		transition: all 0.5s ease;
		overflow: hidden;
		padding: 5px;

		border-radius: 6px;
		background: #1b1f23;
		box-shadow: inset -2px -2px 4px rgba(0,0,0,0.5),
		inset 2px 2px 4px rgba(255,255,255,0.07);
	}

	.modal-header {
		height: 40px;
		margin-top: 0;
		padding: 5px;
		color: #626262;
		font-size: 18px;
		font-weight: 500;
	}

	.modal-body {
		position: relative;
		//height: 700px;
		border-top: 1px solid #626262;
		font-size: 16px;
		background-color: inherit;
	}

	.modal-enter-from {
		opacity: 0;
	}

	.modal-leave-to {
		opacity: 0;
	}

	.modal-body-class {
		position: relative;
		width: 100%;
		height: 100%;
		z-index: 5;
	}

	.modal-overlay-class {
		position: absolute;
		top: 0;
		left: 0;
		z-index: 10;
		width: 100%;
		height: 100%;
		background-color: gray;
		opacity: 0.5;
		display: flex;
		justify-content: center;
		align-items: center;
	}
}
</style>