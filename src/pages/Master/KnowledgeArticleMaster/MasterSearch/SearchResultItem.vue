<template>
  <div class="search-result-item">
    <div class="header">
      <div class="title">
        {{title}}
      </div>
    </div>
    <div class="body">

    </div>
  </div>
</template>

<script>
export default {
  name: "SearchResultItem",

  props: {
    title: {
      type: String,
      default: 'loading...'
    },
  }
}
</script>

<style scoped lang="scss">
.search-result-item {
  padding: 10px;
  margin: 5px;
  border: 1px solid #626262;
  border-radius: 5px;
  .header {
    .title {
      color: #979797;
    }
  }
}
</style>