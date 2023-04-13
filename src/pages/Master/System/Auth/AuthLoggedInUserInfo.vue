<template>
  <div class="page">
    <div
        class="user-info">
      <div
          v-if="loading"
          class="loading">
        <i class="bi bi-arrow-clockwise"></i>
      </div>

      <div class="form-label">
        Hi {{ userName }}
      </div>

      <div
          @click="onLogout"
          class="button-logout">
        Logout
      </div>
    </div>
  </div>
</template>

<script>
import {useAuthStore} from "@/store/System/AuthStore";
// import authApi from "@/scripts/Master/System/Auth/AuthApi";

export default {
  name: "AuthLoggedInUserInfo",
  // inject: ['apiService'],
  setup() {
    const authStore = useAuthStore();

    return {
      authStore
    }
  },
  mounted() {
    if(this.authStore.getIsAuthenticated) {
      const redirect = { name: 'auth/auth-login' };

      this.$router.push(redirect);
    }
  },
  data() {
    return {
      loading: false,
      userName: null,
    }
  },
  methods: {
    async onLogout() {

    }
  }
}
</script>

<style scoped lang="scss">
.page {
  display: flex;
  justify-content: center;
  padding: 100px 10px;

  .user-info {
    position: relative;
    width: 400px;
    height: 500px;
    background-color: white;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;

    .loading {
      position: absolute;
      top: 0px;
      left: 0px;
      width: 100%;
      height: 100%;
      background-color: #555555;
      opacity: 0.5;
      z-index: 9999;
      transition: 0.2s;

      display: flex;
      flex-direction: row;
      justify-content: center;
      align-items: center;

      i {
        font-size: 30px;
        color: #F5F400;
        opacity: 1;
        animation: spin-around;
        animation-duration: 1000ms;
        animation-iteration-count: infinite;
        animation-timing-function: linear;
      }
    }

    .button-logout {
      min-width: 100px;
      width: fit-content;
      padding: 2px 10px;
      transition: 0.1s;
      display: flex;
      flex-direction: row;
      justify-content: center;
      align-items: center;
      color: #555555;
      border: 1px solid #555555;
      user-select: none;
      font-size: 18px;

      margin-top: 50px;

      &:hover {
        background-color: white;
        border-color: #555555;
        cursor: pointer;
      }

      &:active {
        transform: scale(0.95);
        border-color: #555555;
        background-color: #F5F400;
      }
    }
  }
}

@keyframes spin-around {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}
</style>