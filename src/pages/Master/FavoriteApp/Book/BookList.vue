<template>
  <div class="page">
    <div id="navbar" class="page-info">
      <div class="page-title">
        Page title
      </div>

      <div class="breadcrumb">
        <ul>
          <li>Home</li>
          <li>Private</li>
          <li>Pictures</li>
          <li>Vacation</li>
        </ul>
      </div>
    </div>
    <div id="page-content" class="page-content">

      <button
				@click="openAddForm"
				class="core-app-style__button only-margin-vertical green-harmony-color icon-effect-zoom-in">
        Add
      </button>

			<core-component-refresh
				@click="reloadDataTable"
				:is-refreshing="reloadingDataTable"/>

      <core-table
          :fields="tableBookFields"
					:items="items"
          :pagination-info="paginationInfo"
					:loading="loadingTable"
      >
        <template #bookId="{ data }">
          <div>
            {{ data.bookId }}
          </div>
        </template>

        <template #title="{ data }">
          <div>
            {{ data.title }}
          </div>
        </template>

				<template #action="{ data }">
					<div class="actions">
						<button
							@click="openDetailForm(data.bookId)"
							class="core-app-style__button green-harmony-color icon-effect-zoom-in">
							<i class="bi bi-search"></i>
						</button>
						<button
							@click="openEditForm(data.bookId)"
							class="core-app-style__button blue-harmony-color icon-effect-zoom-in">
							<i class="bi bi-pencil-fill"></i>
						</button>
						<button class="core-app-style__button red-harmony-color icon-effect-zoom-in">
							<i class="bi bi-trash3-fill"></i>
						</button>
						<button class="core-app-style__button navy-harmony-color icon-effect-zoom-in">
							<i class="bi bi-clipboard-check-fill"></i>
						</button>
					</div>
				</template>
      </core-table>
    </div>

		<teleport to="#app">

			<core-modal
				:width="1200"
				:show="isOpenDetailForm"
				>
				<template #header>
					Chi tiết Sách
				</template>

				<template #body>
					<book-detail
						:item-id="itemId"
					/>
				</template>
			</core-modal>

		</teleport>

		<teleport to="#app">

			<core-modal :show="isOpenAddForm">
				<template #header>
					Thêm mới sách
				</template>

				<template #body>
					<book-add-form/>
				</template>
			</core-modal>

			<core-modal :show="isOpenEditForm">
				<template #header>
					Cập nhật sách
				</template>

				<template #body>
					<book-edit-form :item-id="itemId"/>
				</template>
			</core-modal>

		</teleport>

  </div>
</template>

<script>

import CoreBaseTable from "@/core/components/base/CoreBaseTable.vue";
import CoreTable from "@/core/components/common/CoreTable.vue";
import CoreComponentRefresh from "@/core/components/loader/CoreComponentRefresh.vue";

import bookApi from "@/scripts/Master/FavoriteApp/Book/BookApi";
import UserList from "@/pages/Master/PatternPage/Pattern-02/UserList.vue";

import BookDetail from "@/pages/Master/FavoriteApp/Book/BookDetail.vue";
import BookAddForm from "@/pages/Master/FavoriteApp/Book/BookAddForm.vue";
import BookEditForm from "@/pages/Master/FavoriteApp/Book/BookEditForm.vue";

export default {
  name: 'BookList',
  setup() {

  },
  components: {
		BookAddForm,
    CoreTable,
    UserList,
		BookDetail,
		CoreComponentRefresh,
		BookEditForm,
  },
  inject: ['apiService'],
  extends: CoreBaseTable,
  created() {
    // this.getList();
  },
  computed: {
    tableBookFields() {
      return [
        {
          key: 'bookId',
          label: 'bookId_label',
          class: 'col-table',
        },
        {
          key: 'title',
          label: 'title_label',
          class: 'col-table',
        },
        {
          key: 'action',
          label: 'action_label',
          class: 'col-table',
        }
      ]
    }
  },
  data() {
    return {
      books: [],
			context: this,
			loadTableDataService: bookApi,

			formDetail: BookDetail,

			paginationInfo: {
				currentPage: 0,
				limitCount: 0,
				totalCount: 0,
				totalPages: 0
			},
    }
  },
  mounted() {

  },
  methods: {

  },
}
</script>

<style scoped lang="scss">
.page {
  height: 100%;
  width: 100%;
  overflow: scroll;
  background-color: inherit;

  .page-info {
    width: 100%;
    height: 70px;
    background-color: #2D2D2D;
    border-bottom: 1px solid #F5F400;
    border-right: 1px solid #F5F400;
    padding: 5px 10px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    transition: 0.3s;

    &.sticky {
      position: fixed;
      top: 0;
      width: fit-content;
      height: 40px;
      border-right: 1px solid #F5F400;
      border-bottom-right-radius: 8px;

      flex-direction: row;
      flex-wrap: wrap;
      justify-content: flex-start;

      .page-title {
        margin-top: 0px;
      }
      .breadcrumb {
        margin-top: 0px;
        margin-left: 6px;
      }
    }

    .page-title {
      font-size: 22px;
      font-weight: bold;
      height: 26px;
      line-height: 26px;
      margin-top: 8px;
      color: #F5F400;
    }

    .breadcrumb {
      height: 28px;
      width: fit-content;
      background-color: #242424;
      margin-top: 6px;
      border: 1px solid #948C6A;
      border-radius: 3px;

      ul {
        transition: 0.3s;
        li {
          float: left;
          list-style: none;
          font-size: 16px;
          line-height: 22px;
          margin: 2px 4px 2px 2px;
          transition: 0.3s;
          user-select: none;
          color: darkgray;

          &:hover {
            cursor: pointer;
            color: #85EDEE;
          }

          &::before {
            content: '🔹';
            height: 100px;
            width: 100px;
          }

          &:last-child {
            color: #85EDEE;
            font-weight: bold;

            &::before {
              content: '⚓';
              height: 100px;
              width: 100px;
            }
          }
        }
      }
    }
  }

  .page-content {
    height: 100%;
    width: 100%;
    padding: 10px;

    .button-add {
      min-width: 80px;
      width: fit-content;
      padding: 2px 10px;
      background-color: #85EDEE;
      transition: 0.1s;
      display: flex;
      flex-direction: row;
      justify-content: center;
      align-items: center;
      color: #555555;
      border: 1px solid #948C6A;
      user-select: none;

      &:hover {
        background-color: white;
        border-color: #85EDEE;
        cursor: pointer;
      }

      &:active {
        transform: scale(0.95);
        border-color: #85EDEE;
      }
    }
  }

  .actions {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: flex-start;
    align-items: center;
  }
}

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