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
                    <div class="card-header bg-transparent border-success">Header {{image.id}}</div>
                    <div class="card-body text-success" >
                        <img :src="image.name" alt="image.id"  @click="imgdesc(image.id,index)" class="img-mainpage">
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
            <div  v-for="(image,index) in imagelist" :key="image.id" class="text-center">    
                        <div v-if="image.tr" class="qwe">
                            {{image.id}}<br>
                            <img :src="image.name" alt="image.id" width="350px" height="200px"><br>
                            {{image.desc}}<br>
                            <button type="button" class="btn btn-secondary btn-space" @click="backbtn(image.id,index)" v-if="backtomain">back</button>
                            <button type="button" class="btn btn-secondary btn-space" @click="increaseValue(image.id,index)">Add to cart</button>
                            <button type="button" class="btn btn-secondary btn-space" @click="enableemail()">buy</button>
                            <button type="button" class="btn btn-secondary btn-space" v-if="backtocart" @click="gocart(image.id,index)">back to cart</button>
                        </div>  
                        <div v-if="mailbtn && image.tr">
                            Email : <input type="text" name="email" required style="min-width:200px " class="btn-space" v-model="emailadd">
                            <button type="button" class="btn btn-secondary btn-space" @click="invokelambda(image.id,index)">Pay</button><br>
                            You entered : {{emailadd}}
                        </div>  
                    </div>
        </div>
        <div v-if="toshowcart">
            <div>
                <div v-for="(x,index) in cartvalue" :key="x.id">
                    <div class="row" v-if="x.tr">
                        <div class="col"><p >you have selected {{ x.noofiten }} items of product id {{x.id}} !!!</p></div>
                        <div class="col"><button type="button" class="btn btn-outline-secondary" @click="imgdesc2(x.id,index)">see details</button></div> 
                        <div class="col">
                                Toatal Cost : {{x.noofiten * x.id}} Rs.
                        </div> 
                    </div>
                </div><br><br>
                <div class="row" v-if="mailbtn">
                    <div class="col">
                        Toatal Cart Value for {{totalcount}} items is Rs : {{Totalcost}}
                    </div>
                    <div class="col" >
                            Email : <input type="text" name="email" required style="min-width:200px " class="btn-space" v-model="emailadd">
                            <button type="button" class="btn btn-secondary btn-space" @click="invokelambda()">Pay</button>
                    </div>  
                </div>
            </div>
        </div>
        <div v-if="toshowfinalpage" >
            <div >
                <h1>Thanks for shopping</h1>
            </div>
        </div>
        <div v-if="toshowemailverification" >
            <div >
                <center><h1>Sorry for inconvenience !!! Email not verified . <br> 
                An Email has been sent to mail id please click the link to verify and come back .</h1><br>
                <button type="button" class="btn btn-secondary btn-space" @click="gobk()">go back</button>
                </center>
            </div>
        </div>
    </div>
</template>

<script>
//import { config } from 'aws-sdk';
//import getAwsInfo from "@/assets/myAwsinfo.js";
export default {
    name:"Item-List",
    components:{
        //getAwsInfo
    },
    created(){
       // this.invokelambda();
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
            Totalcost:0,
            mailbtn:false,
            ststuscode:'',
            msg:'',
            toshowfinalpage:false,
            emailadd:'',
            toshowemailverification:false,
            awsuserlist:[]
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
                this.Totalcost=this.Totalcost-(this.cartvalue[ind].noofiten*this.cartvalue[ind].id);
                this.countit=this.count;
                this.cartvalue.splice(ind,1);
                this.cartvalue.splice(ind,0,{noofiten:this.countit,id:num});
                this.Totalcost=this.Totalcost+(this.cartvalue[ind].noofiten*this.cartvalue[ind].id);
            }else{
                if(this.count<=0){
                    this.count=0;
                }else{
                    this.Totalcost=this.Totalcost-(this.cartvalue[ind].noofiten*this.cartvalue[ind].id);
                    this.cartvalue.splice(ind,1);
                    this.cartvalue.splice(ind,0,{noofiten:this.count,id:num});
                    this.Totalcost=this.Totalcost+(this.cartvalue[ind].noofiten*this.cartvalue[ind].id);
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
        gocart(){
            this.toshowmainpage=false;
            this.toshowdescpage=false;
            this.toshowcart=true;
            this.gb=true;
            this.gc=false;
            this.mailbtn=true
            //this.imagelist[imd].tr=false;
        },
        gobk(id,imd){
            this.toshowmainpage=true;
            this.toshowdescpage=false;
            this.toshowcart=false;
            this.gb=false;
            this.gc=true;
            this.imagelist[imd].tr=false;
        },
        enableemail(){
            this.mailbtn=true
        },
        invokelambda(num,ind){
            var c ='';
            var fab='';
            var em= '';
            em=this.emailadd;
            this.toshowfinalpage=true;
            this.toshowdescpage=false;
            this.toshowcart=false;
            if(!this.gb){
                this.count=this.count+1;
                this.cartvalue.splice(ind,1);
                this.cartvalue.splice(ind,0,{noofiten:this.count,id:num});
                this.toshowdescpage=false;
                this.toshowfinalpage=true;
               c =this.Totalcost+(this.cartvalue[ind].noofiten*this.cartvalue[ind].id);
                fab = this.cartvalue[ind].id;
            }else{
                var i;
                c=this.Totalcost;
                for(i=0;i<this.cartvalue.length;i++){
                    if(this.cartvalue[i].noofiten>0){
                        fab = fab+' '+ this.cartvalue[i].id;
                    }
                }  
            }
            var awsConfigInfo = {
                region: 'ap-south-1',
                identityPoolId: 'ap-south-1:c49a9371-0b0b-4359-b111-138b5d17e4af'
            }
            var AWS = require('aws-sdk');
            require('dotenv').config();
            const SESConfig = {
                accessKeyId : process.env.AWS_SES_Access_Key_ID,
                secretAccessKey : process.env.AWS_SES_Secret_Access_Key,
                region : "ap-south-1",
                output : JSON
            }
            var awsConfig = awsConfigInfo;
            var REGION = awsConfig.region;
            var identityPoolId = awsConfig.identityPoolId;
            AWS.config.update({
                region:REGION
            });
            AWS.config.credentials = new AWS.CognitoIdentityCredentials({
               IdentityPoolId:identityPoolId 
            });
            var lambda = new AWS.Lambda({
                region:REGION,
                apiVersion: '2019-11-25'
            });
            var pullparam = {
                FunctionName : 'ecom_lambda_11022',
                InvocationType : 'RequestResponse',
                LogType : 'None'
            };
            
            lambda.invoke(pullparam,function(error){
                if(error){
                    prompt(error);
                }else{
                    //prompt(data.Payload);
                    const ses = new AWS.SES(SESConfig);
                    var params = {};
                    params.EmailAddress = String(em);               
                    var params2 = {
                    IdentityType: "EmailAddress", 
                    MaxItems: 123, 
                    NextToken: ""
                    };
                    ses.listIdentities(params2, function(err, data0) {
                    if (err) prompt(err, err.stack); // an error occurred
                    else {
                         var flag = false;
                        for(var i=0;i<data0.Identities.length;i++){
                            if(data0.Identities[i]==em){
                             //prompt(data0);
                            flag=true;
                            }
                            }
                            if(flag){
                                var param={
                                    "Source": "nilesh525.kmr@gmail.com",
                                    "Template": "MyTemplate",
                                    "Destination": {
                                        "ToAddresses": [ "nilesh525.kmr@gmail.com"
                                        ]
                                    },
                                    //"TemplateData": "{ \"name\":\"NIlesh\", \"favoriteanimal\": \"Elephant\" ,\"totalcost\" : \"[this.Totalcost]\" }"
                                };
                                var tempdata ={};
                                var uname = em;
                                uname =uname.replace(/@.*m/,'');
                                tempdata.name=uname;
                                tempdata.favoriteanimal=String(fab);
                                tempdata.totalcost=String(c);
                                param.TemplateData = JSON.stringify(tempdata);
                                var toadd = [];
                                toadd.push(String(em));
                                toadd.push("nilesh525.kmr@gmail.com");
                                param.Destination.ToAddresses = toadd;
                                ses.sendTemplatedEmail(param,function(email_err){
                                if(email_err){
                                    prompt(email_err);
                                }else{
                                    alert("Details have been sent to your email .");
                                    return;
                                    //prompt(email_data);
                                }
                                });
                            }
                            else{
                                ses.verifyEmailIdentity(params, function(err) {
                                    if (err) {prompt(err);
                                    } // an error occurred
                                    else{
                                        //prompt(data1)
                                        alert("Sorry for inconvenience !!! Email not verified ." + 
                                        "An Email has been sent to mail id please click the link to verify and come back .");
                                        return;
                                    }
                                });
                                
                            }
                        }
                    });
                }
            });
            this.gb=false;           
        }
    }
}
</script>

<style scoped>
.mainbody{
    background-color: bisque
}
.card-body{
    position:relative;
    padding-top:66.59%;
}
.img-mainpage {
    position: absolute;
    top: 0;
    left: 0;
    width:100%;
    height: 80%;
}
.card{
    position:relative;
    min-width: 300px;
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
    position: relative; 
    margin: 0px 0px 0px 350px
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