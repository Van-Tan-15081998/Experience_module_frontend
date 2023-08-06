<template>
	<div>
		<core-page-template
			v-if="isActionModeView"
			:page-title="'Chi tiết Chủ đề: ' + pageData.title"
			:is-loading-page="isPageLoadingData"
		>

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
							label="Tên chủ đề"
						>
							<template #content-side>
								{{pageData.title}}
							</template>
						</core-content>
					</template>
				</core-transition-content>

				<core-transition-content>
					<template #transition-content-side>
						<core-transition-content-list-expand
							title="Danh sách Chủ đề cha"
						>
							<template #contentListSide>

								<ul
									v-if="pageData.parentSubjectList.length > 0"
								>
									<li
										v-for="(item, index) in pageData.parentSubjectList"
										:key="index"
									>
										<button
											@click="onGoBranchSubjectViewPage(item.subjectId)"
											class="core-app-style__button only-margin-vertical green-harmony-color icon-effect-zoom-in">
											{{ item.title }}
										</button>
									</li>
								</ul>

								<span v-else>Danh sách rỗng</span>

							</template>
						</core-transition-content-list-expand>
					</template>
				</core-transition-content>

				<core-transition-content>
					<template #transition-content-side>
						<core-transition-content-list-expand
							title="Danh sách Chủ đề con"
						>
							<template #contentListSide>

								<ul
									v-if="pageData.branchSubjectList.length > 0"
								>
									<li
										v-for="(item, index) in pageData.branchSubjectList"
										:key="index"
									>
										<button
											@click="onGoBranchSubjectViewPage(item.subjectId)"
											class="core-app-style__button only-margin-vertical green-harmony-color icon-effect-zoom-in">
											{{ item.title }}
										</button>
									</li>
								</ul>

								<span v-else>Danh sách rỗng</span>

							</template>
						</core-transition-content-list-expand>
					</template>
				</core-transition-content>

				<core-transition-content>
					<template #transition-content-side>
						<core-transition-content-list-expand
							title="Danh sách Bài viết khoa học"
						>
							<template #contentListSide>

								<ul
									v-if="pageData.knowledgeArticleList.length > 0"
								>
									<li
										v-for="(item, index) in pageData.knowledgeArticleList"
										:key="index"
									>
										<button
											@click="onGoDetailKnowledgeArticlePage(item.knowledgeArticleId)"
											class="core-app-style__button only-margin-vertical green-harmony-color icon-effect-zoom-in">
											{{ item.title }}
										</button>
									</li>
								</ul>

								<span v-else>Danh sách rỗng</span>

							</template>
						</core-transition-content-list-expand>
					</template>
				</core-transition-content>

			</template>

			<template #rightSide>
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
					@click="onGoAddKnowledgeArticlePage"
					class="core-app-style__button full-width-size green-harmony-color icon-effect-zoom-in">
					<i class="bi bi-plus-square-dotted margin-right-5"></i>
					Thêm bài viết
				</button>
			</template>

		</core-page-template>

		<core-page-template
			v-else-if="isActionModeNew"
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

						<core-form-checkbox
							label="Chủ đề gốc"
						>
							<template #input-side>
								<input
									v-model="isRootSubject"
									type="checkbox"
								>
							</template>
						</core-form-checkbox>

						<core-group-content
							coreGroupContentLabel="Chủ đề cha"
						>
							<template #content-side>
								<core-dropdown
									v-for="(parentSubjectList, index) in pageData.parentSubjectList"
									:key="index"
									:can-delete="canDeleteParentSubject"
									:error="getInputErrorByKey('parentSubjectList.' + index + '.subjectId')"
									label="Chọn chủ dề"
								>
									<template #select-option-side>
										<select
											v-model="parentSubjectList.subjectId"
										>
											<option
												v-for="(item, index) in selectionItemsPageData.subjectList"
												:key="index"
												:value="item.subjectId" selected>{{ item.title }}</option>
										</select>
									</template>

									<template #can-delete-side>
										<button
											@click="onDeleteParentSubject(index)"
											class="core-app-style__button circle-rounded red-harmony-color icon-effect-zoom-in"
										>
											<i class="bi bi-dash-circle"></i>
										</button>
									</template>
								</core-dropdown>
								<button
									@click="onAddParentSubject"
									class="core-app-style__button blue-harmony-color icon-effect-zoom-in"
								>Thêm chủ đề cha</button>
							</template>
						</core-group-content>

						<core-group-content
							coreGroupContentLabel="Chủ đề con"
						>
							<template #content-side>
								<core-dropdown
									v-for="(branchSubject, index) in pageData.branchSubjectList"
									:key="index"
									:can-delete="canDeleteBranchSubject"
									:error="getInputErrorByKey('branchSubjectList.' + index + '.subjectId')"
									label="Chọn chủ dề"
								>
									<template #select-option-side>
										<select
											v-model="branchSubject.subjectId"
										>
											<option
												v-for="(item, index) in selectionItemsPageData.subjectList"
												:key="index"
												:value="item.subjectId" selected>{{ item.title }}</option>
										</select>
									</template>

									<template #can-delete-side>
										<button
											@click="onDeleteBranchSubject(index)"
											class="core-app-style__button circle-rounded red-harmony-color icon-effect-zoom-in"
										>
											<i class="bi bi-dash-circle"></i>
										</button>
									</template>
								</core-dropdown>
								<button
									@click="onAddBranchSubject"
									class="core-app-style__button blue-harmony-color icon-effect-zoom-in"
								>Thêm chủ đề con</button>
							</template>
						</core-group-content>
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
			page-title="Cập nhật chủ đề"
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

						<core-form-checkbox
							label="Chủ đề gốc"
						>
							<template #input-side>
								<input
									v-model="isRootSubject"
									type="checkbox"
								>
							</template>
						</core-form-checkbox>

						<core-group-content
							coreGroupContentLabel="Chủ đề cha"
						>
							<template #content-side>
								<core-dropdown
									v-for="(parentSubjectList, index) in pageData.parentSubjectList"
									:key="index"
									:can-delete="canDeleteParentSubject"
									:error="getInputErrorByKey('parentSubjectList.' + index + '.subjectId')"
									label="Chọn chủ dề"
								>
									<template #select-option-side>
										<select
											v-model="parentSubjectList.subjectId"
										>
											<option
												v-for="(item, index) in selectionItemsPageData.subjectList"
												:key="index"
												:value="item.subjectId" selected>{{ item.title }}</option>
										</select>
									</template>

									<template #can-delete-side>
										<button
											@click="onDeleteParentSubject(index)"
											class="core-app-style__button circle-rounded red-harmony-color icon-effect-zoom-in"
										>
											<i class="bi bi-dash-circle"></i>
										</button>
									</template>
								</core-dropdown>
								<button
									@click="onAddParentSubject"
									class="core-app-style__button blue-harmony-color icon-effect-zoom-in"
								>Thêm chủ đề cha</button>
							</template>
						</core-group-content>

						<core-group-content
							coreGroupContentLabel="Chủ đề con"
						>
							<template #content-side>
								<core-dropdown
									v-for="(branchSubject, index) in pageData.branchSubjectList"
									:key="index"
									:can-delete="canDeleteBranchSubject"
									:error="getInputErrorByKey('branchSubjectList.' + index + '.subjectId')"
									label="Chọn chủ dề"
								>
									<template #select-option-side>
										<select
											v-model="branchSubject.subjectId"
										>
											<option
												v-for="(item, index) in selectionItemsPageData.subjectList"
												:key="index"
												:value="item.subjectId" selected>{{ item.title }}</option>
										</select>
									</template>

									<template #can-delete-side>
										<button
											@click="onDeleteBranchSubject(index)"
											class="core-app-style__button circle-rounded red-harmony-color icon-effect-zoom-in"
										>
											<i class="bi bi-dash-circle"></i>
										</button>
									</template>
								</core-dropdown>
								<button
									@click="onAddBranchSubject"
									class="core-app-style__button blue-harmony-color icon-effect-zoom-in"
								>Thêm chủ đề con</button>
							</template>
						</core-group-content>
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
import SubjectApi from "@/scripts/Master/KnowledgeArticleMaster/Subject/SubjectApi";
export default {
	name: 'SubjectDetail',
	components: {
		CoreBasePage
	},
	extends: CoreBasePage,
	inject: ['apiService'],
	setup() {

	},
	mounted() {
	},
	data() {
		return {
			context: this,
			dataService: SubjectApi,

			idString: 'subjectId',

			detailPageName: 'subject_detail',

			pageData: {
				subjectId: null,

				title: null,
				level: null,
				sequence: null,

				parentSubjectList: [],
				branchSubjectList: [],
				knowledgeArticleList: [],

				removeParentSubjectList: [],
				removeBranchSubjectList: [],
				removeKnowledgeArticleList: [],
			},

			selectionItemsPageData: {
				subjectList: [],
				knowledgeArticleList: []
			},

			isRootSubject: false
		}
	},
	watch: {
		isRootSubject (value) {
			if(value) {
				this.pageData.level = 1;
			} else {
				this.pageDataCopy.level ? this.pageData.level = this.pageDataCopy.level : 2;
			}
		}
	},
	computed: {
		canDeleteParentSubject() {
			if(!this.isRootSubject) {
				return this.pageData.parentSubjectList.length > 1;
			}
			return this.pageData.parentSubjectList.length > 0;
		},
		canDeleteBranchSubject() {
			return this.pageData.branchSubjectList.length > 0;
		}
	},
	methods: {
		onDeleteParentSubject(index) {
			if (this.pageData.parentSubjectList[index]) {

				if(this.pageData.parentSubjectList[index]['subjectBranchSubjectId']) {
					this.pageData.removeParentSubjectList.push(
						this.pageData.parentSubjectList[index]
					)

				}

				this.pageData.parentSubjectList.splice(index, 1);
			}
		},

		onAddParentSubject() {
			let parentSubjectObj = {
				subjectId: 0 //  Mặc định là item có id = 1 trong branchSubjectList
			}

			this.pageData.parentSubjectList.push(parentSubjectObj);
		},

		onDeleteBranchSubject(index) {
			if (this.pageData.branchSubjectList[index]) {

				if(this.pageData.branchSubjectList[index]['subjectBranchSubjectId']) {
					this.pageData.removeBranchSubjectList.push(
						this.pageData.branchSubjectList[index]
					)
				}

				this.pageData.branchSubjectList.splice(index, 1);
			}
		},

		onAddBranchSubject() {
			let branchSubjectObj = {
				subjectId: 0 //  Mặc định là item có id = 1 trong branchSubjectList
			}

			this.pageData.branchSubjectList.push(branchSubjectObj);
		},

		onGoAddKnowledgeArticlePage() {
			this.$router.push({ name: 'knowledge_article_detail', query: { actionMode: 'new', subjectId: this.id}})
		},
		onGoDetailKnowledgeArticlePage(id) {
			this.$router.push({ name: 'knowledge_article_detail', query: { id: id, actionMode: 'view', subjectId: this.id}})
		}
	}
}
</script>

<style scoped>

</style>