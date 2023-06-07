<template>
	<div class="core-app-style__notification">
		<Transition name="notification">
			<div
				v-if="isSuccess"
				class="notification-wrapper success">
				<div class="notification-icon">
					<i class="bi bi-check"></i>
				</div>
				{{ message }}
			</div>
		</Transition>

		<Transition name="notification">
			<div
				v-if="isError"
				class="notification-wrapper error">
				<div class="notification-icon">
					<i class="bi bi-x"></i>
				</div>
				{{ message }}
			</div>
		</Transition>
	</div>
</template>

<script>
export default {
	name: 'CoreNotification',
	props: {
		message: {
			type: String,
			default: 'Message'
		},
		isSuccess: {
			type: Boolean,
			default: false
		},
		isError: {
			type: Boolean,
			default: false
		},
	},
	watch: {

	}
}
</script>

<style scoped>

</style>