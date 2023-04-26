<template>
	<div>
		<core-page-template
			:page-title="'Chi tiết Chủ đề: ' + pageData.title"
		>

			<template #centerSide>

				<core-transition-content-list-expand
					title="Danh sách Chủ đề con"
				>
					<template #contentListSide>

						<ul>
							<li
								v-for="(item, index) in pageData.branchSubjectList"
								:key="index"
							>
								<button
									class="core-app-style__button only-margin-vertical green-harmony-color icon-effect-zoom-in">
									{{ item.title }}
								</button>
							</li>
						</ul>

					</template>
				</core-transition-content-list-expand>

				<core-transition-content-list-expand
					title="Danh sách Bài viết khoa học"
				>
					<template #contentListSide>

						<ul>
							<li
								v-for="(item, index) in pageData.knowledgeArticleList"
								:key="index"
							>
								<button
									class="core-app-style__button only-margin-vertical green-harmony-color icon-effect-zoom-in">
									{{ item.title }}
								</button>
							</li>
						</ul>

					</template>
				</core-transition-content-list-expand>

			</template>

		</core-page-template>
	</div>
</template>

<script>
import CoreBasePage from "@/core/components/base/CoreBasePage.vue";
import subjectApi from "@/scripts/Master/KnowledgeArticleMaster/Subject/SubjectApi";
import CorePageTemplate from "@/core/components/page-template/CorePageTemplate.vue";
import CoreTransitionContentListExpand
	from "@/core/components/transition-content-list-expand/CoreTransitionContentListExpand.vue";

export default {
	name: 'SubjectView',
	extends: CoreBasePage,
	inject: ['apiService'],
	components: {
		CorePageTemplate,
		CoreTransitionContentListExpand
	},
	data() {
		return {
			context: this,
			dataService: subjectApi,

			idString: 'subjectId',

			pageData: {
				title: null,
				branchSubjectList: [],
				knowledgeArticleList: []
			}
		}
	},
	mounted() {

	}
}
</script>

<style scoped>

</style>