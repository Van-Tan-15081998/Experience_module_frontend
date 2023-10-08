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
          </template>
        </core-form>
      </template>

      <template #centerSide>
        <div>

<!--          <search-result-item-->
<!--              v-for="(item, index) in pageData.knowledgeArticleList" :key="index"-->
<!--              :title="item.title"-->
<!--          ></search-result-item>-->

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
              </core-transition-content-list-expand>
            </template>
          </core-transition-content>

        </div>

        <div>

        </div>
      </template>
    </core-page-template>

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

export default {
  name: "MasterSearch",
  extends: CoreBaseSearch,
  inject: ['apiService'],
  components: {
    CorePageTemplate,
    CoreFormInput,
    CoreForm,
    SearchResultItem,
    CoreTransitionContent,
    CoreTransitionContentListExpand
  },
  mounted() {
    this.isPageLoadingData = false
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
      }
    }
  },
  methods: {
    resetPageData() {
      this.pageData.knowledgeArticleList = [];
    }
  }

}
</script>

<style scoped>

</style>