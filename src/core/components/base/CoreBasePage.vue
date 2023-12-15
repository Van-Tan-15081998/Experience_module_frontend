
<script>
import {isEmpty, cloneDeep} from 'lodash'
import CoreBackButton from "@/core/components/back-button/CoreBackButton.vue";

import CoreDropdown from "@/core/components/dropdown/CoreDropdown.vue";
import CorePageTemplate from "@/core/components/page-template/CorePageTemplate.vue";
import CoreTransitionContentListExpand
	from "@/core/components/transition-content-list-expand/CoreTransitionContentListExpand.vue";
import CoreForm from "@/core/components/form/CoreForm.vue";
import CoreNotification from "@/core/components/notification/CoreNotification.vue";
import CoreFormInput from "@/core/components/form-input/CoreFormInput.vue";
import CoreTransitionContent from "@/core/components/transition-content/CoreTransitionContent.vue";
import CoreContent from "@/core/components/content/CoreContent.vue";
import CoreGroupContent from "@/core/components/group-content/CoreGroupContent.vue";
import CoreFormCheckbox from "@/core/components/form-checkbox/CoreFormCheckbox.vue";
import CoreModal from "@/core/components/modal/CoreModal.vue";
import CoreFormTextArea from "@/core/components/form-textarea/CoreFormTextarea.vue";
import CoreShortcutList from "@/core/components/shortcut-list/CoreShortcutList.vue";
import CoreSearchSelection from "@/core/components/search-selection/CoreSearchSelection";

// Component not core
import KnowledgeArticleItem from "@/pages/Master/KnowledgeArticleMaster/KnowledgeArticleItem/KnowledgeArticleItem";

import {isEqual} from 'lodash';

export default {
	name: 'CoreBasePage',
	components: {
		CoreBackButton,
		CoreDropdown,
		CorePageTemplate,
		CoreTransitionContentListExpand,
		CoreForm,
		CoreNotification,
		CoreFormInput,
		CoreTransitionContent,
		CoreContent,
		CoreGroupContent,
		CoreFormCheckbox,
		CoreModal,
		CoreFormTextArea,
		CoreShortcutList,
    CoreSearchSelection,
    KnowledgeArticleItem
	},
	data() {
		return {
			id: null,
			idString: null,
			context: null,
			dataService: null,

			isPageLoadingData: true,
			isPageReloadingData: false,

      isPageLoadedData: false,

			pageData: null,
			pageDataCopy: null,
			selectionItemsPageData: null,

			actionMode: null,

			detailPageName: '',
      listPageName: '',

			inputErrors: [],
			statuses: [],

      rootFilterProperties: null,
      filterProperties: null,
      isFiltering: false,

			isOpenConfirmDeleteModal: false
		}
	},
	mounted() {
		this.initPage();
	},
	watch: {
    filterProperties: {
      handler (newValue) {
        // Gán giá trị cho rootFilterProperties
        if(this.rootFilterProperties === null && newValue !== null) {
          this.rootFilterProperties = newValue;
        }

        // Khi filterProperties thay đổi so với rootFilterProperties => isFiltering = true
        if(!isEqual(newValue, this.rootFilterProperties)) {
          this.isFiltering = true;
        } else {
          this.isFiltering = false;
        }
      },
      deep: true
    },
		actionMode: {
			handler (newValue, oldValue) {
				if(oldValue !== null) {
          if(this.dataService && this.context) {
            this.initPage();

            this.resetPageData();
          }
        }
			},
			deep: true
		},
    routeComputed: {
      handler (newValue, oldValue) {
        if(newValue.path === oldValue.path && !isEqual(newValue.query, oldValue.query) && isEqual(newValue.query.actionMode, oldValue.query.actionMode)) {
          // Chỉ áp dụng cho filter
          if(this.isFiltering) {
            if(this.dataService && this.context) {
              this.initPage();
            }
          }
        }

        if(newValue.path === oldValue.path  && (!isEqual(newValue.query.actionMode, oldValue.query.actionMode) || !isEqual(newValue.query.id, oldValue.query.id))) {
          if(this.dataService && this.context) {
            this.initPage();
          }
        }
      },
      deep: true
    },
	},
	computed: {
		isShowStatuses() {
			if(this.statuses.length > 0) {
				return true;
			}
			return false
		},
		getStatusesComputed() {
			return this.statuses;
		},
		isActionModeNew() {
			return this.actionMode === 'new';
		},
		isActionModeView() {
			return this.actionMode === 'view';
		},
		isActionModeEdit() {
			return this.actionMode === 'edit';
		},
    routeComputed() {
      return this.$route;
    }
	},
	methods: {
		initPage() {
			this.isPageLoadingData = true;

			if(this.$route.params.statuses) {
				this.statuses.push(this.$route.params.statuses);
			}

			this.parseRouteParams().then((resolve) => {
				if (resolve) {
					this.loadPageData();
				}
			})
		},

		async loadPageData() {
			if(this.context && this.dataService) {
				let dataObj = null;

				if(this.actionMode === 'new') {
					dataObj = await this.dataService.getDetailData(
						this.context,
						'?actionMode=' + this.actionMode,
						{}
					)
				} else if((this.actionMode === 'edit' || this.actionMode === 'view') && this.id && this.idString) {
					dataObj = await this.dataService.getDetailData(
						this.context,
						'?actionMode=' + this.actionMode + '&' + this.idString + '=' + this.id,
						{}
					)
				}

				// Load data thất bại
				if(!dataObj) {
					this.isPageLoadingData = false;
					return;
				}

				if(dataObj.data) {
					this.parsePageData(dataObj.data.data);

					this.parseSelectionItemsPageData(dataObj.data.selectionItems);

					if (this.actionMode === 'new') {
						this.initDefaultDataForNewMode();
					}

          if (this.actionMode === 'edit') {
            this.initDefaultDataForEditMode();
          }

          this.updateLoadedData();
				}

				this.isPageLoadingData = false;
			}
		},

		async save() {
			this.resetAlert();
			this.isPageLoadingData = true;

			let dataObj = null;

			if(this.context && this.dataService) {

				if(this.actionMode === 'new') {
					dataObj = await this.dataService.save(this.context, true, this.pageData);
				} else if (this.actionMode === 'edit') {
					dataObj = await this.dataService.save(this.context, false, this.pageData);
				}

				if(!dataObj) {
					this.isLoadingProcessing = false;

					return;
				}

				// Lỗi validate
				if(dataObj.inputErrors) {
					this.inputErrors = dataObj.inputErrors;
				}

				// Nếu save thành công
				if(dataObj.data) {
					this.parsePageData(dataObj.data.data);

					this.onGoDetailViewPage();
				}

				// Nhận thông báo
				if(dataObj.alerts) {
					this.statuses = dataObj.alerts;
				}

				this.isPageLoadingData = false;
			}
		},

    async delete() {
      this.isPageLoadingData = true;

      let dataObj = null;

      if(this.context && this.dataService) {

        dataObj = await this.dataService.delete(this.context, this.pageData);

        if(!dataObj) {
          this.isLoadingProcessing = false;

          return;
        }

        // Lỗi validate
        if(dataObj.inputErrors) {
          this.inputErrors = dataObj.inputErrors;
        }

        // Nếu save thành công
        if(dataObj.data) {
          this.parsePageData(dataObj.data.data);
          this.onGoListViewPage();
        }

        // Nhận thông báo
        if(dataObj.alerts) {
          this.statuses = dataObj.alerts;
        }

        this.isPageLoadingData = false;
      }
    },

		parseRouteParams() {

			let routeQueryParams = this.$route.query;

			if(!isEmpty(routeQueryParams)) {
				if(routeQueryParams.actionMode && (routeQueryParams.actionMode === 'new' || routeQueryParams.actionMode === 'edit' || routeQueryParams.actionMode === 'view')) {

					this.actionMode = routeQueryParams.actionMode;
					// => actionMode = new | edit | view

					if(this.actionMode === 'edit' || this.actionMode === 'view') {
						if(routeQueryParams.id) {
							this.id = parseInt(routeQueryParams.id);
						}
					}

					// Parse page data - nếu có
					if(this.pageData) {
						Object.keys(this.pageData).forEach((key) => {
							if(routeQueryParams[key] !== null && routeQueryParams[key] !== undefined) {
								this.pageData[key] = routeQueryParams[key];
							}
						})
					}

				} else if(routeQueryParams.actionMode === null || routeQueryParams.actionMode === undefined || (routeQueryParams.actionMode !== 'new' && routeQueryParams.actionMode !== 'edit' && routeQueryParams.actionMode !== 'view')) {

					window.history.replaceState(null, null, this.displayURLChangeActionModeNew());
					this.actionMode = 'new';
				}
			} else if(isEmpty(routeQueryParams)) {
				window.history.replaceState(null, null, this.displayURLChangeActionModeNew());
				this.actionMode = 'new';
			}

			return Promise.resolve(true)
		},

		parsePageData(data = null) {
			if(this.pageData) {
				Object.keys(this.pageData).forEach((key) => {
					if(data && data[key] !== null && data[key] !== undefined) {
						this.pageData[key] = data[key];
					}
				})
			}

			// Parse id
			if(data && data[this.idString] !== null && data[this.idString] !== undefined) {
				this.id = data[this.idString];
			}

			// Clone page data
			if(this.pageData) {
				this.pageDataCopy = cloneDeep(this.pageData);
			}
		},

		parseSelectionItemsPageData(data = null) {
			if(this.selectionItemsPageData) {
				Object.keys(this.selectionItemsPageData).forEach((key) => {
					if(data && data[key] !== null && data[key] !== undefined) {
						this.selectionItemsPageData[key] = data[key];
					}
				})
			}
		},

		displayURLChangeActionModeNew() {
			let url = new URL(window.location.href);

			// Clear Action Mode and id
			url.searchParams.delete('actionMode');
			url.searchParams.delete('id');

			// Mặc định của Action Mode sẽ là 'new'
			url.searchParams.set('actionMode', 'new');

			return url;
		},

		displayURLChangeActionModeEdit() {
			let url = new URL(window.location.href);

			url.searchParams.set('actionMode', 'edit');

			return url;
		},

    updateLoadedData() {

    },

    initDefaultDataForNewMode() {
		},
    initDefaultDataForEditMode() {
    },

    resetPageData() {
      this.resetAlert();
    },

		resetAlert() {
			this.resetInputErrors();
			this.resetStatuses();
		},

		resetInputErrors() {
			this.inputErrors = [];
		},

		resetStatuses() {
			this.statuses = [];
		},

		getSelectionItemFormDataByKey(key) {
			if(this.selectionItemsPageData && key.toString() !== '' && this.selectionItemsPageData[key]) {
				return this.selectionItemsPageData[key];
			}
			return [];
		},

		getInputErrorByKey(key) {
			if(this.inputErrors && key.toString() !== '' && this.inputErrors[key]) {
				return this.inputErrors[key][0];
			}
			return '';
		},

		onGoBranchSubjectViewPage(subjectId) {
			this.$router.push({ name: this.detailPageName, query: { id: subjectId, actionMode: 'view'}});
		},

		onGoDetailViewPage() {
			this.$router.push(
				{
					name: this.detailPageName,
					query: { id: this.id, actionMode: 'view'},
					arguments: {statuses: this.statuses}
				});
		},

    onGoListViewPage() {
      this.$router.push(
          {
            name: this.listPageName,
            query: {},
            arguments: {statuses: this.statuses}
          });
    },

		onGoEditPage() {
			this.$router.push({ name: this.detailPageName, query: { id: this.id, actionMode: 'edit'}});
		},

		onOpenConfirmDeleteModal() {
			this.isOpenConfirmDeleteModal = true;
		},

		onCloseConfirmDeleteModal() {
			this.isOpenConfirmDeleteModal = false;
		},

		onConfirmDelete() {
      this.delete();
		}
	}
}
</script>

<style scoped>

</style>