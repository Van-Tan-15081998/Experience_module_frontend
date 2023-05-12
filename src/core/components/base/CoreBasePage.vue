
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
		CoreFormCheckbox
	},
	data() {
		return {
			id: null,
			idString: null,
			context: null,
			dataService: null,

			isPageLoadingData: true,
			isPageReloadingData: false,
			pageData: null,
			pageDataCopy: null,
			selectionItemsPageData: null,

			actionMode: null,

			inputErrors: [],
			statuses: [],
		}
	},
	mounted() {
		this.initPage();
	},
	watch: {
		actionMode: {
			handler () {
				if(this.dataService && this.context) {
					this.initPage();
				}
			},
			deep: true
		},
		routeParamComputed: {
			handler (value) {
				if(value && this.dataService && this.context) {
					this.initPage();
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
		routeParamComputed() {
			return this.$route.query;
		}
	},
	methods: {
		initPage() {
			this.isPageLoadingData = true;

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
						this.initDefaultData();
					}

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
				} else if(routeQueryParams.actionMode === null || routeQueryParams.actionMode === undefined || (routeQueryParams.actionMode !== 'new' && routeQueryParams.actionMode !== 'edit' && routeQueryParams.actionMode !== 'view')) {

					window.history.replaceState(null, null, this.displayURLChangeActionMode());
					this.actionMode = 'new';
				}
			} else if(isEmpty(routeQueryParams)) {
				window.history.replaceState(null, null, this.displayURLChangeActionMode());
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

		displayURLChangeActionMode() {
			let url = new URL(window.location.href);

			// Clear Action Mode and Id
			url.searchParams.delete('actionMode');
			url.searchParams.delete('id');

			// Mặc định của Action Mode sẽ là 'new'
			url.searchParams.set('actionMode', 'new');

			return url;
		},

		initDefaultData() {
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
	}
}
</script>

<style scoped>

</style>