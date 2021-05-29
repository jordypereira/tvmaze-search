<template>
  <main>
    <h1 class="prose">Hello.</h1>
    <Search />
  </main>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import Search from './components/Search.vue'

export default defineComponent({
  name: 'App',
  components: {
    Search
  }
})
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>