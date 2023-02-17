<template>
  <div>
    <el-form :rules="rules" ref="loginForm" :model='loginForm' class="loginContainer">
      <h3 class="loginTitle">System Login</h3>
      <el-form-item prop="username">
        <el-input type="text" v-model="loginForm.username" auto-complete="off" placeholder="please enter username"></el-input>
      </el-form-item>

      <el-form-item prop="password">
        <el-input type="password" v-model="loginForm.password" auto-complete="off" placeholder="please enter password"></el-input>
      </el-form-item>
<!--      <el-checkbox v-model="checked"></el-checkbox>-->
      <el-select v-model="choose" placeholder="employee or manager?" style="margin-bottom: 22px;width: 200px">
        <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value">
        </el-option>
      </el-select>

      <el-form-item prop="code" class="update1">
        <el-input type="text" v-model="loginForm.code" auto-complete="off" placeholder="please enter code" style="width: 250px"></el-input>
        <img :src=vcUrl @click="update">
      </el-form-item>

      <el-button type="primary" style="width:  100%;" @click="submitLogin" >login</el-button>

    </el-form>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "Login",
  data(){
    return{
      choose:'',
      options:[{
        value:'manager',
        label:'manager'
      },{
        value:'employee',
        label:'employee'
      }],
      vcUrl:'/verifyCode?time='+new Date(),
      loginForm:{
        username: '',
        password: '',
        code: ''
      },
      checked:true,
      rules:{
        username:[{required:true,message:'please enter username',trigger:'blur'}],
        password:[{required:true,message:'please enter password',trigger:'blur'}],
        code:[{required:true,message:'please enter code',trigger:'blur'}],
      }
    }
  },
  methods: {
    update(){
      this.vcUrl='/verifyCode?time='+new Date()
    },
    submitLogin() {
      if(typeof this.choose==='undefined' || this.choose==null || this.choose===''){
        this.$message.error("please select")
        return
      }
      this.$refs.loginForm.validate((valid) => {
        if (valid) {
          if(this.choose=='manager'){
            this.postKeyValueRequest('/doLogin',this.loginForm).then(resp=>{
              if(resp){
                window.sessionStorage.setItem("user",JSON.stringify(resp.obj))
                this.$router.replace('/home')
              }else{
                this.vcUrl='/verifyCode?time='+new Date()
              }
            });
          }else{
            this.getRequest('/empLogin?username='+this.loginForm.username+'&password='+this.loginForm.password).then(resp=>{
              if(resp){
                this.$message.success("login successfully")
                window.sessionStorage.setItem("empUser",JSON.stringify(resp))
                this.$router.replace('/empHome')

              }else{
                this.$message.error("wrong password")
                this.vcUrl='/verifyCode?time='+new Date()
              }
            })
          }
        } else {
          this.$message.error('Please enter all the required information')
          return false;
        }
      });
    }

  }
}

</script>

<style >
.loginContainer{
  border-radius: 16px;
  background-clip: padding-box;
  margin: 180px auto;
  width: 350px;
  padding: 35px;
  padding: 15px 35px 15px 35px;
  background: #fff;
  border: 1px solid #e8e0e0;
  box-shadow: 0 0 25px #cac6c6;

}
.loginTitle{
   text-align: center;
}

.el-form-item__content{
  display: flex;
  align-items: center;
}




</style>