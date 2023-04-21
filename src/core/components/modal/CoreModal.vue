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

								<div class="modal-body">
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
		},
		data() {
			return {
					loading: false
			}
		},
	}
</script>

<style scoped lang="scss">

</style>