<script>
	import DefaultLayout from "@/core/components/layouts/DefaultLayout";

	import CoreTable from "@/core/components/common/CoreTable.vue";
	import CoreLoadingTable from "@/core/components/common/CoreLoadingTable.vue";

	import CoreModal from "@/core/components/modal/CoreModal.vue";

	export default {
		name: "CoreBaseTable",
		components: {
			DefaultLayout,
			CoreTable,
			CoreLoadingTable,
			CoreModal
		},
		data () {
			return {
				context: null,
				loadTableDataService: null,

				loadingTable: false,
				loadingSearch: false,

				paginationInfo: {
					currentPage: 0,
					limitCount: 0,
					totalCount: 0,
					totalPages: 0
				},

				formDetail: null,

				itemId: null,

				filter: {},
				items: [],
				fields: [],

				isOpenAddForm: false,
				isOpenEditForm: false,
				isOpenFormDetail: false,

				params: {
					currentPage: 0,
					limitCount: 0,
				},
				isInitParams: false
			}
		},
		computed: {

		},
		watch: {
			paginationInfo: {
				handler (newVal) {
					this.params.currentPage = newVal.currentPage
					this.params.limitCount = newVal.limitCount
				},
				deep: true
			},
			params: {
				handler () {
					if(this.loadTableDataService && this.context && this.isInitParams) {

						window.history.replaceState(null, null, this.displayURL());
						this.loadDataTable()
					}
				},
				deep: true
			}

		},
		mounted() {
			this.initParams().then((resolve) => {
				if (resolve) {
					this.loadDataTable();
					this.isInitParams = true;
				}
			})
		},
		methods: {
			initParams () {
				let url = new URL(window.location.href)

				// TODO: init param page
				if (url.search) {
					if (url.searchParams.get('limitCount')) {
						this.paginationInfo.limitCount = parseInt(url.searchParams.get('limitCount'))
					}

					if (url.searchParams.get('currentPage')) {
						this.paginationInfo.currentPage = parseInt(url.searchParams.get('currentPage'))
					}
				}

				// TODO: init param filter


				return Promise.resolve(true)
			},

			async loadDataTable () {

				if (this.loadTableDataService && this.context) {
					this.loadingTable = true

					let dataObj = await this.loadTableDataService.getList(this.context, this.displayURL().search, {});

					if(!dataObj) {
						this.loadingTable = false;
						return;
					}

					if(dataObj.data) {
						this.items = dataObj.data.page.list;

						this.paginationInfo = dataObj.data.page.paginationInfo;

						this.loadingTable = false;
					}

					this.loadingTable = false
				}
			},

			displayURL () {
				let url = new URL(window.location.href)
				for (const key in this.params) {
					if (this.params[key] !== '' && this.params[key] !== false && this.params[key] !== 0) {
						url.searchParams.set(key, this.params[key])
					} else {
						url.searchParams.delete(key)
					}
				}
				return url
			},

			openFormAdd(data = null) {
				this.isOpenAddForm = true;
				console.log(data);
			},
			openFormEdit(data = null) {
				this.isOpenEditForm = true;
				console.log(data);
			},
			openDetailForm(itemId = null) {
				this.itemId = itemId;
				this.isOpenFormDetail = true;
			},
			closeForm() {
				this.isOpenAddForm = false;
				this.isOpenEditForm = false;
				this.isOpenFormDetail = false;

				this.itemId = null;
			}
		},
		created() {
			this.exEventBus.on('GO_TO_PAGE', (data) => {
				if(!this.loadingTable) {
					this.paginationInfo.currentPage = data;
				}
			});
			this.exEventBus.on('CHANGE_LIMIT_COUNT', (data) => {
				if(!this.loadingTable) {
					this.paginationInfo.limitCount = data;
				}
			})
		}
	}
</script>

<style scoped>

</style>