<template>
  <div id="app">
     <Header/>
    <div class="container">
    <router-view/>
    </div>
  </div>
</template>
<script>
import Header from '@/components/Header.vue'
export default {
  components:{
    Header
  }
}
</script>
<style>

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
.container{
  max-width: 1300px;
}
</style>
