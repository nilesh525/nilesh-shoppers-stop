<template>
  <div class="about">
    <h1>This is an about page {{title}}</h1>
    
  </div>
</template>
<script>

export default {
  name:"about-page",
  props:['count'],
  data(){
    return{
      coun:0
    }
  },
  components:{
    
  },
  methods:{

  }
}
</script>
<style scoped>

</style>
