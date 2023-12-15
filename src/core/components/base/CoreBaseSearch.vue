
<script>
import DefaultLayout from "@/core/components/layouts/DefaultLayout";

import CoreTable from "@/core/components/common/CoreTable.vue";
import CoreLoadingTable from "@/core/components/common/CoreLoadingTable.vue";

import CoreModal from "@/core/components/modal/CoreModal.vue";
import CoreSearchSelection from "@/core/components/search-selection/CoreSearchSelection";
import CoreForm from "@/core/components/form/CoreForm";
// import {cloneDeep} from "lodash";

export default {
  name: "CoreBaseSearch",
  components: {
    DefaultLayout,
    CoreTable,
    CoreLoadingTable,
    CoreModal,
    CoreSearchSelection,
    CoreForm
  },
  data () {
    return {
      context: null,
      dataService: null,
      isPageLoadingData: true,
      isDisabledInputSearch: false,

      actionMode: 'search',

      rootPageData: null,

      pageData: null,
      selectionItemsPageData: null,

      searchData: {
        searchString: 'Search'
      },

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
      isOpenDetailForm: false,

      params: {
        currentPage: 0,
        limitCount: 0,
      },
      isInitParams: false,
      isInitData: false,

      reloadingDataTable: false,
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
        if(this.dataService && this.context && this.isInitParams && !this.isInitData) {

          window.history.replaceState(null, null, this.displayURL());

          console.log(this.searchData.searchString);
          this.onSearch();
        }
      },
      deep: true
    }

  },
  mounted() {
    this.initParams().then((resolve) => {
      if (resolve) {
        // this.loadDataTable();
        this.isInitParams = true;
      }
    })

    this.exEventBus.on('CLOSE_FORM_MODAL', ()=> {
      this.closeFormModal();
    });

    this.initSearch();
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

    async initSearch() {
      this.isInitData = true;

      this.resetPageData();

      this.isPageLoadingData = true;
      this.isDisabledInputSearch = true;

      let dataObj = null;

      if(this.context && this.dataService) {

        if(this.displayURL().search !== '') {
          dataObj = await this.dataService.getSearch(this.context,
              this.displayURL().search +
              '&searchString=' + this.searchData.searchString,
              {});
        } else {
          dataObj = await this.dataService.getSearch(this.context,
              '?searchString=' + this.searchData.searchString,
              {});
        }

        if(!dataObj) {
          this.isLoadingProcessing = false;

          return;
        }

        if(dataObj.inputErrors) {
          this.inputErrors = dataObj.inputErrors;
        }

        if(dataObj.data) {
          this.paginationInfo = dataObj.data.page.paginationInfo;

          this.rootPageData = dataObj.data.page.list;

          this.parsePageData(dataObj.data.data);

          this.parseSelectionItemsPageData(dataObj.data.selectionItems);
        }

        if(dataObj.alerts) {
          this.statuses = dataObj.alerts;
        }

        this.isPageLoadingData = false;
        this.isDisabledInputSearch = false;

        console.log( this.isPageLoadingData)
      }
    },

    async onSearch() {

      this.isInitData = false;

      this.resetPageData();

      if(this.searchData.searchString === '') {
        return;
      }

      this.isPageLoadingData = true;
      this.isDisabledInputSearch = true;

      let dataObj = null;

      if(this.context && this.dataService) {

        if(this.displayURL().search !== '') {
          dataObj = await this.dataService.getSearch(this.context,
              this.displayURL().search +
              '&searchString=' + this.searchData.searchString,
              {});
        } else {
          dataObj = await this.dataService.getSearch(this.context,
              '?searchString=' + this.searchData.searchString,
              {});
        }
        console.log(dataObj)

        if(!dataObj) {
          this.isLoadingProcessing = false;

          return;
        }

        if(dataObj.inputErrors) {
          this.inputErrors = dataObj.inputErrors;
        }

        if(dataObj.data) {
          this.paginationInfo = dataObj.data.page.paginationInfo;

          this.rootPageData = dataObj.data.page.list;

          this.parsePageData(dataObj.data.data);
        }

        if(dataObj.alerts) {
          this.statuses = dataObj.alerts;
        }

        this.isPageLoadingData = false;
        this.isDisabledInputSearch = false;

        console.log( this.isPageLoadingData)
      }
    },

    async loadDataTable () {

      if (this.dataService && this.context) {
        this.isLoadingTable = true

        let dataObj = await this.dataService.getList(this.context, this.displayURL().search, {});

        if(!dataObj) {
          this.isLoadingTable = false;
          return;
        }

        if(dataObj.data) {
          this.items = dataObj.data.page.list;

          this.paginationInfo = dataObj.data.page.paginationInfo;

          this.isLoadingTable = false;
        }

        this.isLoadingTable = false

        // When refresh
        this.reloadingDataTable = false;
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

    parsePageData(data = null) {
      if(this.pageData) {
        Object.keys(this.pageData).forEach((key) => {
          if(data && data[key] !== null && data[key] !== undefined) {
            this.pageData[key] = data[key];
          }
        })
      }

      // Parse id
      // if(data && data[this.idString] !== null && data[this.idString] !== undefined) {
      //   this.id = data[this.idString];
      // }

      // Clone page data
      // if(this.pageData) {
      //   this.pageDataCopy = cloneDeep(this.pageData);
      // }
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

    openAddForm(data = null) {
      console.log(data);
      this.isOpenAddForm = true;
    },
    openEditForm(itemId = null) {
      this.itemId = itemId;
      this.isOpenEditForm = true;
    },
    openDetailForm(itemId = null) {
      this.itemId = itemId;
      this.isOpenDetailForm = true;
    },
    closeFormModal() {
      this.isOpenAddForm = false;
      this.isOpenEditForm = false;
      this.isOpenDetailForm = false;

      this.itemId = null;
    },
    reloadDataTable() {
      this.reloadingDataTable = true;
      this.loadDataTable();

    }
  },
  created() {
    this.exEventBus.on('GO_TO_PAGE', (data) => {
      console.log('GO_TO_PAGE');
      if(!this.isPageLoadingData) {
        this.paginationInfo.currentPage = data;
      }
    });
    this.exEventBus.on('CHANGE_LIMIT_COUNT', (data) => {
      if(!this.isPageLoadingData) {
        this.paginationInfo.limitCount = data;
      }
    })
  }
}
</script>

<style scoped>

</style>