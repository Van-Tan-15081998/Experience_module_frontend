<template>
	<div>
		<core-form
			:is-loading="isLoadingFormData || isLoadingProcessing"
		>

			<template #formContent>

				<div
					v-if="isShowStatuses"
				>
					<core-notification
						v-for="(status, index) in getStatusesComputed"
						:key="index"
						:is-success="status['type'].includes('info')"
						:message="status['message']"
					>

					</core-notification>
				</div>


				<core-form-input
					label="Core form label"
					:error="getInputErrorByKey('title')"
				>
					<template #input-side>
						<input
							v-model="formData.title"
							type="text"
							placeholder="Nhập text"
						>
					</template>
				</core-form-input>

				<core-form-input
					label="Core form label"
				>
					<template #input-side>
						<input
							type="number"
							placeholder="Nhập text"
						>
					</template>
				</core-form-input>

				<core-dropdown
					v-for="(publisher, index) in formData.publisherList"
					:key="index"
					:can-delete="canDeletePublisher"
					:error="getInputErrorByKey('publisherList.' + index + '.publisherId')"
				>
					<template #select-option-side>
						<select
							v-model="publisher.publisherId"
						>
							<option
								v-for="(item, index) in getSelectionItemFormDataByKey('publisherList')"
								:key="index"
								:value="item.publisherId" selected>{{ item.name }}</option>
						</select>
					</template>

					<template #can-delete-side>
						<button
							@click="onDeletePublisher(index)"
							class="core-app-style__button circle-rounded red-harmony-color icon-effect-zoom-in"
						>
							<i class="bi bi-dash-circle"></i>
						</button>
					</template>
				</core-dropdown>
				<button
					@click="onAddPublisher"
					class="core-app-style__button blue-harmony-color icon-effect-zoom-in"
				>Add publisher</button>

				<core-form-checkbox
					label="Core form label"
				>
					<template #input-side>
						<input

							type="checkbox"
						>
					</template>
				</core-form-checkbox>

				<core-form-text-area
					:error="getInputErrorByKey('title')"
				>
					<template #input-side>
					<textarea
						rows="5"
					></textarea>
					</template>
				</core-form-text-area>



			</template>

			<template #formFooter>
				<button
					@click="save"
					class="core-app-style__button blue-harmony-color icon-effect-zoom-in"
				>Perform</button>
			</template>

		</core-form>
	</div>
</template>

<script>

import CoreFormInput from "@/core/components/form-input/CoreFormInput.vue";
import CoreFormCheckbox from "@/core/components/form-checkbox/CoreFormCheckbox.vue";
import CoreForm from "@/core/components/form/CoreForm.vue";

import CoreComponentLoader from "@/core/components/loader/CoreComponentLoader.vue";
import CoreDropdown from "@/core/components/dropdown/CoreDropdown.vue";
import CoreFormTextarea from "@/core/components/form-textarea/CoreFormTextarea.vue";

import CoreBaseForm from "@/core/components/base/CoreBaseForm.vue";

import bookApi from "@/scripts/Master/FavoriteApp/Book/BookApi";
import CoreFormTextArea from "@/core/components/form-textarea/CoreFormTextarea.vue";
import CoreNotification from "@/core/components/notification/CoreNotification.vue";

export default {
	name: 'BookAdd',
	extends: CoreBaseForm,
	components: {
		CoreNotification,
		CoreFormTextArea,
		CoreFormInput,
		CoreFormCheckbox,
		CoreComponentLoader,
		CoreDropdown,
		CoreFormTextarea,
		CoreForm
	},
	inject: ['apiService'],
	data() {
		return {
			isAddForm: true,

			context: this,
			loadFormDataService: bookApi,

			formData: {
				title: '',
				publisherList: []
			}
		}
	},
	computed: {
		getPublisherListComputed() {
			return this.formData.publisherList
		},
		canDeletePublisher() {
			return this.formData.publisherList.length > 1;
		}
	},
	methods: {
		initDefaultFormData() {
			this.formData.publisherList = [
				{
					publisherId: 0
				},
				{
					publisherId: 0
				},
				{
					publisherId: 0
				}
			]
		},

		onAddPublisher() {

			let publisherObj = {
				publisherId: 0 //  Mặc định là item có id = 1 trong publisherList
			}

			this.formData.publisherList.push(publisherObj);
		},

		onDeletePublisher(index) {
			console.log(index)
			this.formData.publisherList.splice(index, 1);
			console.log(this.formData.publisherList)
		}
	}
}
</script>

<style scoped lang="scss">

</style>