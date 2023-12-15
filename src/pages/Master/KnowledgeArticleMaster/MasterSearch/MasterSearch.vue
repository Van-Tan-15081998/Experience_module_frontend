<template>
  <div>
    <core-page-template
        page-title="Master Search"
        :is-loading-page="isPageLoadingData"
        :is-show-search-bar="true"
    >

      <template #searchBar>
        <core-form
            :is-has-footer="false"
        >
          <template #formContent>
            <core-form-input
                :is-show-input-actions="false"
            >
              <template #input-side>
                <input
                    v-model="searchData.searchString"
                    type="text"
                    placeholder="Enter Search Text..."
                    @keyup.enter="onSearch"
                    :disabled="isDisabledInputSearch"
                >
              </template>
            </core-form-input>

            <button
                @click="isOpenFilterTags = !isOpenFilterTags"
                class="core-app-style__button blue-harmony-color icon-effect-zoom-in"
            >Filter by Tags</button>
          </template>
        </core-form>

      </template>

      <template #centerSide>
        <div>

<!--          <search-result-item-->
<!--              v-for="(item, index) in pageData.knowledgeArticleList" :key="index"-->
<!--              :title="item.title"-->
<!--          ></search-result-item>-->

          <core-table
              :pagination-info="paginationInfo"
              :loading="isPageLoadingData"
              :not-use-table-format="true"
          >

            <template #tableContentWrapper>
              <core-transition-content>
                <template #transition-content-side>
                  <core-transition-content-list-expand
                      title="Kết quả tìm kiếm theo Bài viết"
                      :length-of-content-list="lengthOfContentList"
                  >
                    <template
                        v-if="pageData.knowledgeArticleList.length > 0"
                        #contentListSide>

                      <div v-for="(item, index) in pageData.knowledgeArticleList"
                           :key="index"
                           class="item"
                      >
                        <search-result-item
                            :title="item.title"
                        ></search-result-item>
                      </div>

                    </template>
                    <template
                        v-else
                        #contentListSide>

                      <div v-for="(item, index) in rootPageData"
                           :key="index"
                           class="item"
                      >
                        <search-result-item
                            :title="item.title"
                        ></search-result-item>
                      </div>

                    </template>
                  </core-transition-content-list-expand>
                </template>
              </core-transition-content>
            </template>

          </core-table>

        </div>

        <div>

        </div>
      </template>

      <template #rightSide>

        <button
            class="core-app-style__button full-width-size green-harmony-color icon-effect-zoom-in">
          <i class="bi bi-clock-history margin-right-5"></i>
          Lịch sử tìm kiếm
        </button>
        <button
            class="core-app-style__button full-width-size green-harmony-color icon-effect-zoom-in">
          <i class="bi bi-body-text margin-right-5"></i>
          Lịch sử truy cập
        </button>
      </template>
    </core-page-template>

    <teleport to="#app">

      <core-modal :show="isOpenFilterTags">
        <template #header>
          Filter Tags
        </template>

        <template #body>

          <core-form>

            <template #formContent>

          <core-search-selection>

            <template #selection-list>
              <div
                  v-for="(item, index) in selectionItemsPageData.tagList"
                  :key="index"
                  class="checkbox">
                <label class="checkbox-wrapper">
                  <input type="checkbox" class="checkbox-input" :value="item?.tagId" v-model="searchData.tagListSearch" />
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
                  <input type="checkbox" class="checkbox-input" :value="item?.tagId" v-model="searchData.tagListSearch" />
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
              @click="isOpenFilterTags = false"
              class="core-app-style__button blue-harmony-color icon-effect-zoom-in"
          >Xác nhận</button>

        </template>

          </core-form>

        </template>
      </core-modal>

    </teleport>

  </div>
</template>

<script>

import CorePageTemplate from "@/core/components/page-template/CorePageTemplate.vue";
import CoreBaseSearch from "@/core/components/base/CoreBaseSearch";
import CoreFormInput from "@/core/components/form-input/CoreFormInput";
import CoreForm from "@/core/components/form/CoreForm";
import MasterSearchApi from "@/scripts/Master/KnowledgeArticleMaster/MasterSearch/MasterSearchApi";
import SearchResultItem from "@/pages/Master/KnowledgeArticleMaster/MasterSearch/SearchResultItem";
import CoreTransitionContent from "@/core/components/transition-content/CoreTransitionContent";
import CoreTransitionContentListExpand
  from "@/core/components/transition-content-list-expand/CoreTransitionContentListExpand";
import CoreTable from "@/core/components/common/CoreTable.vue";

export default {
  name: "MasterSearch",
  extends: CoreBaseSearch,
  inject: ['apiService'],
  components: {
    CoreTable,
    CorePageTemplate,
    CoreFormInput,
    CoreForm,
    SearchResultItem,
    CoreTransitionContent,
    CoreTransitionContentListExpand
  },
  mounted() {
    this.isPageLoadingData = false;
  },
  computed: {
    lengthOfContentList() {
      return this.$refs.contentListDetail ? this.$refs.contentListDetail.offsetHeight : 0;
    }
  },
  data() {
    return {
      context: this,
      dataService: MasterSearchApi,

      pageData: {
        knowledgeArticleList: []
      },

      searchData: {
        searchString: 'Search',
        tagListSearch: [],
      },

      paginationInfo: {
        currentPage: 0,
        limitCount: 0,
        totalCount: 0,
        totalPages: 0
      },

      tagSearchString: '',

      selectionItemsPageData: {
        tagList: [],
        tagListSearchResult: [],
      },

      isOpenFilterTags: false
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
  },
  methods: {
    resetPageData() {
      this.pageData.knowledgeArticleList = [];
    }
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