<template>
    <div>
			<div class="input_wrapper">
				<div class="input_label">{{ label }}</div>
				<div
					:class="{'error': isShowError}"
					class="input_validator">

					<slot name="input-side"></slot>

					<Transition name="notification">
						<div v-if="isShowError" class="input_validator_status">
							<div class="input_icon">
								<i class="bi bi-exclamation-lg"></i>
							</div>
						</div>
					</Transition>

				</div>

				<Transition name="notification">
					<div
						v-if="isShowError"
						class="core-app-style__notification input-error-notification">
						{{ error }}
					</div>
				</Transition>
			</div>
		</div>
</template>

<script>
	export default {
		name: "CoreFormInput",
		props: {
			label: {
				type: [String],
				default: 'Label'
			},

			error: {
				type: [String],
						default: ''
			},
		},
		data () {
			return {}
		},
		computed: {
			isShowError() {
				if(this.error && this.error !== '') {
					return true;
				}
				return false;
			}
		},
		watch: {

		}
	}
</script>

<style scoped lang="scss">
.notification-enter-active {
	transition: all 0.2s;
	animation: jump-jump-out 0.2s cubic-bezier(0.21, 0.98, 0.6, 0.99) infinite alternate;
}
.notification-leave-active {
	transition: all 0.2s;
	animation: jump-jump-in 0.2s cubic-bezier(0.21, 0.98, 0.6, 0.99) infinite alternate;
}

.notification-enter-from,
.notification-leave-to {
	transform: scaleY(0);
	opacity: 0;
}
@keyframes jump-jump-out {
	0% {
		transform: scale(0.5);
		opacity: 0;
	}

	100% {
		transform: scale(1);
		opacity: 1;
	}
}
@keyframes jump-jump-in {
	0% {
		transform: scale(1);
		opacity: 1;
	}

	100% {
		transform: scale(0.5);
		opacity: 0;
	}
}
</style>