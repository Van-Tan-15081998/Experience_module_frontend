import { createApp } from 'vue'
import App from './App.vue'

import mitt from 'mitt'; // Use for eventBus

import router from './router/routes'; // Use for Vue router

// import apiService from './plugins/api/apiService'; // Use ApiService

import 'bootstrap-icons/font/bootstrap-icons.css'; // Use for Bootstrap-icons

import { createPinia } from 'pinia'; // Use Pinia

const pinia = createPinia();

// Test Vuex
import store from './vuex-store';

/// Vue 3 createApp method
const myApp = createApp(App);

/// Use for event
const exEventBus = mitt();
myApp.config.globalProperties.exEventBus = exEventBus;

// Use router
myApp.use(router);

// Use Pinia
myApp.use(pinia);

// myApp.provide('apiService', apiService);

// Test Vuex
myApp.use(store);

// Mount
myApp.mount('#app');