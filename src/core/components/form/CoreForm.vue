<template>
    <div class="core-app-style__form">


			<div class="form-content">

				<div
					ref="hiddenElement"
					style="position: absolute}"
				></div>

				<slot name="formContent"></slot>
			</div>

			<div
          v-if="isHasFooter"
          class="form-footer">
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
			},
      isHasFooter: {
        type: Boolean,
        default: true
      }
		},
		components: {
			CoreComponentLoader
		},
		mounted() {
			this.exEventBus.on('TO_TOP_FORM', () => {
				this.$refs["hiddenElement"].scrollIntoView({ behavior: "smooth" });
			});
		}
	}
</script>

<style scoped>

</style>