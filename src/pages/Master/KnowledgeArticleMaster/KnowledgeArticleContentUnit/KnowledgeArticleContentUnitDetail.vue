<template>
	<div>
		<core-page-template
			v-if="isActionModeNew"
			page-title="Tạo đơn vị"
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
							label="Tiêu đề"
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
import KnowledgeArticleContentUnitApi
	from "@/scripts/Master/KnowledgeArticleMaster/KnowledgeArticleContentUnit/KnowledgeArticleContentUnitApi";

export default {
	name: 'KnowledgeArticleContentUnitDetail',
	extends: CoreBasePage,
	inject: ['apiService'],
	data() {
		return {
			context: this,
			dataService: KnowledgeArticleContentUnitApi,

			idString: 'knowledgeArticleContentUnitId',

			pageData: {
				knowledgeArticleId: null,

				title: null,
			},

			selectionItemsPageData: {

			},
		}
	}
}
</script>

<style scoped>

</style>