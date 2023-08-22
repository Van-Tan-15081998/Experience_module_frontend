<template>
  <div></div>
</template>
<script>
import { mapState } from 'pinia';
import { mapActions } from 'pinia';
import {useAuthStore} from "@/store/System/AuthStore";
import apiService from "@/plugins/api/apiService";
import axios from "axios";
import ApiConstants from "@/plugins/api/apiConstants";

export default {
  name: "CoreSystem",
  setup() {
    const authStore = useAuthStore();
    let appApiService = apiService(this, authStore);

    return {
      authStore,
      appApiService
    }
  },
  beforeMount() {
    this.initAppAuth();
  },
  provide() {
    return {
      apiService: this
    }
  },
  watch: {
    getIsAuthenticated: {
      handler (value) {
        if(!value) {
          const redirect = { name: 'auth/auth-login' };
          this.$router.push(redirect);
        }
      },
      deep: true
    },
    routeFullPathComputed: {
      handler (value) {
        if(value) {
          this.checkAppAuth();
        }
      },
      deep: true
    },
  },
  computed: {
    ...mapState(useAuthStore, ['getIsAuthenticated','getUserToken']),

    routeFullPathComputed() {
      return this.$route.fullPath;
    }
  },
  methods: {
    ...mapActions(useAuthStore, ['initAppAuth']),

    checkAppAuth() {
      if(!this.getIsAuthenticated && this.routeFullPathComputed !== "/master/system/auth/auth-login") {
        const redirect = { name: 'auth/auth-login' };
        this.$router.push(redirect);
      }
    },

    authHeader() {
      let headers = {
        Accept: 'application/json'
      };

      if (this.getUserToken && this.getIsAuthenticated) {
        headers.Authorization = 'Bearer ' + this.getUserToken;
      }

      return headers;
    },

    callApiGet(api) {
      return axios
          .get(ApiConstants.API_ROOT_URL + api, {
            headers: this.authHeader()
          })
          .then(res => {
            return res.data;
          })
          .catch(err => {
            console.log(err)
          });
    },

    callApiPost(api, data) {
      return axios
          .post(ApiConstants.API_ROOT_URL + api, data, {
            headers: this.authHeader()
          })
          .then(res => {
            return res.data;
          })
          .catch(err => {
            // Cần return error data tại đây nhằm đảm bảo error trả về (response) đã được handel
            return err.response.data;
          });
    },

    callApiPut(api, data) {
      return axios
          .put(ApiConstants.API_ROOT_URL + api, data, {
            headers: this.authHeader()
          })
          .then(res => {
            return res.data;
          })
          .catch(err => {
            console.log(err);
          });
    }
  }
}
</script>

<style scoped>

</style>