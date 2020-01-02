<template>
    <div class="container" style="background-color: bisque">
       <div v-if="toshowfail">
         <center><h3 style="color:red">failed login ! Incorrect password</h3> </center> 
        </div>
        <div v-if="toshowfailofnull">
         <center><h3 style="color:red">failed login ! User not found</h3> </center> 
        </div>
          <div class="wrapper fadeInDown" v-if="toshowlogin">
            <div id="formContent">
                <!-- Tabs Titles -->

                <!-- Icon -->
                <div class="fadeIn first">
                <!--<img src="http://danielzawadzki.com/codepen/01/icon.svg" id="icon" alt="User Icon" />-->
                <h3>Login</h3>
                </div>

                <!-- Login Form -->
                <input type="text" id="login" class="fadeIn second" name="login" placeholder="login" v-model="uname">
                <input type="text" id="password" class="fadeIn third" name="login" placeholder="password" v-model="pass">
                <input type="submit" class="fadeIn fourth" value="Log In" @click="login()">

                <!-- Remind Passowrd -->
                <div id="formFooter">
                <a class="underlineHover" href="#">Forgot Password?</a>
                </div>

            </div>
        </div>
        <div v-if="toshowseccess">
            <!--<router-link to="/" class="nav-link">Home</router-link>-->
            <div >
                <h1 >{{uname}}</h1>
            </div>
            <home/>   
        </div>
    </div>
</template>

<script>
import home from "@/views/Home.vue";
export default {
    data(){
        return{
            uname:'',
            pass:'',
            toshowseccess:false,
            toshowlogin:true,
            username:'',
            toshowfail:false,
            toshowfailofnull:false
        }
    },
    components:{
        home
    },
    methods:{        
        login()  {
            var AWS = require('aws-sdk');
            var lastname = this.uname;
            var pass = this.pass;
            //let tem=this.toshowseccess;
            var params = {
                Key: {
                email:{S:lastname},
                }, 
                TableName: "ecomUsers"
            };
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
            var dynamodb = new AWS.DynamoDB();
            dynamodb.getItem(params,function(er,data){
                if(er){
                alert('error'+ er);
                }else{
                if(data.Item==null){
                    //alert('null '+ data.Item);
                    return null;
                }else{
                if(data.Item.pass.S==pass){
                  return data.Item;
                }else{
                  return new Error('invalid password samjha')
                }
                }
                }
            }).promise().then(data =>{
              //alert(data.Item.pass.S +'---->pass== '+pass);
              if(data.Item==null){
                 this.toshowfailofnull=true;
                this.toshowlogin=true;
                this.toshowseccess=false;
                this.toshowfail=false;
                //exit(1);
              }else if(data.Item.pass.S==pass){
                this.toshowfail=false;
                this.toshowlogin=false;
                this.toshowseccess=true;
                this.toshowfailofnull=false;
              }else{
                this.toshowfail=true;
                this.toshowlogin=true;
                this.toshowseccess=false;
                this.toshowfailofnull=false;
              }
            }
           );

           /*var results= flag.Item;

            if(results instanceof Error){
              this.toshowseccess=true
                this.toshowlogin=false
            }else{
              this.toshowfail=true
            }*/
        }
    }
}
</script>

<style scoped>
html {
  background-color: #56baed;
}

body {
  font-family: "Poppins", sans-serif;
  height: 100vh;
}

a {
  color: #92badd;
  display:inline-block;
  text-decoration: none;
  font-weight: 400;
}

h2 {
  text-align: center;
  font-size: 16px;
  font-weight: 600;
  text-transform: uppercase;
  display:inline-block;
  margin: 40px 8px 10px 8px; 
  color: #cccccc;
}



/* STRUCTURE */

.wrapper {
  display: flex;
  align-items: center;
  flex-direction: column; 
  justify-content: center;
  width: 100%;
  min-height: 100%;
  padding: 20px;
}

#formContent {
  -webkit-border-radius: 10px 10px 10px 10px;
  border-radius: 10px 10px 10px 10px;
  background: #fff;
  padding: 30px;
  width: 90%;
  max-width: 450px;
  position: relative;
  padding: 0px;
  -webkit-box-shadow: 0 30px 60px 0 rgba(0,0,0,0.3);
  box-shadow: 0 30px 60px 0 rgba(0,0,0,0.3);
  text-align: center;
}

#formFooter {
  background-color: #f6f6f6;
  border-top: 1px solid #dce8f1;
  padding: 25px;
  text-align: center;
  -webkit-border-radius: 0 0 10px 10px;
  border-radius: 0 0 10px 10px;
}



/* TABS */

h2.inactive {
  color: #cccccc;
}

h2.active {
  color: #0d0d0d;
  border-bottom: 2px solid #5fbae9;
}



/* FORM TYPOGRAPHY*/

input[type=button], input[type=submit], input[type=reset]  {
  background-color: #56baed;
  border: none;
  color: white;
  padding: 15px 80px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  text-transform: uppercase;
  font-size: 13px;
  -webkit-box-shadow: 0 10px 30px 0 rgba(95,186,233,0.4);
  box-shadow: 0 10px 30px 0 rgba(95,186,233,0.4);
  -webkit-border-radius: 5px 5px 5px 5px;
  border-radius: 5px 5px 5px 5px;
  margin: 5px 20px 40px 20px;
  -webkit-transition: all 0.3s ease-in-out;
  -moz-transition: all 0.3s ease-in-out;
  -ms-transition: all 0.3s ease-in-out;
  -o-transition: all 0.3s ease-in-out;
  transition: all 0.3s ease-in-out;
}

input[type=button]:hover, input[type=submit]:hover, input[type=reset]:hover  {
  background-color: #39ace7;
}

input[type=button]:active, input[type=submit]:active, input[type=reset]:active  {
  -moz-transform: scale(0.95);
  -webkit-transform: scale(0.95);
  -o-transform: scale(0.95);
  -ms-transform: scale(0.95);
  transform: scale(0.95);
}

input[type=text] {
  background-color: #f6f6f6;
  border: none;
  color: #0d0d0d;
  padding: 15px 32px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
  margin: 5px;
  width: 85%;
  border: 2px solid #f6f6f6;
  -webkit-transition: all 0.5s ease-in-out;
  -moz-transition: all 0.5s ease-in-out;
  -ms-transition: all 0.5s ease-in-out;
  -o-transition: all 0.5s ease-in-out;
  transition: all 0.5s ease-in-out;
  -webkit-border-radius: 5px 5px 5px 5px;
  border-radius: 5px 5px 5px 5px;
}

input[type=text]:focus {
  background-color: #fff;
  border-bottom: 2px solid #5fbae9;
}

input[type=text]:placeholder {
  color: #cccccc;
}



/* ANIMATIONS */

/* Simple CSS3 Fade-in-down Animation */
.fadeInDown {
  -webkit-animation-name: fadeInDown;
  animation-name: fadeInDown;
  -webkit-animation-duration: 0.5s;
  animation-duration: 0.5s;
  -webkit-animation-fill-mode: both;
  animation-fill-mode: both;
}

@-webkit-keyframes fadeInDown {
  0% {
    opacity: 0;
    -webkit-transform: translate3d(0, -100%, 0);
    transform: translate3d(0, -100%, 0);
  }
  100% {
    opacity: 1;
    -webkit-transform: none;
    transform: none;
  }
}

@keyframes fadeInDown {
  0% {
    opacity: 0;
    -webkit-transform: translate3d(0, -100%, 0);
    transform: translate3d(0, -100%, 0);
  }
  100% {
    opacity: 1;
    -webkit-transform: none;
    transform: none;
  }
}

/* Simple CSS3 Fade-in Animation */
@-webkit-keyframes fadeIn { from { opacity:0; } to { opacity:1; } }
@-moz-keyframes fadeIn { from { opacity:0; } to { opacity:1; } }
@keyframes fadeIn { from { opacity:0; } to { opacity:1; } }

.fadeIn {
  opacity:0;
  -webkit-animation:fadeIn ease-in 1;
  -moz-animation:fadeIn ease-in 1;
  animation:fadeIn ease-in 1;

  -webkit-animation-fill-mode:forwards;
  -moz-animation-fill-mode:forwards;
  animation-fill-mode:forwards;

  -webkit-animation-duration:1s;
  -moz-animation-duration:1s;
  animation-duration:1s;
}

.fadeIn.first {
  -webkit-animation-delay: 0.4s;
  -moz-animation-delay: 0.4s;
  animation-delay: 0.4s;
}

.fadeIn.second {
  -webkit-animation-delay: 0.6s;
  -moz-animation-delay: 0.6s;
  animation-delay: 0.6s;
}

.fadeIn.third {
  -webkit-animation-delay: 0.8s;
  -moz-animation-delay: 0.8s;
  animation-delay: 0.8s;
}

.fadeIn.fourth {
  -webkit-animation-delay: 1s;
  -moz-animation-delay: 1s;
  animation-delay: 1s;
}

/* Simple CSS3 Fade-in Animation */
.underlineHover:after {
  display: block;
  left: 0;
  bottom: -10px;
  width: 0;
  height: 2px;
  background-color: #56baed;
  content: "";
  transition: width 0.2s;
}

.underlineHover:hover {
  color: #0d0d0d;
}

.underlineHover:hover:after{
  width: 100%;
}



/* OTHERS */

*:focus {
    outline: none;
} 

#icon {
  width:60%;
}
</style>