<template>
    <div class="mainbody">
        <div class="row" >
            <div class="col" v-if="gc">
                <button type="button" class="btn btn-primary btn-lg btn-block btn-space" @click="gocart">Cart[{{totalcount}}]</button>
            </div>
            <div class="col" v-if="gb" >
                <button type="button" class="btn btn-primary btn-lg btn-block btn-space" @click="gobk">Go Back</button>
            </div>
        </div>    
        <div class="row" v-if="toshowmainpage">
            <div class="col" v-for="(image,index) in imagelist" :key="image.id" >
               <div class="card border-success mb-3" style="max-width: 28rem;" >
                    <div class="card-header bg-transparent border-success">Header</div>
                    <div class="card-body text-success" >
                        <img :src="image.name" alt="image.id" width="350px" height="200px" @click="imgdesc(image.id,index)">
                        <center><p class="card-text">{{image.id}}</p></center>
                    </div>  
                    <div class="card-footer bg-transparent border-success">
                        <center><button type="" id='minus' class="outline-info" @click="decreaseValue(image.id,index)"
                        v-bind:image="image">-</button>
                        <span type="number" min="0"  v-if="count <= 0" >0</span>
                        <div v-for="(x) in cartvalue" :key="x.id">
                        <span type="number" min="0"  v-if="count > 0 && x.id===image.id" >{{x.noofiten}}</span>   
                        </div>
                        <button type="" id='plus' class="outline-secondary" @click="increaseValue(image.id,index)">+</button></center>
                    </div>
                </div>     
            </div>
        </div>
        <div v-if="toshowdescpage" >
            <center><div  v-for="(image,index) in imagelist" :key="image.id" >    
                        <div v-if="image.tr" class="qwe">
                            <center>{{image.id}}<br>
                            <img :src="image.name" alt="image.id" width="350px" height="200px"><br>
                            {{image.desc}}<br></center>
                            <button type="button" class="btn btn-secondary btn-space" @click="backbtn(image.id,index)" v-if="backtomain">back</button>
                            <button type="button" class="btn btn-secondary btn-space" @click="increaseValue(image.id,index)">Add to cart</button>
                            <button type="button" class="btn btn-secondary btn-space">buy</button>
                            <button type="button" class="btn btn-secondary btn-space" v-if="backtocart" @click="gocart(image.id,index)">back to cart</button>
                        </div>    
                    </div>
            </center>
        </div>
        <div v-if="toshowcart">
            <div>
                <div v-for="(x,index) in cartvalue" :key="x.id">
                    <div class="row" v-if="x.tr">
                        <div class="col"><p >you have select {{ x.noofiten }} items of product id {{x.id}}</p></div>
                        <div class="col"><button type="button" class="btn btn-outline-secondary" @click="imgdesc2(x.id,index)">see details</button></div> 
                        <div class="col">
                            <!--<center><button type="" id='minus' class="outline-info" @click="decreaseValue(x.id,index)"
                                v-bind:image="image">-</button>
                                <span type="number" min="0"  v-if="count <= 0" >0</span>
                                <div v-for="(x) in cartvalue" :key="x.id">
                                </div>
                                <button type="" id='plus' class="outline-secondary" @click="increaseValue(x.id,index)">+</button></center>  
                                <div class="qty mt-5">
                                    <span class="minus bg-dark" @click="decreaseValue(x.id,index)">-</span>
                                    <input type="number" class="count" name="qty" value="1">
                                    <span class="plus bg-dark" @click="increaseValue(x.id,index)">+</span>
                                </div>  -->
                                Toatal Cost : {{x.noofiten * x.id}} Rs.
                        </div> 
                    </div>
                </div>
                Toatal Cart Value for {{totalcount}} items is Rs : {{Totalcost}}
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name:"Item-List",
    components:{

    },
    data(){
        return{
            imagelist:[
                {name:require('@/assets/1.jpg'),id:1,
                desc: "Radius of Borders: Border radius is used to make the corner of border curved. More the radius "+
                "more curved and round it will be.In bootstrap, the following classes as used in the code are used to"+
                "implement radius at particular corners",tr:false},
                {name:require('@/assets/2.jpg'),id:2,
                desc: "Radius of Borders: Border radius is used to make the corner of border curved. More the radius "+
                "more curved and round it will be.In bootstrap, the following classes as used in the code are used to"+
                "implement radius at particular corners",tr:false},
                {name:require('@/assets/3.jpg'),id:3,
                desc: "Radius of Borders: Border radius is used to make the corner of border curved. More the radius "+
                "more curved and round it will be.In bootstrap, the following classes as used in the code are used to"+
                "implement radius at particular corners",tr:false},
                {name:require('@/assets/4.jpg'),id:4,
                desc: "Radius of Borders: Border radius is used to make the corner of border curved. More the radius "+
                "more curved and round it will be.In bootstrap, the following classes as used in the code are used to"+
                "implement radius at particular corners",tr:false},
                {name:require('@/assets/5.jpg'),id:5,
                desc: "Radius of Borders: Border radius is used to make the corner of border curved. More the radius "+
                "more curved and round it will be.In bootstrap, the following classes as used in the code are used to"+
                "implement radius at particular corners",tr:false},
                {name:require('@/assets/6.jpg'),id:6,
                desc: "Radius of Borders: Border radius is used to make the corner of border curved. More the radius "+
                "more curved and round it will be.In bootstrap, the following classes as used in the code are used to"+
                "implement radius at particular corners",tr:false},
                {name:require('@/assets/7.jpg'),id:7,
                desc: "Radius of Borders: Border radius is used to make the corner of border curved. More the radius "+
                "more curved and round it will be.In bootstrap, the following classes as used in the code are used to"+
                "implement radius at particular corners",tr:false},
                {name:require('@/assets/8.jpg'),id:8,
                desc: "Radius of Borders: Border radius is used to make the corner of border curved. More the radius "+
                "more curved and round it will be.In bootstrap, the following classes as used in the code are used to"+
                "implement radius at particular corners",tr:false},
                {name:require('@/assets/9.jpg'),id:9,
                desc: "Radius of Borders: Border radius is used to make the corner of border curved. More the radius "+
                "more curved and round it will be.In bootstrap, the following classes as used in the code are used to"+
                "implement radius at particular corners",tr:false},

            ],
            count:0,
            cartvalue:[{noofiten:0,id:0,tr:''},
            {noofiten:0,id:0,tr:''},
            {noofiten:0,id:0,tr:''},
            {noofiten:0,id:0,tr:''},
            {noofiten:0,id:0,tr:''},{noofiten:0,id:0,tr:''}
            ,{noofiten:0,id:0,tr:''},{noofiten:0,id:0,tr:''},{noofiten:0,id:0,tr:''}],
            countit:0,
            idcheck:0,
            toshowmainpage:true,
            toshowdescpage:false,
            idcon:false,
            toshowcart:false,
            gc:false,gb:false,
            totalcount:0,
            backtocart:false,
            backtomain:false,
            Totalcost:0
        }
    },
    methods:{
        increaseValue:function(num,ind){
            this.totalcount = this.totalcount+1;
            var arr=this.cartvalue.filter(function(ele){
                return ele.id==num
            });
            if(this.idcheck!=num){
                if(arr.length!=0){
                    this.count=this.cartvalue[ind].noofiten;
                }else{
                this.count=0;
                }
            }else{
                //this.cartvalue.splice(ind,1);
            }
            this.count=this.count+1;
            if(arr.length!=0){
                this.countit=this.count;
                this.Totalcost=this.Totalcost-(this.cartvalue[ind].noofiten*this.cartvalue[ind].id);
                this.cartvalue.splice(ind,1);
                this.cartvalue.splice(ind,0,{noofiten:this.countit,id:num});
                this.Totalcost=this.Totalcost+(this.cartvalue[ind].noofiten*this.cartvalue[ind].id);
                this.cartvalue[ind].tr=true;
                this.idcheck=num;
                this.gc=true;
            }else{
                this.Totalcost=this.Totalcost-(this.cartvalue[ind].noofiten*this.cartvalue[ind].id);
                this.cartvalue.splice(ind,1);
                this.cartvalue.splice(ind,0,{noofiten:this.count,id:num});
                this.Totalcost=this.Totalcost+(this.cartvalue[ind].noofiten*this.cartvalue[ind].id);
                this.cartvalue[ind].tr=true;
                this.idcheck=num;
                this.gc=true;
            }
            if(this.totalcount<=0){
                this.gc=false;
                this.totalcount=0;
            }else{
            this.gc=true;
            }
            return this.count;
        },
        decreaseValue:function(num,ind){
            this.totalcount = this.totalcount-1;
            var arr=this.cartvalue.filter(function(ele){
                return ele.id==num
            });
            if(this.idcheck!=num){
                if(arr.length!=0){
                    this.count=this.cartvalue[ind].noofiten;
                }else{
                this.count=0;
                }
            }
            this.count= this.count-1;
            if(arr.length!=0){
                this.countit=this.count;
                this.cartvalue.splice(ind,1);
                this.cartvalue.splice(ind,0,{noofiten:this.countit,id:num});
            }else{
                if(this.count<=0){
                    this.count=0;
                }else{
                    this.cartvalue.splice(ind,1);
                    this.cartvalue.splice(ind,0,{noofiten:this.count,id:num});
                }
            }
            if(this.totalcount<=0){
                this.gc=false;
                this.totalcount=0;
            }else{
            this.gc=true;
            }
            return this.count;
        },
        imgdesc(id,imd){
            this.toshowmainpage=false;
            this.toshowdescpage=true ;
            this.imagelist[imd].tr=true;
            this.toshowcart=false;
            this.backtocart=false;
            this.backtomain=true;
        },
        imgdesc2(id,imd){
            this.toshowmainpage=false;
            this.toshowdescpage=true ;
            this.imagelist[imd].tr=true;
            this.toshowcart=false;
            this.gb=false;
            this.backtocart=true;
            this.backtomain=false;
        },
        backbtn(id,imd){
            this.toshowmainpage=true;
            this.toshowdescpage=false ;
            this.imagelist[imd].tr=false;
            this.gb=false;
            this.gc=true;
        },
        gocart(id,imd){
            this.toshowmainpage=false;
            this.toshowdescpage=false;
            this.toshowcart=true;
            this.gb=true;
            this.gc=false;
            this.imagelist[imd].tr=false;
        },
        gobk(id,imd){
            this.toshowmainpage=true;
            this.toshowdescpage=false;
            this.toshowcart=false;
            this.gb=false;
            this.gc=true;
            this.imagelist[imd].tr=false;
        }
    }
}
</script>

<style scoped>
.mainbody{
    background-color: bisque
}
.productarea{
    background-color: gray;
    padding: 0 15px;
}
form {
  width: 300px;
  margin: 0 auto;
  text-align: center;
  padding-top: 50px;
}

.value-button {
  display: inline-block;
  border: 1px solid #ddd;
  margin: 0px;
  width: 40px;
  height: 20px;
  text-align: center;
  vertical-align: middle;
  padding: 11px 0;
  background: #eee;
  -webkit-touch-callout: none;
  -webkit-user-select: none;
  -khtml-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
}
.value-button:hover {
  cursor: pointer;
}

form #decrease {
  margin-right: -4px;
  border-radius: 8px 0 0 8px;
}

form #increase {
  margin-left: -4px;
  border-radius: 0 8px 8px 0;
}

form #input-wrap {
  margin: 0px;
  padding: 0px;
}

input#number {
  text-align: center;
  border: none;
  border-top: 1px solid #ddd;
  border-bottom: 1px solid #ddd;
  margin: 0px;
  width: 40px;
  height: 40px;
}

input[type=number]::-webkit-inner-spin-button,
input[type=number]::-webkit-outer-spin-button {
    -webkit-appearance: none;
    margin: 0;
}
.qwe{
    max-width : 500px;
    word-wrap: break-word;
}
.btn-space {
    margin-right: 5px;
}
.qty .count {
    color: #000;
    display: inline-block;
    vertical-align: top;
    font-size: 25px;
    font-weight: 700;
    line-height: 30px;
    padding: 0 2px
    ;min-width: 35px;
    text-align: center;
}
.qty .plus {
    cursor: pointer;
    display: inline-block;
    vertical-align: top;
    color: white;
    width: 30px;
    height: 30px;
    font: 30px/1 Arial,sans-serif;
    text-align: center;
    border-radius: 50%;
    }
.qty .minus {
    cursor: pointer;
    display: inline-block;
    vertical-align: top;
    color: white;
    width: 30px;
    height: 30px;
    font: 30px/1 Arial,sans-serif;
    text-align: center;
    border-radius: 50%;
    background-clip: padding-box;
}
div {
    text-align: center;
}
.minus:hover{
    background-color: #717fe0 !important;
}
.plus:hover{
    background-color: #717fe0 !important;
}
/*Prevent text selection*/
span{
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
}
input{  
    border: 0;
    width: 2%;
}
nput::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
}
input:disabled{
    background-color:white;
}

</style>