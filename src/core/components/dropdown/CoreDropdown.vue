<template>
	<div class="core-app-style__dropdown">
		<div class="input_wrapper">
			<div class="input_label">{{ label }}</div>
			<div class="input_validator">
				<div
					:class="{'can-delete' : canDelete}"
					class="dropdown_wrapper">
					<slot name="select-option-side"></slot>

					<slot
						v-if="canDelete"
						name="can-delete-side"></slot>
				</div>
			</div>

			<Transition name="notification">
				<div
					v-if="isShowError"
					class="core-app-style__notification">
					<div
						class="notification-wrapper input-error-notification">
						{{ error }}
					</div>
				</div>
			</Transition>

		</div>
	</div>
</template>

<script>
	export default {
		name: 'CoreDropdown',
		props: {
			label: {
				type: [String],
				default: 'Label'
			},
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

<style lang="scss">

.core-app-style__dropdown {
	.dropdown_wrapper {
    width: 450px;
    height: 45px;
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
    justify-content: flex-start;
    align-items: center;
    align-content: flex-start;

		select {
      width: 100%;
      height: 100%;
      padding: 0 15px 0 40px;
      margin-right: 5px;
      font-size: 16px;
      color: #6DC5CB;
      background-color: #1b1f23;
      border: 1px solid #626262;
      border-radius: 6px;
      outline: none;
      box-shadow: -4px -2px 4px 0px #262830, 4px 2px 6px 0px #111316;
      transition: 0.1s;

			&:focus {
        border: 1px solid #F1DD00;
			}
		}

		button {
			height: 45px !important;
			width: 45px !important;
			margin-left: 10px;

			i {
				font-size: 16px;
			}
		}
	}
}

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