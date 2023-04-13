<template>
  <div>
    <div v-if="showLoginPage.show">
      <auth-login/>
    </div>
    <div v-if="showLoggedInUserInfoPage.show">
      <auth-logged-in-user-info/>
    </div>
  </div>
</template>

<script>
import AuthLogin from "@/pages/Master/System/Auth/AuthLogin.vue";
import AuthLoggedInUserInfo from "@/pages/Master/System/Auth/AuthLoggedInUserInfo.vue";
import AuthResetPassword from "@/pages/Master/System/Auth/AuthResetPassword.vue";

import { useAuthStore } from "@/store/System/AuthStore";
import {reactive} from "vue";

export default {
  name: 'AuthHomePage',
  setup() {
    const authStore = useAuthStore();

    let showLoginPage = reactive({show: false});
    let showLoggedInUserInfoPage = reactive({show: false});

    if(authStore.getIsAuthenticated) {
      showLoginPage.show = false;
      showLoggedInUserInfoPage.show = true;
    } else {
      showLoginPage.show = true;
      showLoggedInUserInfoPage.show = false;
    }

    return {
      authStore,
      showLoginPage,
      showLoggedInUserInfoPage
    }
  },
  data() {
    return {

    }
  },
  components: {
    AuthLogin,
    AuthResetPassword,
    AuthLoggedInUserInfo
  }
}
</script>

<style scoped>

</style>