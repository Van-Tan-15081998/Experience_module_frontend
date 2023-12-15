<template>
	<div class="core-app-style__container">
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
              class="core-app-style__button active blue-harmony-color-active icon-effect-zoom-in"
          >
            {{ currentPageComputed }} / {{ totalPagesComputed }}
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

    <slot
        v-if="notUseTableFormat"
        name="tableContentWrapper"></slot>

    <div v-else>
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
            :rows="3"
        ></core-loading-table>

      </Transition>
    </div>


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
							class="core-app-style__button active blue-harmony-color-active icon-effect-zoom-in"
						>
							{{ currentPageComputed }} / {{ totalPagesComputed }}
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
			limitCount: 10,
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

		currentPageComputed() {
			return this.paginationInfo.currentPage;
		},

		totalCountComputed() {
			return this.paginationInfo.totalCount;
		},

		totalPagesComputed() {
			return this.paginationInfo.totalPages;
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
    notUseTableFormat: {
      type: Boolean,
      default: false
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
      height: 35px;
      display: flex;
      flex-direction: row;
      flex-wrap: nowrap;
      justify-content: flex-start;
      align-items: center;
      align-content: flex-start;

      select {
        width: 100%;
        height: 100%;
        //padding: 0 15px 0 20px;
        text-align: center;
        margin-right: 5px;
        font-size: 16px;
        color: #6DC5CB;
        background-color: #1b1f23;
        border: 1px solid #626262;
        border-radius: 6px;
        outline: none;
        box-shadow: -4px -2px 4px 0px #262830, 4px 2px 6px 0px #111316;
        transition: 0.1s;

        &:focus {
          border: 1px solid #F1DD00;
        }
      }
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