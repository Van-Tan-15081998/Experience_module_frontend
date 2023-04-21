<script>
	export default {
		name: 'CoreBaseForm',
		data () {
			return {
				id: null,
				context: null,
				loadFormDataService: null,

				isLoadingFormData: true,
				formData: null,
				selectionItemsFormData: [],
				isLoadingProcessing: false,
				cloneFormData: null,
				inputErrors: [],
				errors: [],
				isAddForm: false,
				isEditForm: false,
				isDetailForm: false,

				statuses: []
			}
		},
		props: {
			propDataToForm: {
				type: Object,
				default: () => ({})
			},
		},
		mounted() {
			this.isLoadingFormData = true;

			if(this.isAddForm) {
				this.initFormData();
			}
		},
		watch: {
			'id' (value) {
				if(value) {
					this.initFormData();
				}
			}
		},
		computed: {
			getMode() {
				let mode = '';
				if(this.isAddForm) {
					mode = 'new'
				} else if(this.isEditForm) {
					mode = 'edit'
				} else if(this.isDetailForm) {
					mode = 'view'
				}

				return mode;
			},

			isShowStatuses() {
				if(this.statuses.length > 0) {
					return true;
				}
				return false
			},
			getStatusesComputed() {
				return this.statuses;
			}
		},
		methods: {
			initFormData() {

				this.isLoadingFormData = true;

				//-----Get data form-----//
				this.loadFormData();

			},
			async loadFormData() {
				console.log('loadFormData')
				if(this.loadFormDataService && this.context) {
					this.isLoadingFormData = true

					let dataObj = null;

					if(this.isAddForm) {
						dataObj = await this.loadFormDataService.getDetailData(this.context, '?actionMode=' + this.getMode, {});
					} else if((this.isEditForm || this.isDetailForm) && this.id) {
						dataObj = await this.loadFormDataService.getDetailData(this.context, '?bookId=' + this.id + '&actionMode=' + this.getMode, {});
					}

					if(!dataObj) {
						this.isLoadingFormData = false;
						return;
					}

					if(dataObj.data) {

						if(this.isAddForm) {
							this.parseData(dataObj.data.data);

							this.initDefaultFormData();
						} else if((this.isEditForm || this.isDetailForm) && this.id) {
							this.formData = dataObj.data.data;
						}

						if(dataObj.data['selectionItems']) {
							this.selectionItemsFormData = dataObj.data['selectionItems'];
						}

						this.isLoadingFormData = false;
					}

					this.isLoadingFormData = false
				}
			},
			getAttributeFromFormDataByKey(key) {
				if(this.formData && key.toString() !== '' && this.formData[key] !== null) {
					return this.formData[key];
				}
				return null;
			},
			getSelectionItemFormDataByKey(key) {
				if(this.selectionItemsFormData && key.toString() !== '' && this.selectionItemsFormData[key]) {
					return this.selectionItemsFormData[key];
				}
				return [];
			},
			getInputErrorByKey(key) {
				if(this.inputErrors && key.toString() !== '' && this.inputErrors[key]) {
					console.log(this.inputErrors[key][0])
					return this.inputErrors[key][0];
				}
				return '';
			},

			initDefaultFormData() {

			},

			async save() {

				this.resetInputErrors();
				this.isLoadingProcessing = true;

				let dataObj = null;

				if(this.loadFormDataService && this.context) {

					dataObj = await this.loadFormDataService.save(this.context, true, this.formData);

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
					this.parseData(dataObj.data.data);
				}

				// Nhận thông báo
				if(dataObj.alerts) {
					this.statuses = dataObj.alerts;
				}

				console.log(this.statuses)
				this.isLoadingProcessing = false;
				}
			},
			delete() {

			},
			getFormData() {

			},
			close() {
				this.isLoadingProcessing = false;
			},
			back() {

			},

			parseData(data = null) {
				Object.keys(this.formData).forEach((key) => {
					if(data && data[key] !== null) {
						this.formData[key] = data[key];
					}
				})
			},

			reset() {
				if(this.isEditForm) {
						console.log('1')
				} else {
						console.log('2')
				}
			},

			resetSelectionItemsFormData() {
				this.selectionItemsFormData = [];
			},
			resetInputErrors() {
				this.inputErrors = [];
			}
		}
	}
</script>

<style scoped>

</style>