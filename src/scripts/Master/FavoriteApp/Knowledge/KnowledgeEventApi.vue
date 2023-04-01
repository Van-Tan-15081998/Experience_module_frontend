<template>
  <div></div>
</template>

<script>
import { KnowledgeApiConst } from './KnowledgeApiConst';
export default {
  name: "KnowledgeEventApi",
  inject: ['apiService'],

  created() {
    this.exEventBus.on('GET_LIST_KNOWLEDGE', (data) => {
      this.apiService
          .callApiGet(KnowledgeApiConst.API_URL_LIST + data['subjectCode'])
          .then((response) => {
            console.log(response)
            if (response['error_code'] === 0) {
              this.exEventBus.emit(
                  'GET_LIST_KNOWLEDGE_SUCCESS',
                  response.data
              );
            } else {
              this.exEventBus.emit(
                  'GET_LIST_KNOWLEDGE_ERROR',
                  response
              );
            }
          });
    });

    // GET_CHILDREN_BY_PARENT_KNOWLEDGE_CODE
    this.exEventBus.on('GET_CHILDREN_BY_PARENT_KNOWLEDGE_CODE', (data) => {
      this.apiService
          .callApiGet(KnowledgeApiConst.API_URL_GET_CHILDREN_BY_PARENT_KNOWLEDGE_CODE + data['parentKnowledgeCode'])
          .then((response) => {
            console.log(response)
            if (response['error_code'] === 0) {
              this.exEventBus.emit(
                  'GET_CHILDREN_BY_PARENT_KNOWLEDGE_CODE_SUCCESS',
                  response.data
              );
            } else {
              this.exEventBus.emit(
                  'GET_CHILDREN_BY_PARENT_KNOWLEDGE_CODE_ERROR',
                  response
              );
            }
          });
    });

    // GET_KNOWLEDGE_DETAIL_CONTENT
    this.exEventBus.on('GET_KNOWLEDGE_DETAIL_CONTENT', (data) => {
      this.apiService
          .callApiGet(KnowledgeApiConst.API_URL_GET_KNOWLEDGE_DETAIL_CONTENT + data['knowledgeCode'])
          .then((response) => {
            console.log(response)
            if (response['error_code'] === 0) {
              this.exEventBus.emit(
                  'GET_KNOWLEDGE_DETAIL_CONTENT_SUCCESS',
                  response.data
              );
            } else {
              this.exEventBus.emit(
                  'GET_KNOWLEDGE_DETAIL_CONTENT_ERROR',
                  response
              );
            }
          });
    });

    // ADD_KNOWLEDGE
    this.exEventBus.on('ADD_KNOWLEDGE', (data) => {
      this.apiService
          .callApiPost(KnowledgeApiConst.API_URL_ADD, data)
          .then((response) => {
            console.log(response)
            if (response['error_code'] === 0) {
              this.exEventBus.emit(
                  'ADD_KNOWLEDGE_SUCCESS',
                  response.data
              );
            } else {
              this.exEventBus.emit(
                  'ADD_KNOWLEDGE_ERROR',
                  response
              );
            }
          });
    });
  }
}
</script>