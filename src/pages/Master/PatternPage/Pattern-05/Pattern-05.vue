<template>
	<div>
		<button
			@click="isOpenModal = true"
			class="core-app-style__button blue-harmony-color icon-effect-zoom-in"
		>
			Open Form
		</button>
		<teleport to="#app">

			<core-modal :show="isOpenModal" @close="closeForm">
				<template #header>
					Custom header
				</template>

				<template #body>
					<div class="core-app-style__form">

						<div class="input_wrapper">
							<div class="input_label">Name</div>
							<div
								:class="{'error': isFailed}"
								class="input_validator">
								<input class="input_form" type="text" placeholder="Placeholder">

								<Transition name="notification">
									<div v-if="isFailed" class="input_validator_status">
										<div class="input_icon">
											<i class="bi bi-exclamation-lg"></i>
										</div>
									</div>
								</Transition>

							</div>

							<Transition name="notification">
								<div
									v-if="isFailed"
									class="core-app-style__notification input-error-notification">
									Vui lòng xem lại thông tin. Vui lòng xem lại thông tin
								</div>
							</Transition>
						</div>

						<div class="input_wrapper">
							<div class="input_label">Password</div>
							<div class="input_validator">
								<input

									class="input_form" type="text" placeholder="Placeholder">
								<div class="input_validator_status">
									<font-awesome-icon
										icon="fa-solid fa-circle-exclamation"
										class="input_icon"
									/>
								</div>
							</div>
						</div>

						<div class="input_wrapper">
							<div class="input_label">Type</div>
							<div class="input_validator">
								<select class="core-app-style__dropdown">
									<option value="5" selected>5</option>
									<option value="10">10</option>
									<option value="25">25</option>
									<option value="50">50</option>
									<option value="100">100</option>
								</select>
							</div>
						</div>

						<div class="input_wrapper">
							<div class="input_label">Type</div>
							<div class="input_validator">
								<div class="core-app-style__checkbox">
									<label class="on-off">
										<input
											v-model="isCheckboxYes"
											type="checkbox">
										<span class="slider round"></span>
									</label>
								</div>
							</div>
						</div>

						<Transition name="notification">
							<div
								v-if="isSuccess"
								class="core-app-style__notification success">
								<div class="notification-icon">
									<i class="bi bi-check"></i>
								</div>
								Đăng ký thành công
							</div>
						</Transition>

						<Transition name="notification">
							<div
								v-if="isFailed"
								class="core-app-style__notification error">
								<div class="notification-icon">
									<i class="bi bi-x"></i>
								</div>
								Đăng ký thất bại
							</div>
						</Transition>

						<core-form-input
							label="Core form label"
							:error="error"
						>
							<template #input-side>
								<input
									type="text"
									placeholder="Nhập text"
									>
							</template>
						</core-form-input>

						<core-form-input
							label="Core form label"
							:error="error"
						>
							<template #input-side>
								<input
									type="number"
									placeholder="Nhập text"
								>
							</template>
						</core-form-input>

						<core-form-checkbox
							label="Core form label"
						>
							<template #input-side>
								<input
									v-model="isCheckboxYes"
									type="checkbox"
								>
							</template>
						</core-form-checkbox>

						<core-loader></core-loader>

					</div>
				</template>

				<template #footer>
					<button
						@click="onSuccess"
						class="core-app-style__button green-harmony-color icon-effect-zoom-in"
					>Success</button>
					<button
						@click="onFailed"
						class="core-app-style__button red-harmony-color icon-effect-zoom-in"
					>Failed</button>
					<button
						@click="onReset"
						class="core-app-style__button blue-harmony-color icon-effect-zoom-in"
					>Reset</button>
				</template>
			</core-modal>

		</teleport>

	</div>
</template>

<script>

import CoreModal from "@/core/components/modal/CoreModal.vue";
import CoreFormInput from "@/core/components/form-input/CoreFormInput.vue";
import CoreFormCheckbox from "@/core/components/form-checkbox/CoreFormCheckbox.vue";
import CoreLoader from "@/core/components/loader/CoreLoader.vue";
export default {
	name: 'Pattern-05',
	components: {
		CoreModal,
		CoreFormInput,
		CoreFormCheckbox,
		CoreLoader
	},
	data() {
		return {
			isOpenModal: true,

			isSuccess: false,
			isFailed: false,

			error: '',
			isCheckboxYes: false,
		}
	},
	methods: {
		closeForm() {
			this.isOpenModal = false;
		},

		onFailed() {
			this.isFailed = true;
			this.error = 'Đây là thông báo error!';
		},

		onSuccess() {
			this.isSuccess = true;
		},

		onReset() {
			this.isFailed = false;
			this.isSuccess = false;
			this.error = '';
		}
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