<template>
    <div >
        dftgh {{x}}
        <button type="" class="outline-info" @click="display()"/>
        <div v-for="imag in image" :key="imag.id">
            Details : {{imag.id}}
        </div>
    </div>
</template>

<script>
export default {
    name:"Itemdesc",
    props:['image'],
    //props: {
    //imagelist: {
    //  type: Array,
    //  required: true
    //}
    //},
    components:{
    },
    data(){
        return{
            x:0
        }
    },
    methods:{
        display:function(){
            var arr=this.image;
            if(arr!=null){
                this.x=5;
            }
        }
    }
}
</script>

<style scoped>

</style>