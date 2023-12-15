<template>
  <div>
    <core-page-template
        v-if="isActionModeView"
        :page-title="'Chi tiết Tag: ' + pageData.title"
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
                label="Tên Tag"
            >
              <template #content-side>
                {{pageData.title}}
              </template>
            </core-content>
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

      </template>

    </core-page-template>

    <core-page-template
        v-else-if="isActionModeNew"
        page-title="Tạo Tag"
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
                @onDeleteInputData="()=>{pageData.title = '';$refs.pageDataTitle.focus()}"
                @onPasteInputData="(value) => pageData.title = value"
            >
              <template #input-side>
                <input
                    v-model="pageData.title"
                    ref="pageDataTitle"
                    type="text"
                    placeholder="Nhập text"
                >
              </template>
            </core-form-input>

            <div class="select-color-wrapper">
              <div class="selected-color-wrapper">
                <div
                    :style="{'background-color': pageData.color}"
                    class="selected-color">
                </div>
                <span>{{pageData.color}}</span>
              </div>
              <div
                  v-for="color in selectionItemsPageData.defaultTagColorListCopy"
                  :key="color['defaultTagColorId']"
                  @click="onSelectColor(color)"
                  class="color-part"
                  :style="{'background-color': color['color']} "
                  :class="{selected: color['selected']}"
              >
              <span>{{color['color']}}</span>
              </div>
            </div>

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
        page-title="Cập nhật Tag"
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
          Bạn muốn xóa Tag này?
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

import {cloneDeep} from 'lodash'

import CoreBasePage from "@/core/components/base/CoreBasePage.vue";
import TagApi from "@/scripts/Master/KnowledgeArticleMaster/Tag/TagApi";
export default {
  name: 'TagDetail',
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
      dataService: TagApi,

      idString: 'tagId',

      detailPageName: 'tag_detail',
      listPageName: 'tag_list',

      pageData: {
        tagId: null,

        title: null,
        level: null,
        sequence: null,

        color: null
      },

      selectionItemsPageData: {
        tagList: [],
        defaultTagColorList: [],
        defaultTagColorListCopy: []
      },
    }
  },
  watch: {
    'selectionItemsPageData.defaultTagColorList' : {
      handler (newValue) {
        if(newValue) {
          this.selectionItemsPageData.defaultTagColorListCopy = cloneDeep(newValue);
          this.selectionItemsPageData.defaultTagColorListCopy.forEach((element) => {
            element['selected'] = false;
          })
        }
      },
      deep: true
    }
  },
  computed: {
    lengthOfContentList() {
      return this.$refs.contentListDetail ? this.$refs.contentListDetail.offsetHeight : 0;
    }
  },
  methods: {
    updateLoadedData() {

    },

    onSelectColor(color = null) {
      if(color) {
        this.pageData.color = color['color'];
        this.selectionItemsPageData.defaultTagColorListCopy.forEach((element, index) => {
          if(element['defaultTagColorId'] === color['defaultTagColorId']) {
            console.log(this.selectionItemsPageData.defaultTagColorListCopy[index])
            this.selectionItemsPageData.defaultTagColorListCopy[index]['selected'] = true;
          } else {
            this.selectionItemsPageData.defaultTagColorListCopy[index]['selected'] = false;
          }
        });

      }

      console.log(color,this.pageData.color,this.selectionItemsPageData.defaultTagColorListCopy)
    }
  }
}
</script>

<style scoped lang="scss">
.select-color-wrapper {
  border: 1px solid #626262;
  border-radius: 5px;

  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: flex-start;
  align-items: flex-start;
  align-content: flex-start;

  .selected-color-wrapper {
    width: 100%;
    height: 60px;
    border-bottom: 1px solid #626262;

    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
    justify-content: flex-start;
    align-items: center;
    align-content: center;

    .selected-color {
      width: 80px;
      height: 50px;
      margin: 5px;
      border-radius: 5px;
      border: 2px solid #626262;

    }
  }

  .color-part {
    width: 80px;
    height: 50px;
    margin: 5px;
    border-radius: 5px;
    border: 2px solid #626262;
    transition: 0.2s;

    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
    justify-content: center;
    align-items: center;
    align-content: center;

    span {
      color: black;
    }

    &:active {
      border: 2px solid white;
    }

    &:hover {
      cursor: pointer;
      transform: skewX(10DEG);
    }

    &.selected {
      border: 2px solid white;
      animation: selected-anim 1s infinite ease-in-out;
    }
  }

  @keyframes selected-anim {
    0% {
      transform: rotate(0) scale(1) skew(1deg)
    }
    10% {
      transform: rotate(-5deg) scale(1) skew(1deg)
    }
    20% {
      transform: rotate(5deg) scale(1) skew(1deg)
    }
    30% {
      transform: rotate(-5deg) scale(1) skew(1deg)
    }
    40% {
      transform: rotate(5deg) scale(1) skew(1deg)
    }
    50% {
      transform: rotate(0) scale(1) skew(1deg)
    }
    100% {
      transform: rotate(0) scale(1) skew(1deg)
    }
  }
}
</style>