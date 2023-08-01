<template>
	<div>
		<core-page-template
			v-if="isActionModeView"
			:page-title="'Chi tiết bài viết: ' + pageData.title"
			:is-loading-page="isPageLoadingData"
		>

			<template #leftSide>
				<core-shortcut-list
					:list="pageData.unitContentList"
					id-string="knowledgeArticleContentUnitId"
					title-string="title"
				></core-shortcut-list>
			</template>

			<template #centerSide>

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

				<core-transition-content>
					<template #transition-content-side>
						<core-content
							v-if="pageData.title"
							:is-label-master="true"
							label="Tên bài viết"
						>
							<template #content-side>
								{{pageData.title}}
							</template>
						</core-content>
					</template>
				</core-transition-content>

				<knowledge-article-content-unit-item
					v-for="(item, index) in pageData.unitContentList"
					:key="index"
					:data="item"
					:index="index+1"
				/>

			</template>

			<template #rightSide>
				<button
					@click="onGoSubjectPage"
					class="core-app-style__button full-width-size blue-harmony-color icon-effect-zoom-in"
				>
					<i class="bi bi-reply-all margin-right-5"></i>
					Về trang Chủ đề
				</button>
				<button
					@click="onGoEditPage"
					class="core-app-style__button full-width-size blue-harmony-color icon-effect-zoom-in">
					<i class="bi bi-pencil-fill"></i>
				</button>
				<button
					@click="onOpenConfirmDeleteModal"
					class="core-app-style__button full-width-size red-harmony-color icon-effect-zoom-in">
					<i class="bi bi-trash3-fill"></i>
				</button>

				<hr>

				<button
					@click="onGoAddKnowledgeArticleUnitPage"
					class="core-app-style__button full-width-size green-harmony-color icon-effect-zoom-in">
					<i class="bi bi-plus-square-dotted margin-right-5"></i>
					Thêm đơn vị
				</button>
			</template>

		</core-page-template>

		<core-page-template
			v-else-if="isActionModeNew"
			page-title="Tạo bài viết"
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

		<core-page-template
			v-else-if="isActionModeEdit"
			page-title="Cập nhật bài viết"
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

		<teleport to="#app">

			<core-modal
				:show="isOpenConfirmDeleteModal"
				:width="500"
				:height="200"
			>
				<template #header>
					Bạn muốn xóa record này ?
				</template>

				<template #body>
					<div class="core-app-style__full-size-relative core-display-flex__center">
						<button
							@click="onConfirmDelete"
							class="core-app-style__button blue-harmony-color icon-effect-zoom-in"
						>Lưu</button>

						<button
							@click="onCloseConfirmDeleteModal"
							class="core-app-style__button orange-harmony-color icon-effect-zoom-in"
						>Đóng</button>
					</div>
				</template>
			</core-modal>
		</teleport>
	</div>
</template>

<script>
import CoreBasePage from "@/core/components/base/CoreBasePage.vue";
import KnowledgeArticleApi from "@/scripts/Master/KnowledgeArticleMaster/KnowledgeArticle/KnowledgeArticleApi";

import KnowledgeArticleContentUnitItem
	from "@/pages/Master/KnowledgeArticleMaster/KnowledgeArticleContentUnit/KnowledgeArticleContentUnitItem.vue";

export default {
	name: 'KnowledgeArticleDetail',
	components: {
		CoreBasePage,
		KnowledgeArticleContentUnitItem
	},
	extends: CoreBasePage,
	inject: ['apiService'],

	data() {
		return {
			context: this,
			dataService: KnowledgeArticleApi,

			idString: 'knowledgeArticleId',

			detailPageName: 'knowledge_article_detail',

			pageData: {
				knowledgeArticleId: null,

				subjectId: null,

				title: null,

				image: null,

				unitContentList: []
			},

			selectionItemsPageData: {

			},
		}
	},

	watch: {

	},

	methods: {
		onGoSubjectPage() {
			if(this.pageData.subjectId) {
				this.$router.push({ name: 'subject_detail', query: { id: this.pageData.subjectId, actionMode: 'view'}})
			}
		},

		onGoAddKnowledgeArticleUnitPage() {
			this.$router.push({ name: 'knowledge_article_content_unit_detail', query: { actionMode: 'new', knowledgeArticleId: this.id}})
		},
	}
}
</script>

<style scoped>

</style>