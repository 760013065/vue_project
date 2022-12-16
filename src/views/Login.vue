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
      <el-button type="primary" style="width:  100%;" @click="submitLogin">login</el-button>

    </el-form>
  </div>
</template>

<script>


export default {
  name: "Login",
  data(){
    return{
      loginForm:{
        username: '',
        password: ''
      },
      checked:true,
      rules:{
        username:[{required:true,message:'please enter username',trigger:'blur'}],
        password:[{required:true,message:'please enter password',trigger:'blur'}],
      }
    }
  },
  methods: {
    submitLogin() {
      this.$refs.loginForm.validate((valid) => {
        if (valid) {
          this.postKeyValueRequest('/doLogin',this.loginForm).then(resp=>{
            if(resp){
              window.sessionStorage.setItem("user",JSON.stringify(resp.obj))
              this.$router.replace('/home')
            }
          })
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

</style>