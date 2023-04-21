<template>
    <div class="core-app-style__form">

			<div class="form-content">
				<slot name="formContent"></slot>
			</div>

			<div class="form-footer">
				<slot name="formFooter"></slot>
			</div>

			<Transition name="processing">
				<div
					v-if="isLoading"
					class="form-loading">
					<core-component-loader/>
				</div>
			</Transition>
    </div>
</template>

<script>
import CoreComponentLoader from "@/core/components/loader/CoreComponentLoader.vue";
	export default {
		name: 'CoreForm',
		props: {
			isLoading: {
				type: Boolean,
				default: false
			}
		},
		components: {
			CoreComponentLoader
		}
	}
</script>

<style scoped>

</style>