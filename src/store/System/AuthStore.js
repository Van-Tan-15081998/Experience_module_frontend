import { defineStore } from 'pinia'

export const useAuthStore = defineStore('authApp', {
    state: () => ({
        isAuthenticated: false,
        userName: null,
        userPassword: null,
        userToken: null
    }),
    getters: {
        getIsAuthenticated(state) {
            return state.isAuthenticated;
        },
        getUserName(state) {
            return state.userName;
        },
        getUserPassword(state) {
            return state.userPassword;
        },
        getUserToken(state) {
            return state.userToken;
        }
    },
    actions: {
        // TODO: Temp
        checkLogin() {
            let tokenFromLocalStorage = JSON.parse(localStorage.getItem('logged-user-info'))

            if(tokenFromLocalStorage && tokenFromLocalStorage['token']) {
                return tokenFromLocalStorage['token'];
            }

            return false;
        },

        login(name, password, token) {
            this.isAuthenticated = true;
            this.userName = name;
            this.userPassword = password;
            this.userToken = token;
        },
        logout() {
            this.isAuthenticated = false
            this.userName = null;
            this.userPassword = null;
            this.userToken = null;
        }
    },
})