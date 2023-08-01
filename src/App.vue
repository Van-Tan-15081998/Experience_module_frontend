<template>
	<router-view></router-view>
</template>

<script>
// import HelloWorld from './components/HelloWorld.vue'

import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap/dist/js/bootstrap.js"

import PostList from "@/components/Post/PostList";

export default {
  name: 'App',
  components: {
    // HelloWorld
    PostList
  }
}
</script>

<style>
#app {
  /*font-family: Avenir, Helvetica, Arial, sans-serif;*/
  /*-webkit-font-smoothing: antialiased;*/
  /*-moz-osx-font-smoothing: grayscale;*/
  color: #2c3e50;
}
</style>
