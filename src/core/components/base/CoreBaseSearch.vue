<script>
import {cloneDeep} from "lodash";

export default {
  name: "CoreBaseSearch",
  data() {
    return {
      context: null,
      dataService: null,
      isPageLoadingData: true,
      isDisabledInputSearch: false,

      actionMode: 'search',

      pageData: null,

      searchData: {
        searchString: ''
      }
    }
  },
  methods: {
    initPage() {

    },

    async loadPageData() {

    },

    async onSearch() {

      this.resetPageData();

      if(this.searchData.searchString === '') {
        return;
      }

      this.isPageLoadingData = true;
      this.isDisabledInputSearch = true;

      let dataObj = null;

      if(this.context && this.dataService) {

        dataObj = await this.dataService.getSearch(this.context,
            '?actionMode=' + this.actionMode
            + '&searchString=' + this.searchData.searchString,
            {});

        if(!dataObj) {
          this.isLoadingProcessing = false;

          return;
        }

        if(dataObj.inputErrors) {
          this.inputErrors = dataObj.inputErrors;
        }

        if(dataObj.data) {
          this.parsePageData(dataObj.data.data);
        }

        if(dataObj.alerts) {
          this.statuses = dataObj.alerts;
        }

        this.isPageLoadingData = false;
        this.isDisabledInputSearch = false;
      }
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

    resetPageData() {

    },
  }
}
</script>

<style scoped>

</style>