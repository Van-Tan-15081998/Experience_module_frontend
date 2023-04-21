<template>
  <div>
		<div class="core-app-style__form">

			<core-transition-content>
				<template #transition-content-side>
					<core-content
						v-if="formData"
						label="Mã sách"
					>
						<template #content-side>
							{{formData['bookId']}}
						</template>
					</core-content>
				</template>
			</core-transition-content>
			<core-transition-content>
				<template #transition-content-side>
					<core-content
						v-if="formData"
						label="Tên sách"
					>
						<template #content-side>
							{{formData['title']}}
						</template>
					</core-content>
				</template>
			</core-transition-content>
<!--					<div>-->
<!--						<core-content-->
<!--							v-if="formData"-->
<!--							label="Mã sách"-->
<!--						>-->
<!--							<template #content-side>-->
<!--								{{formData['bookId']}}-->
<!--							</template>-->
<!--						</core-content>-->

<!--						<core-content-->
<!--							v-if="formData"-->
<!--							label="Tên sách"-->
<!--						>-->
<!--							<template #content-side>-->
<!--								{{formData['title']}}-->
<!--							</template>-->
<!--						</core-content>-->
<!--					</div>-->


<!--			<core-content-->
<!--				label="Tên sách"-->
<!--			>-->
<!--				<template #content-side>-->
<!--					{{itemId}} Cho Đi Và Nhận Lại - Nghệ Thuật Xây Dựng Mối Quan Hệ Nơi Công Sở-->
<!--				</template>-->
<!--			</core-content>-->

<!--			<core-content-->
<!--				label="Tên sách"-->
<!--			>-->
<!--				<template #content-side>-->
<!--					Cho Đi Và Nhận Lại - Nghệ Thuật Xây Dựng Mối Quan Hệ Nơi Công Sở-->
<!--				</template>-->
<!--			</core-content>-->

<!--			<core-content-->
<!--				label="Tên sách"-->
<!--			>-->
<!--				<template #content-side>-->
<!--					Deep watch requires traversing all nested properties in the watched object, and can be expensive when used on large data structures. Use it only when necessary and beware of the performance implications.-->
<!--				</template>-->
<!--			</core-content>-->

<!--			<core-content-->
<!--				label="Tên sách"-->
<!--			>-->
<!--				<template #content-side>-->
<!--					<core-form-checkbox-->
<!--						label=""-->
<!--					>-->
<!--						<template #input-side>-->
<!--							<input-->

<!--								type="checkbox"-->
<!--							>-->
<!--						</template>-->
<!--					</core-form-checkbox>-->
<!--				</template>-->
<!--			</core-content>-->

			<Transition name="notification">
				<core-component-loader
					v-if="isLoadingFormData"
					@click="isLoadingFormData = false"
				>

				</core-component-loader>
			</Transition>
		</div>
  </div>
</template>

<script>
import CoreContent from "@/core/components/content/CoreContent.vue";
import CoreFormCheckbox from "@/core/components/form-checkbox/CoreFormCheckbox.vue";
import CoreBaseForm from "@/core/components/base/CoreBaseForm.vue";
import coreComponentLoader from "@/core/components/loader/CoreComponentLoader.vue";
import CoreTransitionContent from "@/core/components/transition-content/CoreTransitionContent.vue";

import bookApi from "@/scripts/Master/FavoriteApp/Book/BookApi";
export default {
  name: 'BookDetail',
	extends: CoreBaseForm,
	inject: ['apiService'],
	props: {
		itemId : {
			type: Number,
			default: null
		}
	},
	setup() {

	},
	mounted() {
		this.id = this.itemId;
	},
	components: {
		CoreContent,
		CoreFormCheckbox,
		coreComponentLoader,
		CoreTransitionContent
	},
	watch: {
		'itemId' (value) {
			if(value) {
				console.log(value)
				this.id = value;
			}
		}
	},
	data() {
		return {
			id: null,
			isDetailForm: true,

			context: this,
			loadFormDataService: bookApi,

		}
	}
}
</script>

<style scoped>

</style>