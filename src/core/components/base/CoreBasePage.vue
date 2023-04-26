
<script>
export default {
	name: 'CoreBasePage',
	data() {
		return {
			id: null,
			idString: null,
			context: null,
			dataService: null,

			isPageLoadingData: true,
			pageData: null,
			selectionItemsData: [],

			actionMode: null,

			inputErrors: [],
			statuses: [],
		}
	},
	mounted() {
		this.initPage();
	},
	methods: {
		initPage() {
			this.isPageLoadingData = true;

			this.parseRouteParams();

			this.loadPageData();
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

					if (this.actionMode === 'new') {
						this.initDefaultData();
					}

				}
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

			if(routeQueryParams) {
				if(routeQueryParams.actionMode) {
					this.actionMode = routeQueryParams.actionMode;
					// => actionMode = new | edit | view

					if(this.actionMode === 'edit' || this.actionMode === 'view') {
						if(routeQueryParams.id) {
							this.id = routeQueryParams.id;
						}
					}
				}
			}
		},

		parsePageData(data = null) {
			if(this.pageData) {
				Object.keys(this.pageData).forEach((key) => {
					if(data && data[key] !== null && data[key] !== undefined) {
						this.pageData[key] = data[key];
					}
				})
				console.log(this.pageData)
			}
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
	}
}
</script>

<style scoped>

</style>