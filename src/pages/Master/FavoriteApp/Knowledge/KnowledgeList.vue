<template>
  <div class="knowledge_page">
    <div class="knowledge_map">
      <h3>KnowledgeList</h3>
      <core-dynamic :string="content"/>
    </div>
    <div class="knowledge_detail_content">
      <div v-if="detailContentMode.isView">
        <p class="title">{{detailContent['title']}}</p>
        <div class="image">
          <img :src="detailContent['picture']" alt="">
        </div>
        <div class="content">
          {{detailContent['content']}}
        </div>
      </div>

      <div v-if="detailContentMode.isAddNew">
        <div class="form_add_new">
          <div class="mb-3">
            <label class="form-label">Thẻ cha: </label>
            <b>{{this.dataAdd.parentKnowledgeTitle}}</b>
          </div>
          <hr>
          <div class="mb-3">
            <label class="form-label">Tiêu đề</label>
            <input
                v-model="dataAdd.childKnowledgeTitle"
                type="text" class="form-control" placeholder="Nhập tiêu đề">
            <div v-if="getError('title')" class="form-text error_text">{{getError('title')}}</div>
          </div>
          <div class="mb-3">
            <label class="form-label">Nội dung chi tiết</label>
            <textarea
                v-model="dataAdd.childKnowledgeContent"
                class="form-control" rows="10"></textarea>
          </div>
          <button @click="add" type="button" class="btn btn-primary">Lưu</button>
        </div>
      </div>
    </div>
    <KnowledgeEventApi/>
  </div>
</template>

<script>
import KnowledgeEventApi from "@/scripts/Master/FavoriteApp/Knowledge/KnowledgeEventApi.vue";

import CoreDynamic from "@/core/components/base/CoreDynamic";
import KnowledgeUnit from "@/pages/Master/FavoriteApp/Knowledge/KnowledgeUnit.vue";
export default {
  name: 'KnowledgeList',
  components: {
    KnowledgeEventApi,
    CoreDynamic,
    KnowledgeUnit
  },
  mounted() {
    this.exEventBus.emit('GET_LIST_KNOWLEDGE', {subjectCode: 0});

    this.exEventBus.on('GET_LIST_KNOWLEDGE_SUCCESS', (data) => {
      this.list = data;
      this.setAttachedAttribute(this.list);
      this.setContent();
    });

    // GET_CHILDREN_BY_PARENT_CODE
    this.exEventBus.on('GET_CHILDREN_BY_PARENT_KNOWLEDGE_CODE_SUCCESS', (data) => {
      if (this.checkExist(data)) {
        this.list = this.list.concat(data);
        this.setAttachedAttribute(this.list);
        this.setContent();
      }
    });

    // SET_KNOWLEDGE_DETAIL_CONTENT
    this.exEventBus.on('GET_KNOWLEDGE_DETAIL_CONTENT_SUCCESS', (data) => {
      this.changeDetailContentMode('VIEW');
      this.detailContent = data;
    });

    // GET_ADD_NEW_CHILDREN_KNOWLEDGE
    this.exEventBus.on('GET_ADD_NEW_CHILDREN_KNOWLEDGE', (data) => {
      this.changeDetailContentMode('ADD_NEW');
      this.dataAdd.parentKnowledgeCode = data['parentKnowledgeCode'];
      this.dataAdd.parentKnowledgeTitle = data['parentKnowledgeTitle'];
      this.dataAdd.parentKnowledgeTreeLevel = data['parentKnowledgeTreeLevel'];
    });

    // ADD_KNOWLEDGE_SUCCESS
    this.exEventBus.on('ADD_KNOWLEDGE_SUCCESS', (data) => {
      if (this.checkExist(data)) {
        this.list = this.list.concat(data);
        this.setAttachedAttribute(this.list);
        this.setContent();
      }
    });

    // ADD_KNOWLEDGE_ERROR
    this.exEventBus.on('ADD_KNOWLEDGE_ERROR', (data) => {
      this.parseDataAddErrorForm(data);
    });

  },
  data() {
    return {
      list: [],
      content: '',
      detailContent: null,
      detailContentMode: {
        isAddNew: false,
        isEdit: false,
        isView: false
      },
      dataAdd: {
        parentKnowledgeCode: null,
        parentKnowledgeTitle: null,
        parentKnowledgeTreeLevel: null,
        childKnowledgeTitle: null,
        childKnowledgeContent: null,
      },
      dataAddErrorForm: []
    }
  },
  methods: {

    parseDataAddErrorForm(error) {
      this.dataAddErrorForm = error;
    },

    getError(keyError) {
      return this.dataAddErrorForm[keyError] ? this.dataAddErrorForm[keyError] : null
    },

    add() {
      this.exEventBus.emit('ADD_KNOWLEDGE', {
        parent_knowledge_code: this.dataAdd.parentKnowledgeCode,
        same_level_sequence: 0,
        tree_level: this.dataAdd.parentKnowledgeTreeLevel + 1,
        title: this.dataAdd.childKnowledgeTitle,
        content_knowledge: this.dataAdd.childKnowledgeContent
      });
    },

    changeDetailContentMode(modeString) {
      this.detailContentMode.isAddNew = false;
      this.detailContentMode.isEdit = false;
      this.detailContentMode.isView = false;

      switch (modeString) {
        case 'ADD_NEW': this.detailContentMode.isAddNew = true;
          break;
        case 'EDIT': this.detailContentMode.isEdit = true;
          break;
        case 'VIEW': this.detailContentMode.isView = true;
          break;
      }
    },

    setAttachedAttribute(dataList) {
      dataList.forEach((element) => {
        element['attached'] = false;
      })
    },

    setContent() {
      this.content = '';
      for(let i = 0; i < this.list.length; i++) {
        if(this.list[i]['parentKnowledgeCode'] === 0 && this.list[i]['attached'] === false) {
          this.content += `<ul class="tree">`;
          this.content += `<li class="li-margin-left-${this.list[i]['treeLevel']}">`
              + `<knowledge-unit :id="${this.list[i]['knowledgeId']}"
                    title="${this.list[i]['title']}"
                    :children-count="${this.list[i]['childrenCount']}"
                    :tree-level="${this.list[i]['treeLevel']}"/>`;
          this.list[i]['attached'] = true;

          this.content += `<ul>`;
          this.setChildrenContent(this.list[i]['knowledgeId']);
          this.content += `</ul>`;

          this.content +=  `</li>`;
          this.content += `</ul>`;
        }
      }
    },

    setChildrenContent(parentKnowledgeCode) {
      for(let i = 0; i < this.list.length; i++) {
        if(this.list[i]['parentKnowledgeCode'] === parentKnowledgeCode && this.list[i]['attached'] === false) {
          this.content += `<li class="li-margin-left-${this.list[i]['treeLevel']}">`
              + `<knowledge-unit :id="${this.list[i]['knowledgeId']}"
                    title="${this.list[i]['title']}"
                    :children-count="${this.list[i]['childrenCount']}"
                    :tree-level="${this.list[i]['treeLevel']}"/>`;
          this.list[i]['attached'] = true;
          this.setChildrenContent(this.list[i]['knowledgeId']);
          this.content +=  `</li>`;
        }
      }
    },

    checkExist(data = []) {
      let result = true;

      for(let i = 0; i < data.length; i++) {
        for(let j = 0; j < this.list.length; j++) {
          if (data[i]['knowledgeId'] === this.list[j]['knowledgeId']) {
            result = false;
            break;
          }
        }
      }

      return result;
    }
  }
}
</script>

<style lang="scss">
.knowledge_page {
  position: absolute;
  height: auto;
  width: 100%;
  top: 0px;
  left: 0px;

  .knowledge_map {
    position: absolute;
    height: auto;
    width: calc(100% - 400px);
    left: 0px;
    top: 0px;
  }
  .knowledge_detail_content {
    position: fixed;
    height: 100%;
    width: 400px;
    right: 0px;
    top: 0px;
    padding: 10px;
    background-color: aquamarine;
    overflow-y: scroll;

    .title {
      font-size: 22px;
    }

    .image {
      img {
        width: 380px;
        height: auto;
      }
    }

    .content {
      padding: 10px;
    }

    .form_add_new {
      .error_text {
        color: orangered;
      }
    }
  }
}

.li-margin-left-2, .li-margin-left-3, .li-margin-left-4, .li-margin-left-5, .li-margin-left-6 {
  margin-left: 20px !important;
}

/*Tham khảo*/
.tree{
  --spacing : 1.5rem;
  --radius  : 10px;
}

.tree li{
  display      : block;
  position     : relative;
  padding-left : calc(2 * var(--spacing) - var(--radius) - 2px);

}

.tree ul{
  margin-left  : calc(var(--radius) - var(--spacing));
  padding-left : 0;
}

.tree ul li{
  border-left : 2px solid #ddd;
  padding: 10px 20px;
}

.tree ul li:last-child{
  border-color : transparent;
}

.tree ul li::before{
  content      : '';
  display      : block;
  position     : absolute;
  top          : 0px;
  left         : -2px;
  width        : 20px;
  height       : 30px;
  border       : solid #ddd;
  border-width : 0 0 2px 2px;
}
</style>