<template>
    <div class="container" style="background-color: bisque">
        <div v-if="showregisterfailonpass">
        <h4 class="card-title mt-3 text-center">Your password did not matched ...</h4>
        </div>
        <div v-if="showregistersuccess">
        <h4 class="card-title mt-3 text-center">Congratulations! you have been registered successfully.</h4>
    </div>
    
      <div class="card " v-if="showregister" style="background-color: bisque">
        <article class="card-body mx-auto" style="max-width: 400px;">
            <h4 class="card-title mt-3 text-center">Create Account</h4>
            <p class="text-center">Get started with your free account</p>
            <p>
                <a href="" class="btn btn-block btn-twitter"> <i class="fab fa-twitter"></i>Login via Twitter</a>
                <a href="" class="btn btn-block btn-facebook"> <i class="fab fa-facebook-f"></i>Login via facebook</a>
            </p>
            <p class="divider-text">
                <span class="bg-light">OR</span>
            </p>
            <div class="form-group input-group">
                <div class="input-group-prepend">
                    <span class="input-group-text"> <i class="fa fa-user"></i> </span>
                </div>
                <input name="" class="form-control" placeholder="Full name" type="text" v-model="name">
            </div> <!-- form-group// -->
            <div class="form-group input-group">
                <div class="input-group-prepend">
                    <span class="input-group-text"> <i class="fa fa-envelope"></i> </span>
                </div>
                <input name="" class="form-control" placeholder="Email address" type="email" v-model="email">
            </div> <!-- form-group// -->
            <div class="form-group input-group">
                <div class="input-group-prepend">
                    <span class="input-group-text"> <i class="fa fa-phone"></i> </span>
                </div>
                <select class="custom-select" style="max-width: 120px;"  v-model="phonecode">
                    <option selected="">+91</option>
                    <option value="1">+972</option>
                    <option value="2">+198</option>
                    <option value="3">+701</option>
                </select>
                <input name="" class="form-control" placeholder="Phone number" type="text" v-model="phone">
            </div> <!-- form-group// -->
            <div class="form-group input-group">
                <div class="input-group-prepend">
                    <span class="input-group-text"> <i class="fa fa-building"></i> </span>
                </div>
                <select class="form-control" v-model="gender">
                    <option selected=""> Gender </option>
                    <option>Female</option>
                    <option>Male</option>
                </select>
            </div> <!-- form-group end.// -->
            <div class="form-group input-group">
                <div class="input-group-prepend">
                    <span class="input-group-text"> <i class="fa fa-lock"></i> </span>
                </div>
                <input class="form-control" placeholder="Create password" type="password" v-model="pass">
            </div> <!-- form-group// -->
            <div class="form-group input-group">
                <div class="input-group-prepend">
                    <span class="input-group-text"> <i class="fa fa-lock"></i> </span>
                </div>
                <input class="form-control" placeholder="Repeat password" type="password" v-model="cpass">
            </div> <!-- form-group// -->                                      
            <div class="form-group">
                <button type="submit" class="btn btn-primary btn-block" @click="registeruser()"> Create Account  </button>
            </div> <!-- form-group// -->      
            <p class="text-center">Have an account? <a href="login">Log In</a> </p>                                                                 
        </article>
    </div> <!-- card.// -->
    
</div> 
</template>
<script>
export default {
    data(){
        return{
            name:'',
            email:'',
            phone:'',
            gender:'Gender',
            pass:'',
            phonecode:'+91',
            cpass:'',
            showregistersuccess:false,
            showregisterfail:false,
            showregisterfailonpass:false,
            showregister:true
        }
    },
    methods:{
        registeruser(){
            var p=this.pass;
            var cp=this.cpass;
            let showregistersuccesstemp =false;
            if(p==cp){
                var AWS = require('aws-sdk');
                var awsConfigInfo = {
                    region: 'ap-south-1',
                    identityPoolId: 'ap-south-1:c49a9371-0b0b-4359-b111-138b5d17e4af',
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
                var params = {
                    Item: {
                    name:{S:this.name},
                    email:{S:this.email},
                    gender:{S:this.gender},
                    ccode:{S:this.phonecode},
                    phone:{S:this.phone},
                    pass:{S:this.pass}
                    }, 
                    ReturnConsumedCapacity: "TOTAL", 
                    TableName: "ecomUsers"
                    
                };
                var dynamodb = new AWS.DynamoDB();
                dynamodb.putItem(params,function(err,data){
                if(err){
                    this.showregisterfailonconnection=true;
                    //alert(err);
                }else if(data){
                   showregistersuccesstemp=true;
                   return showregistersuccesstemp;
                }
                });
                this.showregistersuccess=true;
                this.name='';this.email='';this.phone='';this.ccode='';this.pass='';this.cpass='';
            }else{
                this.showregistersuccess=false;
                this.showregisterfailonpass=true;
            }
            // if(showregistersuccesstemp){
            //    this.showregistersuccess=true;
            //}
        }
    }
}
</script>
<style scoped>
.divider-text {
    position: relative;
    text-align: center;
    margin-top: 15px;
    margin-bottom: 15px;
}
.divider-text span {
    padding: 7px;
    font-size: 12px;
    position: relative;   
    z-index: 2;
}
.divider-text:after {
    content: "";
    position: absolute;
    width: 100%;
    border-bottom: 1px solid #ddd;
    top: 55%;
    left: 0;
    z-index: 1;
}

.btn-facebook {
    background-color: #405D9D;
    color: #fff;
}
.btn-twitter {
    background-color: #42AEEC;
    color: #fff;
}
</style>