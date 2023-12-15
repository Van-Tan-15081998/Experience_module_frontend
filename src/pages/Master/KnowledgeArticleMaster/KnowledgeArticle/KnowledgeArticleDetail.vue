<template>
	<div>
		<core-page-template
			v-if="isActionModeView"
			:page-title="'Chi tiết bài viết: ' + pageData.title"
			:is-loading-page="isPageLoadingData"
      :is-processing-page="isPageLoadingData"
		>

			<template #leftSide>
				<core-shortcut-list
					:list="pageData.unitContentList"
					id-string="knowledgeArticleContentUnitId"
					title-string="title"
          class="core-shortcut-list"
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

        <core-transition-content>
          <template #transition-content-side>
            <core-transition-content-list-expand
                title="Danh sách Tags"
                :length-of-content-list="lengthOfContentList"
            >
              <template
                  v-if="pageData.tagList.length > 0"
                  #contentListSide>

                <div v-for="(item, index) in pageData.tagList"
                     :key="index"
                     class="item"
                >
                  <button
                      class="core-app-style__button fit-height-size only-margin-vertical green-harmony-color icon-effect-zoom-in">
                    {{ item?.title }}
                  </button>
                </div>

              </template>
            </core-transition-content-list-expand>
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
              :input-value="pageData.title"
              @onDeleteInputData="pageData.title = ''"
              @onPasteInputData="(value) => pageData.title = value"
						>
							<template #input-side>
								<input
									v-model="pageData.title"
									type="text"
									placeholder="Nhập text"
                  @keyup.enter="save"
								>
							</template>
						</core-form-input>

            <core-search-selection>

              <template #selection-list>
                <div
                    v-for="(item, index) in selectionItemsPageData.tagList"
                    :key="index"
                    class="checkbox">
                  <label class="checkbox-wrapper">
                    <input type="checkbox" class="checkbox-input" :value="item?.tagId" v-model="pageData.tagList" />
                    <span class="checkbox-tile">
                        <span class="checkbox-icon">

                        </span>
                        <span class="checkbox-label">{{ item?.title || 'Tag Title'}}</span>
                      </span>
                  </label>
                </div>
              </template>

              <template #selection-search-input>
                <core-form-input>
                  <template #input-side>
                    <input
                        v-model="tagSearchString"
                        type="text"
                        placeholder="Nhập text"
                    >
                  </template>
                </core-form-input>
              </template>

              <template #selection-search-result>
                <div
                    v-for="(item, index) in selectionItemsPageData.tagListSearchResult"
                    :key="index"
                    class="checkbox">
                  <label class="checkbox-wrapper">
                    <input type="checkbox" class="checkbox-input" :value="item?.tagId" v-model="pageData.tagList" />
                    <span class="checkbox-tile">
                        <span class="checkbox-icon">

                        </span>
                        <span class="checkbox-label">{{ item?.title || 'Tag Title'}}</span>
                      </span>
                  </label>
                </div>
              </template>

            </core-search-selection>

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
              :input-value="pageData.title"
              @onDeleteInputData="pageData.title = ''"
              @onPasteInputData="(value) => pageData.title = value"
						>
							<template #input-side>
								<input
									v-model="pageData.title"
									type="text"
									placeholder="Nhập text"
								>
							</template>
						</core-form-input>

            <core-search-selection>

              <template #selection-list>
                <div
                    v-for="(item, index) in selectionItemsPageData.tagList"
                    :key="index"
                    class="checkbox">
                  <label class="checkbox-wrapper">
                    <input type="checkbox" class="checkbox-input" :value="item?.tagId" v-model="pageData.tagListEdit" />
                    <span class="checkbox-tile">
                        <span class="checkbox-icon">

                        </span>
                        <span class="checkbox-label">{{ item?.title || 'Tag Title'}}</span>
                      </span>
                  </label>
                </div>
              </template>

              <template #selection-search-input>
                <core-form-input>
                  <template #input-side>
                    <input
                        v-model="tagSearchString"
                        type="text"
                        placeholder="Nhập text"
                    >
                  </template>
                </core-form-input>
              </template>

              <template #selection-search-result>
                <div
                    v-for="(item, index) in selectionItemsPageData.tagListSearchResult"
                    :key="index"
                    class="checkbox">
                  <label class="checkbox-wrapper">
                    <input type="checkbox" class="checkbox-input" :value="item?.tagId" v-model="pageData.tagListEdit" />
                    <span class="checkbox-tile">
                        <span class="checkbox-icon">

                        </span>
                        <span class="checkbox-label">{{ item?.title || 'Tag Title'}}</span>
                      </span>
                  </label>
                </div>
              </template>

            </core-search-selection>

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
					Bạn muốn xóa Bài viết này?
				</template>

				<template #body>
					<div class="core-app-style__full-size-relative core-display-flex__center">
						<button
							@click="onConfirmDelete"
							class="core-app-style__button blue-harmony-color icon-effect-zoom-in"
						>Xóa</button>

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

  computed: {
    lengthOfContentList() {
      return this.$refs.contentListDetail ? this.$refs.contentListDetail.offsetHeight : 0;
    }
  },

  mounted() {


  },

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

				unitContentList: [],

        tagList: [],
        tagListEdit: [],
			},

      tagSearchString: '',

			selectionItemsPageData: {
        tagList: [],
        tagListSearchResult: [],
			},
		}
	},

	watch: {
    tagSearchString(value) {
      if(value !== '') {
        this.selectionItemsPageData.tagListSearchResult = [];
        this.selectionItemsPageData.tagList.forEach(element => {
          if(element?.title?.toLowerCase().includes(value.toLowerCase())) {
            this.selectionItemsPageData.tagListSearchResult.push(element);
          }
        })
      } else {
        this.selectionItemsPageData.tagListSearchResult = [];
      }
    },

    'pageData.tagListEdit' : {
      handler (newValue) {
        if(newValue) {
          this.pageData.tagList = newValue;
        }
      },
      deep: true
    }
  },

	methods: {
    removeDuplicate(arr) {
      let outputArray = Array.from(new Set(arr.map(obj => obj.tagId)))
      .map(tagId => {
        return arr.find(obj => obj.tagId === tagId);
      });

      return outputArray;
    },

initDefaultDataForNewMode() {
     if(this.actionMode == 'new') {
       this.pageData.tagList = [];
     }
    },

    initDefaultDataForEditMode() {
      if(this.pageData.tagList.length > 0) {

        this.pageData.tagList = this.removeDuplicate(this.pageData.tagList);
        this.pageData.tagListEdit = [];

        this.pageData.tagList.forEach(tag => {
          this.pageData.tagListEdit.push(
            tag?.tagId
          );
        })
      }
    },

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

<style scoped lang="scss">
.checkbox-group {
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  width: 90%;
  margin-left: auto;
  margin-right: auto;
  user-select: none;
& > * {
    margin: .5rem 0.5rem;
  }
}

.checkbox {
  margin: 10px;
}

.checkbox-group-legend {
  font-size: 1.5rem;
  font-weight: 700;
  color: #9c9c9c;
  text-align: center;
  line-height: 1.125;
  margin-bottom: 1.25rem;
}

.checkbox-input {
// Code to hide the input
clip: rect(0 0 0 0);
  clip-path: inset(100%);
  height: 1px;
  overflow: hidden;
  position: absolute;
  white-space: nowrap;
  width: 1px;

&:checked + .checkbox-tile {
   border-color: #2260ff;
   box-shadow: 0 5px 10px rgba(#000, 0.1);
   color: #2260ff;
&:before {
   transform: scale(1);
   opacity: 1;
   background-color: #2260ff;
   border-color: #2260ff;
 }

.checkbox-icon, .checkbox-label {
  color: #2260ff;
}
}

&:focus + .checkbox-tile {
   border-color: #2260ff;
   box-shadow: 0 5px 10px rgba(#000, 0.1), 0 0 0 4px #b5c9fc;
&:before {
   transform: scale(1);
   opacity: 1;
 }
}
}

.checkbox-tile {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 7rem;
  min-height: 7rem;
  border-radius: 0.5rem;
  border: 2px solid #b5bfd9;
  background-color: #fff;
  box-shadow: 0 5px 10px rgba(#000, 0.1);
  transition: 0.15s ease;
  cursor: pointer;
  position: relative;

&:before {
   content: "";
   position: absolute;
   display: block;
   width: 1.25rem;
   height: 1.25rem;
   border: 2px solid #b5bfd9;
   background-color: #fff;
   border-radius: 50%;
   top: 0.25rem;
   left: 0.25rem;
   opacity: 0;
   transform: scale(0);
   transition: 0.25s ease;
   //background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='192' height='192' fill='%23FFFFFF' viewBox='0 0 256 256'%3E%3Crect width='256' height='256' fill='none'%3E%3C/rect%3E%3Cpolyline points='216 72.005 104 184 48 128.005' fill='none' stroke='%23FFFFFF' stroke-linecap='round' stroke-linejoin='round' stroke-width='32'%3E%3C/polyline%3E%3C/svg%3E");
   background-size: 12px;
   background-repeat: no-repeat;
   background-position: 50% 50%;
 }

&:hover {
   border-color: #2260ff;
&:before {
   transform: scale(1);
   opacity: 1;
 }
}
}

.checkbox-icon {
  transition: .375s ease;
  color: #494949;
svg {
  width: 3rem;
  height: 3rem;
}
}

.checkbox-label {
  color: #707070;
  transition: .375s ease;
  text-align: center;
}
</style>