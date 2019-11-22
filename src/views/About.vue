<template>
  <div class="about">
    <h1>This is an about page {{count}}</h1>
    <div v-for="x in cartvalue" :key="x.id">
      {{x.id}}
    </div>
    <ItemList/>
  </div>
</template>
<script>
import ItemList from "@/views/ItemList.vue";
export default {
  name:"about-page",
  props:['count'],
  data(){
    return{
      coun:0
    }
  },
  components:{
    ItemList,
    //'item': require('@/views/ItemList.vue'),
  },
  methods:{

  }
}
</script>
<style scoped>

</style>
