import { defineStore } from 'pinia'

export const useAuthStore = defineStore('authApp', {
    state: () => {
        return {
            isAuthenticated: false,
            userName: '',
            userPassword: '',
            userToken: ''
        };
    },
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


        initAppAuth() {
            // let tokenFromLocalStorage = JSON.parse(localStorage.getItem('logged-user-info'))
            let tokenFromLocalStorage = localStorage.getItem('logged-user-info')

            console.log('tokenFromLocalStorage', tokenFromLocalStorage);

            if(tokenFromLocalStorage !== '' && tokenFromLocalStorage !== null) {
                console.log('initAppAuth-set true')
                this.isAuthenticated = true;
                this.userToken = tokenFromLocalStorage;
            } else {
                console.log('initAppAuth-set false')
                this.isAuthenticated = false;
                this.userToken = '';
            }

            // return this.isAuthenticated;
        },

        login(name, password, token) {
            console.log('store_login', token)
            this.isAuthenticated = true;
            this.userName = name;
            this.userPassword = password;
            this.userToken = token;
        },

        logout() {

            localStorage.setItem('logged-user-info', '');

            this.isAuthenticated = false
            this.userName = '';
            this.userPassword = '';
            this.userToken = '';
        }
    },
})