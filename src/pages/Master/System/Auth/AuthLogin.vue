<template>
  <div class="page">
    <div
        v-if="!authStore.getIsAuthenticated"
        class="login-form">
      <div
          v-if="loading"
          class="loading">
        <i class="bi bi-arrow-clockwise"></i>
      </div>

      <div class="form-label">
        Login
      </div>

      <div class="input_wrapper">
        <div class="input_label">Name</div>
        <div class="input_validator error">
          <input
              v-model="userName"
              class="input_form" type="text" placeholder="Placeholder">
          <div class="input_validator_status">
            <div class="input_icon">
              <i class="bi bi-exclamation-lg"></i>
            </div>
          </div>
        </div>
        <div class="input-error-label">
          Vui lòng xem lại thông tin. Vui lòng xem lại thông tin
        </div>
      </div>

      <div class="input_wrapper">
        <div class="input_label">Password</div>
        <div class="input_validator success">
          <input
              v-model="password"
              class="input_form" type="text" placeholder="Placeholder">
          <div class="input_validator_status">
            <font-awesome-icon
                icon="fa-solid fa-circle-exclamation"
                class="input_icon"
            />
          </div>
        </div>
      </div>

      <div
          @click="onLogin"
          class="button-login">
        Login
      </div>
    </div>
  </div>
</template>

<script>
import authApi from "@/scripts/Master/System/Auth/AuthApi";
import { useAuthStore } from "@/store/System/AuthStore";
import {mapState} from "pinia/dist/pinia";
export default {
  name: 'AuthLogin',
  inject: ['apiService'],
  setup() {
    const authStore = useAuthStore();

    return {
      authStore
    }
  },
  mounted() {
    if(this.getIsAuthenticated) {
      const redirect = { name: 'auth/auth-logged-in-user-info' };
      this.$router.push(redirect);
    }
  },
  data() {
    return {
      loading: false,
      userName: 'systemmanager',
      password: '123456'
    }
  },
  watch: {

  },
  computed: {
    ...mapState(useAuthStore, ['getIsAuthenticated']),
  },
  methods: {
    async onLogin() {
      this.loading = true;

      let dataObj = await authApi.login(this, {
        'loginId': this.userName,
        'password': this.password
      })

      if(!dataObj) {
        return;
      }

      if(dataObj.data.token) {
        console.log('login', dataObj.data.token)

        localStorage.setItem('logged-user-info', dataObj.data.token);
        let tokenFromLocalStorage = localStorage.getItem('logged-user-info');

        if(tokenFromLocalStorage !== '') {
          this.authStore.login(
              this.userName,
              this.password,
              dataObj.data.token
          )

          this.loading = false;

          if(this.authStore.getIsAuthenticated) {
            const redirect = { name: 'auth/auth-logged-in-user-info' };

            this.$router.push(redirect);
          }
        }
      }
    }
  }
}
</script>

<style scoped lang="scss">
.page {
  display: flex;
  justify-content: center;
  padding: 100px 10px;

  .login-form {
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

    .form-label {
      color: #555555;
      font-size: 25px;
      font-weight: bold;
    }

    .input_wrapper {
      display: flex;
      flex-direction: column;
      flex-wrap: nowrap;
      justify-content: flex-start;
      align-items: flex-start;
      margin-bottom: 10px;

      .input_label {
        height: 30px;
        font-size: 16px;
        font-weight: 500;
        color: #555555;
      }

      .input-error-label {
        max-width: 300px;
        height: 25px;
        line-height: 25px;
        color: white;
        font-size: 12px;
        padding: 0px 10px;
        background-color: #F85D6D;
        border-radius: 20px;
      }

      .input_validator {
        position: relative;
        width: 300px;
        height: 40px;

        &.success {
          input {
            border-right: 1px solid green;
            border-top: 1px solid green;
          }

          .input_validator_status {
            .input_icon {
              display: block;
              color: green;
            }
          }
        }

        &.error {
          input {
            border-right: 1px solid red;
            border-top: 1px solid red;
          }

          .input_validator_status {
            .input_icon {
              display: block;
              color: red;
            }
          }
        }

        input {
          left: 0px;
          top: 0px;
          height: 100%;
          width: 100%;
          background-color: white;
          padding: 0px 40px 0px 15px;
          outline: none;
          border-right: 1px solid #555555;
          border-top: 1px solid #555555;
          border-left: none;
          border-bottom: none;
          transition: 0.1s;

          &:focus {
            border-right: 1px solid blue !important;
            border-top: 1px solid blue !important;
          }

        }

        .input_validator_status {
          position: absolute;
          right: 0px;
          top: 0px;
          width: 40px;
          height: 40px;
          display: flex;
          justify-content: center;
          align-items: center;

          .input_icon {
            display: none;
            font-size: 20px;
          }
        }
      }
    }

    .button-login {
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