<template>
	<div>
		<core-page-template
			page-title="Tạo Chủ Đề"
			:is-loading-page="isPageLoadingData"
		>

			<template #centerSide>

				<core-form
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
									v-model="pageData.title"
									type="text"
									placeholder="Nhập text"
								>
							</template>
						</core-form-input>

					</template>

					<template #formFooter>
						<button
							@click="save"
							class="core-app-style__button blue-harmony-color icon-effect-zoom-in"
						>Lưu</button>
					</template>

				</core-form>

			</template>

		</core-page-template>
	</div>
</template>

<script>
import CoreBasePage from "@/core/components/base/CoreBasePage.vue";
import SubjectApi from "@/scripts/Master/KnowledgeArticleMaster/Subject/SubjectApi";

export default {
	name: 'SubjectNew',
	extends: CoreBasePage,
	inject: ['apiService'],
	components: {

	},
	data() {
		return {
			context: this,
			dataService: SubjectApi,

			pageData: {
				title: null,
				level: null,
				sequence: null,
				parentSubjectCode: null,
				rootSubjectCode: null,
				branchSubjectList: [],
				knowledgeArticleList: []
			}
		}
	}
}
</script>

<style scoped>

</style>