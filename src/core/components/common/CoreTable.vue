<template>
	<div class="core-app-style__container">
		<Transition>
			<table
				v-if="!loading"
				class="table core-app-style__table">
				<thead class="thead-dark">
				<tr>
					<th
						v-for="(field, index) in fields"
						:key="index"
						scope="col">
						{{ field.label }}
					</th>
				</tr>
				</thead>
				<tbody>

				<tr v-for="(data, index) in items"
						:key="index">

					<td
						v-for="(slot, i) in slotData"
						:key="i"
					>
						<slot
							:data="data" :name="slot">
							{{ data.slot }}
						</slot>
					</td>
				</tr>
				</tbody>
			</table>

			<core-loading-table
				v-else-if="loading"
				:columns="fields.length"
				:rows="limitCount"
			></core-loading-table>

		</Transition>

		<div class="paginate">
			<div class="custom-table-footer" >
				<div class="items-per-page">
					<select v-model="limitCount" class="core-app-style__dropdown">
						<option value="5" selected>5</option>
						<option value="10">10</option>
						<option value="25">25</option>
						<option value="50">50</option>
						<option value="100">100</option>
					</select>
				</div>
				<div class="custom-pagination display-flex__LRTB">

						<button
							v-if="canGotoFirstPage"
							@click="gotoFirstPage()"
							class="core-app-style__button blue-harmony-color icon-effect-zoom-in">
								<i class="bi bi-box-arrow-in-left"></i>
						</button>
						<button
							v-else
							disabled
							class="core-app-style__button icon-effect-zoom-in">
								<i class="bi bi-box-arrow-in-left"></i>
						</button>

						<button
							v-if="canGotoPreviousPage"
							@click="gotoPreviousPage()"
							class="core-app-style__button blue-harmony-color icon-effect-zoom-in">
								<i class="bi bi-arrow-left-short"></i>
						</button>
						<button
							v-else
							disabled
							class="core-app-style__button icon-effect-zoom-in">
								<i class="bi bi-arrow-left-short"></i>
						</button>

						<button
							v-for="(page, index) in paginationDataParsedToShowComputed"
							:key="index"
							@click="gotoPageNumber(page.pageNumber)"
							:class="{'active': page.isActive}"
							class="core-app-style__button blue-harmony-color-active icon-effect-zoom-in"
						>
							{{ page.pageNumber }}
						</button>

						<button
							v-if="canGotoNextPage"
							@click="gotoNextPage()"
							class="core-app-style__button blue-harmony-color icon-effect-zoom-in"
						>
								<i class="bi bi-arrow-right-short"></i>
						</button>
						<button
							v-else
							disabled
							class="core-app-style__button icon-effect-zoom-in">
								<i class="bi bi-arrow-right-short"></i>
						</button>

						<button
							v-if="canGotoLastPage"
							@click="gotoLastPage()"
							class="core-app-style__button blue-harmony-color icon-effect-zoom-in">
								<i class="bi bi-box-arrow-in-right"></i>
						</button>
						<button
							v-else
							disabled
							class="core-app-style__button icon-effect-zoom-in">
								<i class="bi bi-box-arrow-in-right"></i>
						</button>

				</div>
			</div>
		</div>
	</div>
</template>

<script>

import CoreLoadingTable from "@/core/components/common/CoreLoadingTable.vue";

export default {
  name: 'CoreTable',
  components: {
		CoreLoadingTable
  },
  setup() {

  },
  beforeMount() {

  },
	data() {
		return {
			// currentPage: 0,
			limitCount: 0,
			// totalCount: 0,
			// totalPages: 0,

			// pagination
			paginationDataParsedToShow: [],
		}
	},
	computed: {
		slotData() {
			return Object.keys(this.$slots);
		},

		paginationDataParsedToShowComputed() {
			let result = [];

			this.paginationDataParsedToShow.forEach((element) => {
				if(element.isShow)
					result.push(element)
			})

			return result;
		},

		canGotoPageNumber() {
			return true;
		},
		canGotoFirstPage() {
			if(this.paginationInfo.currentPage > 1) {
				return true;
			}

			return false;
		},
		canGotoPreviousPage() {
			if(this.paginationInfo.currentPage > 1) {
				return true;
			}

			return false;
		},
		canGotoNextPage() {
			if(this.paginationInfo.currentPage < this.paginationInfo.totalPages) {
				return true;
			}

			return false;
		},
		canGotoLastPage() {
			if(this.paginationInfo.currentPage < this.paginationInfo.totalPages) {
				return true;
			}

			return false;
		}
	},
	watch: {
		paginationInfo : {
			handler (value) {
				this.limitCount = value.limitCount;

				this.parsePaginationData();
			},
			deep: true
		},
		limitCount (value) {
			this.changeLimitCount(value);
		}
	},
  props: {
    items: {
      type: Array,
      default () {
        return []
      }
    },
    fields: {
      type: Array,
      default () {
        return []
      }
    },
    loading: {
      type: Boolean,
      default: false
    },
    clientSort: {
      type: Boolean,
      default: false
    },
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
    disablePagination: {
      type: Boolean,
      default () {
        return false
      }
    },
    hidePagination: {
      type: Boolean,
      default () {
        return false
      }
    },
    hideButtonFresh: {
      type: Boolean,
      default () {
        return false
      }
    },
    sort: {
      type: Object,
      default () {
        return {
          orderBy: '',
          ascending: true
        }
      }
    }
  },
  methods: {
		parsePaginationData() {

			this.paginationDataParsedToShow = [];

			if(this.paginationInfo.totalPages > 0) {
				for(let i = 0; i < this.paginationInfo.totalPages; i++) {
					let itemPage = {
						pageNumber: i + 1,
						isActive: (i + 1) === this.paginationInfo.currentPage ? true : false,
						isShow: true
					}

					this.paginationDataParsedToShow.push(itemPage);
				}
			}

			if(this.paginationInfo.totalPages > 5) {
				this.convertPaginationDataParsedToShow();
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
				else if(this.paginationInfo.currentPage === this.paginationInfo.totalPages) {
					for(let i = this.paginationInfo.totalPages - 1; i > (this.paginationInfo.totalPages - 1) - 5; i--) {
						this.paginationDataParsedToShow[i].isShow = true;
					}
				}

				// Case 3
				else if((this.paginationInfo.currentPage - 1) >= 2 && (this.paginationInfo.totalPages - this.paginationInfo.currentPage) >= 2) {
					for(let i = (this.paginationInfo.currentPage - 1) - 2; i < (this.paginationInfo.currentPage - 1) + 3; i++) {
						this.paginationDataParsedToShow[i].isShow = true;
					}
				}

				// Case 4
				else if((this.paginationInfo.currentPage - 1) < 2 && (this.paginationInfo.totalPages - 2) >= 3) {
					for(let i = (this.paginationInfo.currentPage - 1) - 1; i < (this.paginationInfo.currentPage - 1) + 4; i++) {
						this.paginationDataParsedToShow[i].isShow = true;
					}
				}

				// Case 5
				else if((this.paginationInfo.currentPage - 1) >= 3 && (this.totalPages - this.paginationInfo.currentPage) < 2) {
					for(let i = (this.paginationInfo.currentPage - 1) - 3; i < (this.paginationInfo.currentPage - 1) + 2; i++) {
						this.paginationDataParsedToShow[i].isShow = true;
					}
				}
			}
		},

		gotoPageNumber(pageNumber) {
			this.exEventBus.emit('GO_TO_PAGE', pageNumber);
		},
		gotoFirstPage() {
			this.exEventBus.emit('GO_TO_PAGE', 1);
		},
		gotoPreviousPage() {
			this.exEventBus.emit('GO_TO_PAGE', this.paginationInfo.currentPage - 1);
		},
		gotoNextPage() {
			this.exEventBus.emit('GO_TO_PAGE', this.paginationInfo.currentPage + 1);
		},
		gotoLastPage() {
			this.exEventBus.emit('GO_TO_PAGE', this.paginationInfo.totalPages);
		},
		changeLimitCount(limitCount) {
			this.exEventBus.emit('CHANGE_LIMIT_COUNT', limitCount);
		},
  },

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

		//ul {
		//
		//	li {
		//		display: flex;
		//		justify-content: center;
		//		align-items: center;
		//		float: left;
		//		width: 50px;
		//		height: 40px;
		//		background-color: #948C6A;
		//		margin-right: 2px;
		//		color: white;
		//
		//		list-style: none;
		//		cursor: pointer;
		//		user-select: none;
		//		transition: 0.1s;
		//
		//		&.disabled {
		//			background-color: #DDDBDD;
		//
		//			&:hover {
		//				background-color: #DDDBDD;
		//				color: white;
		//				i {
		//					color: white;
		//				}
		//			}
		//
		//			&:active {
		//				transform: scale(0.9);
		//			}
		//		}
		//
		//		:last-child {
		//			margin-right: 0px;
		//		}
		//
		//		i {
		//			font-size: 22px;
		//			color: white;
		//		}
		//
		//		&:hover {
		//			background-color: #555555;
		//			color: #85EDEE;
		//			i {
		//				color: #85EDEE;
		//			}
		//		}
		//
		//		&:active {
		//			transform: scale(0.9);
		//		}
		//
		//		&.selected {
		//			background-color: #85EDEE;
		//			color: #555555;
		//			i {
		//				color: #555555;
		//			}
		//		}
		//	}
		//}
	}
}
</style>