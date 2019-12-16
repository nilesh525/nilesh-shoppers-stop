<template>
  <div class="home">
    <div class="mainbody border border-secondary mb-3">
      <hooper :infiniteScroll="true">
        <slide>
          <center>
            <br>
            <h5>Super Deal!!!!!!</h5><br>
            <h2>60% Cashback as ecom-cash on order above 1000 .</h2> 
          </center>
        </slide>
        <slide>
          <center>
            <br>
            <h5>Mega offer!!!!!!</h5><br>
            <h2>10% flat discount on order above 1000 using ABC bank debit card .</h2> 
          </center>
        </slide>
        <hooper-navigation slot="hooper-addons"></hooper-navigation>
        <hooper-pagination slot="hooper-addons"></hooper-pagination>
      </hooper>
    </div>
    <div>
      <ItemList/>
    </div>
  </div>
</template>

<script>
import { Hooper, Slide ,Navigation as HooperNavigation,Pagination as HooperPagination} from 'hooper';
import ItemList from "@/views/ItemList.vue";
import 'hooper/dist/hooper.css';
export default {
  name: 'home',
  components: {
    ItemList,Hooper,Slide,HooperNavigation,HooperPagination
  }
}
</script>

<style scoped>
.mainbody{
    background-color: bisque   
}
</style>