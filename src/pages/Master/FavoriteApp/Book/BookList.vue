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

      <div class="button-add">
        Add
      </div>

      <table class="table">
        <thead class="thead-dark">
        <tr>
          <th scope="col">#</th>
          <th scope="col">First</th>
          <th scope="col">Last</th>
          <th scope="col">Handle</th>
        </tr>
        </thead>
        <tbody>
        <tr>
          <th scope="row">1</th>
          <td>Mark</td>
          <td>Otto</td>
          <td>
            <div class="actions">
              <div class="action-icon-button view">
                <i class="bi bi-search"></i>
              </div>
              <div class="action-icon-button edit">
                <i class="bi bi-pencil-fill"></i>
              </div>
              <div class="action-icon-button delete">
                <i class="bi bi-trash3-fill"></i>
              </div>
              <div class="action-icon-button copy">
                <i class="bi bi-clipboard-check-fill"></i>
              </div>
            </div>
          </td>
        </tr>
        <tr>
          <th scope="row">2</th>
          <td>Jacob</td>
          <td>Thornton</td>
          <td>@fat</td>
        </tr>
        <tr>
          <th scope="row">3</th>
          <td>@twitter</td>
          <td>the Bird</td>
          <td>@twitter</td>
        </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
export default {
  name: 'BookList',
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

    table {
      border-color: #948C6A;
      color: #C3E5AE;

      thead {
        color: #85EDEE;
      }
    }
  }

  .actions {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: flex-start;
    align-items: center;

    .action-icon-button {
      height: 25px;
      width: 30px;
      border: 1px solid #948C6A;
      border-radius: 2px;
      margin-right: 4px;
      display: flex;
      flex-direction: row;
      flex-wrap: wrap;
      justify-content: center;
      align-items: center;
      transition: 0.1s;
      color: #948C6A;

      &:hover {
        cursor: pointer;
        border: 1px solid #555555;
        color: white;

        &.edit {
          background-color: #F1DD00;
        }

        &.view {
          background-color: #42b983;
        }

        &.delete {
          background-color: orangered;
        }

        &.copy {
          background-color: darkturquoise;
        }
      }

      &:active {
        transform: scale(0.8);
        box-shadow: lightslategray 1px 1px 2px 1px;
      }
    }
  }
}
</style>