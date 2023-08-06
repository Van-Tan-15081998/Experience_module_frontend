<template>
  <div class="page">
    <div class="page-info">
      <h3>Pattern 2</h3>
    </div>
    <div class="page-content">

      <user-list :users="users">
        <template #name="{ user }">
          <div>
            <b>{{ user.name }}</b>
          </div>
        </template>

        <template #email="{ user }">
          <div>
            <span style="color: orangered">{{ user.email }}</span>
          </div>
        </template>
      </user-list>

      <hr>

      <core-table
          :fields="tableFields"
          :items="users"
          :pagination-data-prop="paginationInfo"
      >
        <template #id="{ data }">
          <div>
            <b>{{ data.id }}</b>
          </div>
        </template>

        <template #name="{ data }">
          <div>
            <b style="color: #F5F400">{{ data.name }}</b>
          </div>
        </template>

        <template #email="{ data }">
          <div>
            <b>{{ data.email }}</b>
          </div>
        </template>
      </core-table>

      <core-table
          :fields="tableBookFields"
          :items="books"
          :pagination-data-prop="paginationInfo"
      >
        <template #bookId="{ data }">
          <div>
            <b>{{ data.bookId }}</b>
          </div>
        </template>

        <template #title="{ data }">
          <div>
            <b style="color: #42b983">{{ data.title }}</b>
          </div>
        </template>
      </core-table>
    </div>
  </div>
</template>

<script>

import UserList from "@/pages/Master/PatternPage/Pattern-02/UserList.vue";

import CoreBaseTable from "@/core/components/base/CoreBaseTable.vue";
import CoreTable from "@/core/components/common/CoreTable.vue";

import bookApi from "@/scripts/Master/FavoriteApp/Book/BookApi";

export default {
  name: 'Pattern-02',
  components: {
    CoreTable,
    UserList
  },
  extends: {
    CoreBaseTable
  },
  inject: ['apiService'],
  setup() {

  },
  created() {
    this.getList();
  },
  data() {
    return {
      books: [],
      users: [
        {
          id: 1,
          name: 'Tan',
          email: 'tan@gmail.com'
        },
        {
          id: 2,
          name: 'Tien',
          email: 'tien@gmail.com'
        },
        {
          id: 3,
          name: 'Hoai',
          email: 'hoai@gmail.com'
        }
      ],
      paginationInfo: {
        currentPage: 0,
        limitCount: 0,
        totalCount: 0,
        totalPages: 0
      }
    }
  },
  computed: {
    tableFields() {
      return [
        {
          key: 'id',
          label: 'id_label',
          class: 'col-table',
        },
        {
          key: 'name',
          label: 'name_label',
          class: 'col-table',
        },
        {
          key: 'email',
          label: 'email_label',
          class: 'col-table',
        },
      ]
    },

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
        }
      ]
    }
  },
  methods: {
    async getList() {

      this.tableLoading = true;

      let dataObj = await bookApi.getList(this, {});

      if(!dataObj) {
        this.tableLoading = false;
        return;
      }

      if(dataObj.data) {
        this.books = dataObj.data.page.list;


        this.paginationInfo = dataObj.data.page.paginationInfo;


        this.tableLoading = false;
      }
    }
  }
}
</script>

<style scoped lang="scss">
.page {
  background-color: white;
}
</style>