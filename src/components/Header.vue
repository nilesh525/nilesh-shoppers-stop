<template>
  <div class="hello">
    <nav class="navbar navbar-expand-lg navbar-dark " id="nav">
     <div class="container">
       <router-link to="/" class="navbar-brand">ecom</router-link>
      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav ml-auto">
          <li class="nav-item active">
            <router-link to="/" class="nav-link">Home</router-link>
          </li>
          <li class="nav-item">
            <router-link to="/about" class="nav-link" >Cart</router-link>
          </li>
        </ul>
        <form class="form-inline my-2 my-lg-0">
          <input class="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search">
          <button class="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
        </form>
      </div>
     </div>
  </nav>
  </div>
</template>

<script>
export default {
  name: 'Header',
  props: {
  }
}
</script>

<style scoped>
.navbar{
  background: #d3d3d3;
  height: 1cm;
}
.navbar-nav a{
  color: aqua;
  padding: 0 15px;
  display: block;
}
</style>
