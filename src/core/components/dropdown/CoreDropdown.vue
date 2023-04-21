<template>
	<div>
		<div class="input_wrapper">
			<div class="input_label">Type</div>
			<div class="input_validator">
				<div
					:class="{'can-delete' : canDelete}"
					class="core-app-style__dropdown">
					<slot name="select-option-side"></slot>

					<slot
						v-if="canDelete"
						name="can-delete-side"></slot>
				</div>
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
		name: 'CoreDropdown',
		props: {
			canDelete: {
				type: Boolean,
				default: false
			},
			error: {
				type: [String],
				default: ''
			},
		},
		computed: {
			isShowError() {
				if(this.error && this.error !== '') {
					return true;
				}
				return false;
			}
		},
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