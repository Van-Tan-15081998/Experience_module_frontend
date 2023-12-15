<template>
  <div class="knowledge-article-item">
    <div class="knowledge-article-item-wrapper">
      <div class="left-wrapper">
        <img src="https://live.staticflickr.com/65535/53397656893_0f747a5832_h.jpg" alt="">
      </div>
      <div class="right-wrapper">
        <div class="title-content">
         <p>{{title}}</p>
        </div>
        <div class="tag-list">
         <div v-for="(tag, index) in tags"
              :key="index"
         >
            <span :style="{'border': '1px solid', 'border-left': '15px solid', 'border-radius': '5px', 'padding': '6px', 'border-color': tag.color}">
            {{ tag.title }}
          </span>
         </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "KnowledgeArticleItem",
  props: {
    title: {
      type: String,
      default: 'Title'
    },
    tags: {
      type: [Array],
      default: () => {return []}
    },
  },
}
</script>

<style scoped lang="scss">
.knowledge-article-item {
  color: #626262;
  width: auto;
  height: auto;
  margin: 5px;
  padding: 0 10px;
  border-radius: 6px;
  background-color: #1b1f23;
  //border: none;
  border: 1px solid #626262;
  box-shadow: -4px -2px 4px 0px #262830,
  4px 2px 6px 0px #111316;
  cursor: pointer;
  font-size: 14px;
  overflow: hidden;
  transition: 0.2s;

  &:hover {
    border-color: #00bf72;
    transform: scale(1.05);
    box-shadow: 0 8px 16px #000000;
  }

  &:active {
    border-color: #00bf72;
    transform: scale(1);
    box-shadow: 0 8px 16px #000000;
  }

  .knowledge-article-item-wrapper {

    min-height: 100px;
    min-width: 350px;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: flex-start;
    align-items: flex-start;
    align-content: flex-start;

    .left-wrapper {
      width: 150px;
      height: 100%;
      padding: 10px 10px 10px 0;

      display: flex;
      flex-direction: column;
      flex-wrap: nowrap;
      justify-content: center;
      align-items: center;
      align-content: center;

      img {
        width: 100%;
        height: auto;
      }
    }

    .right-wrapper {
      width: calc(100% - 150px);
      height: auto;

      display: flex;
      flex-direction: column;
      flex-wrap: wrap;
      justify-content: flex-start;
      align-items: flex-start;
      align-content: flex-start;

      .title-content {
        min-width: 100%;
        max-width: 200px;
        min-height: 50px;
        padding: 10px 0 10px 0;

        overflow-wrap: break-word;
        p {
          color: #e5eff5;
          font-size: 18px;
          font-weight: 400;
        }
      }

      .tag-list {
        width: 100%;
        color: white;
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        justify-content: flex-start;
        align-items: flex-start;
        align-content: flex-start;
        span {
          margin: 2px;
        }
      }
    }
  }
}
</style>