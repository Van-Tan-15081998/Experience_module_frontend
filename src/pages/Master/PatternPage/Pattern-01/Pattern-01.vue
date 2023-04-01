<template>
  <div
      @scroll="listenScroll"
      class="page">
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
      <p v-for="i in 100" :key="i">
        {{ i }} Lorem ipsum dolor sit amet, consectetur adipisicing elit. Consequuntur explicabo, harum ipsa ipsam libero mollitia neque odit quia sunt vel. Amet exercitationem itaque magnam omnis placeat, quae quia quidem? Quae.
      </p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Pattern-01',
  setup() {

  },
  mounted() {

  },
  methods: {
    listenScroll(event) {
      let scrollTop = event.currentTarget.scrollTop;
      if (scrollTop > 80) {
        document.getElementById("navbar").classList.add("sticky")
      } else {
        document.getElementById("navbar").classList.remove("sticky")
      }
    }
  },
}
</script>

<style scoped lang="scss">
.page {
  height: 100%;
  width: 100%;
  overflow: scroll;

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
        margin-left: 4px;
      }
    }

    .page-title {
      font-size: 22px;
      font-weight: bold;
      height: 26px;
      line-height: 26px;
      margin-top: 4px;
      color: #F5F400;
    }

    .breadcrumb {
      height: 28px;
      width: fit-content;
      background-color: white;
      margin-top: 4px;
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

          &:hover {
            cursor: pointer;
            color: deepskyblue;
          }

          &::before {
            content: '🔹';
            height: 100px;
            width: 100px;
          }

          &:last-child {
            color: deepskyblue;
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
  }
}
</style>