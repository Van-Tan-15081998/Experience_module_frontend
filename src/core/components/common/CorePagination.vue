<template>
  <div class="paginate">
    <div class="custom-table-footer" >
      <div class="items-per-page">
        <select v-model="limitCountComputed" class="form-select form-select-sm" aria-label=".form-select-lg">
          <option value="5" selected>5</option>
          <option value="10">10</option>
          <option value="25">25</option>
          <option value="50">50</option>
          <option value="100">100</option>
        </select>
      </div>
      <div class="custom-pagination">
        <ul class="page-list">
          <li
						v-if="canGotoFirstPage"
						class="page-item">
            <a @click="gotoFirstPage()">
              <i class="bi bi-box-arrow-in-left"></i>
            </a>
          </li>
					<li
						v-else
						class="page-item disabled">
						<a>
							<i class="bi bi-box-arrow-in-left"></i>
						</a>
					</li>

          <li
						v-if="canGotoPreviousPage"
						class="page-item">
            <a @click="gotoPreviousPage()">
              <i class="bi bi-arrow-left-short"></i>
            </a>
          </li>
					<li
						v-else
						class="page-item disabled">
						<a>
							<i class="bi bi-arrow-left-short"></i>
						</a>
					</li>

          <li
              v-for="(page, index) in paginationDataParsedToShowComputed"
              :key="index"
              :class="{'selected': page.isActive}">
            <a

            >{{ page.pageNumber }}</a>
          </li>

          <li
						v-if="canGotoNextPage"
						class="page-item">
            <a @click="gotoNextPage()">
              <i class="bi bi-arrow-right-short"></i>
            </a>
          </li>
					<li
						v-else
						class="page-item disabled">
						<a>
							<i class="bi bi-arrow-right-short"></i>
						</a>
					</li>

          <li
						v-if="canGotoLastPage"
						class="page-item">
            <a @click="gotoLastPage()">
              <i class="bi bi-box-arrow-in-right"></i>
            </a>
          </li>
					<li
						v-else
						class="page-item disabled">
						<a>
							<i class="bi bi-box-arrow-in-right"></i>
						</a>
					</li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CorePagination',
  props: {
		paginationInfo: {
			type: Object,
			default () {
				return {
					currentPage: 0,
					limitCount: 0,
					totalCount: 0,
					totalPages: 0
				}
			}
		},

    disableReloadPagination: {
      type: Boolean,
      default: false
    },
    hideButtonFresh: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      paginationDataParsed: [],
      paginationDataParsedToShow: [],

      isLoadData: false,
      loadingButton: true,
      valuePerPage: 15,
      options: [
        {
          value: 5,
          text: '5'
        },
        {
          value: 10,
          text: '10'
        },
        {
          value: 25,
          text: '25'
        },
        {
          value: 50,
          text: '50'
        },
        {
          value: 100,
          text: '100'
        },
      ],
    }
  },

  computed: {
		limitCountComputed() {
			return this.paginationInfo.limitCount;
		},

    paginationDataParsedToShowComputed() {
      let result = [];
      this.paginationDataParsedToShow.forEach(element => {
        if(element.isShow) result.push(element);
      })
      return result;
    },

		canGotoPageNumber() {
			return false;
		},
		canGotoFirstPage() {
			if(this.paginationInfo.currentPage > 1) {
				return true;
			}
			return false;
		},
		canGotoPreviousPage() {
			return false;
		},
		canGotoNextPage() {
			return false;
		},
		canGotoLastPage() {
			return false;
		}
  },

  watch: {
		paginationInfo : {
			handler () {
				this.parsePaginationData();
			},
			deep: true
		}
  },

  methods: {
    parsePaginationData() {
			this.paginationDataParsed = [];
      if(this.paginationInfo.totalPages > 0) {
        for(let i = 1; i <= this.paginationInfo.totalPages; i++) {
          let itemPage = {
            pageNumber: i,
            isActive: false,
            isShow: true
          }
          this.paginationDataParsed.push(itemPage);
        }
      }

      this.setActivePage();

      this.paginationDataParsedToShow = this.paginationDataParsed;

      if(this.paginationInfo.totalPages > 5) {
        this.convertPaginationDataParsedToShow();
      }
    },

    setActivePage() {
			// Reset isActive
			this.paginationDataParsed.forEach(element => {
				element.isActive = false;
			})

      if(this.paginationInfo.currentPage) {
        for(let i = 0; i < this.paginationInfo.totalPages; i++) {
          if(this.paginationDataParsed[i].pageNumber === this.paginationInfo.currentPage) {
            this.paginationDataParsed[i].isActive = true;
          }
        }
      }
    },

    convertPaginationDataParsedToShow() {

      // Reset isShow
      this.paginationDataParsedToShow.forEach(element => {
        element.isShow = false;
      })

      if(this.paginationDataParsedToShow.length > 5 && this.paginationInfo.totalPages > 5) {

        // Case 1
        if(this.paginationInfo.currentPage === 1) {
          for(let i = 0; i < 5; i++) {
            this.paginationDataParsedToShow[i].isShow = true;
          }
        }

        // Case 2
        if(this.paginationInfo.currentPage === this.paginationInfo.totalPages && this.currentPage === this.paginationDataParsedToShow[this.paginationInfo.totalPages-1].numberPage) {
          for(let i = this.paginationInfo.totalPages - 1; i > (this.paginationInfo.totalPages - 1) - 5; i--) {
            this.paginationDataParsedToShow[i].isShow = true;
          }
        }

        // Case 3
        if((this.paginationInfo.currentPage - 1) >= 2 && (this.paginationInfo.totalPages - this.paginationInfo.currentPage) >= 2) {
          for(let i = (this.paginationInfo.currentPage - 1) - 2; i < (this.paginationInfo.currentPage - 1) + 3; i++) {
            this.paginationDataParsedToShow[i].isShow = true;
          }
        }

        // Case 4
        if((this.paginationInfo.currentPage - 1) < 2 && (this.paginationInfo.totalPages - 2) >= 3) {
          for(let i = (this.paginationInfo.currentPage - 1) - 1; i < (this.paginationInfo.currentPage - 1) + 4; i++) {
            this.paginationDataParsedToShow[i].isShow = true;
          }
        }

        // Case 5
        if((this.paginationInfo.currentPage - 1) >= 3 && (this.totalPages - this.paginationInfo.currentPage) < 2) {
          for(let i = (this.paginationInfo.currentPage - 1) - 3; i < (this.paginationInfo.currentPage - 1) + 2; i++) {
            this.paginationDataParsedToShow[i].isShow = true;
          }
        }
      }
    },

    gotoPageNumber() {

    },
    gotoFirstPage() {

    },
    gotoPreviousPage() {

    },
    gotoNextPage() {

    },
    gotoLastPage() {

    },
  }
}
</script>

<style scoped lang="scss">
.paginate {
  .custom-table-footer {
    display: inline-flex;
    flex-direction: row;
    align-items: center;
  }
  .items-per-page {
    width: 100px;
  }
  ul.pagination {
    margin-bottom: 0px;
  }
  .custom-pagination {
    margin: 5px 10px;

    ul {

      li {
        display: flex;
        justify-content: center;
        align-items: center;
        float: left;
        width: 50px;
        height: 40px;
        background-color: #948C6A;
        margin-right: 2px;
        color: white;

        list-style: none;
        cursor: pointer;
        user-select: none;
        transition: 0.1s;

				&.disabled {
					background-color: #DDDBDD;

					&:hover {
						background-color: #DDDBDD;
						color: white;
						i {
							color: white;
						}
					}

					&:active {
						transform: scale(0.9);
					}
				}

        :last-child {
          margin-right: 0px;
        }

        i {
          font-size: 22px;
          color: white;
        }

        &:hover {
          background-color: #555555;
          color: #85EDEE;
          i {
            color: #85EDEE;
          }
        }

        &:active {
          transform: scale(0.9);
        }

        &.selected {
          background-color: #85EDEE;
          color: #555555;
          i {
            color: #555555;
          }
        }
      }
    }

  }
}
</style>