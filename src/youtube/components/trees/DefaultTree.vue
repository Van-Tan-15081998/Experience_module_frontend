<template>
  <div class="default-tree">
    <div class="tree-wrapper">

      <img src="https://live.staticflickr.com/65535/53370914867_2e3b277549_b.jpg" alt="">

    </div>
  </div>
</template>

<script>
export default {
  name: "DefaultTree",
  data() {
    return {
      treeResource:   ''
    }
  },
}
</script>

<style scoped lang="scss">
.default-tree {
  margin: 5px;

  .tree-wrapper {
    width: 150px;
    height: 200px;
    background-color: green;

    img {
      width: 100%;
      height: auto;
    }
  }
}
</style>