<template>


<div>
  <el-container>
    <el-header class="homeHeader">
      <div class="title" @click="toHome">
        IEmployee
      </div>
      <el-dropdown class="userInfo" @command="commandHandler">
  <span class="el-dropdown-link">
    {{user.username}}
    <i><img :src="user.userface" width="48px" height="48px">
    </i>
  </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item command="personalCenter">Personal Center</el-dropdown-item>
          <el-dropdown-item command="settings">Settings</el-dropdown-item>
          <el-dropdown-item divided command="logout">Log out</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>

    </el-header>
    <el-container>
      <el-aside width="260px">
        <el-menu router>
          <el-submenu :index="index+''" v-for="(item,index) in this.$router.options.routes" v-if="!item.hidden" :key="index">
            <template slot="title">
              <i :class="item.icon"></i>
              <span style="font-size: 15px">{{ item.name }}</span>
            </template>

              <el-menu-item :index="child.path" v-for="(child,indexj) in item.children" :key="indexj">
                {{child.name}}
              </el-menu-item>

          </el-submenu>

        </el-menu>
      </el-aside>
      <el-main>
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item :to="{ path: '/home' }">Home</el-breadcrumb-item>
          <el-breadcrumb-item v-if="this.$router.currentRoute.name!='Home'">{{this.$router.currentRoute.name}}</el-breadcrumb-item>

        </el-breadcrumb>
        <div style="text-align: center;font-size: 30px;color: #409eff;padding-top: 80px" v-if="this.$router.currentRoute.name=='Home'" >
          Welcome to the system!
        </div>

        <router-view class="homeRouterView"/>
      </el-main>

    </el-container>
  </el-container>
</div>
</template>

<script>

export default {
  components:{

  },
  name: "Home",
  data(){
    return{
      user:JSON.parse(window.sessionStorage.getItem("user")),
    }
  },
  methods:{
    toHome:function (){
      this.$router.replace('/home')
    },

    commandHandler(cmd){
      if(cmd=='logout'){
        this.$confirm('You will log out, whether to continue?', 'Prompt', {
          confirmButtonText: 'Yes',
          cancelButtonText: 'No',
          type: 'warning'
        }).then(() => {
          this.getRequest("/logout");
          window.sessionStorage.removeItem("user");
          this.$router.replace("/");
        }).catch(() => {
          this.$message({
            type: 'info',
            message: 'Operation cancelled'
          });
        });
      }
    }
  }
}
</script>

<style >

.homeHeader{
  background-color: #409eff;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0px 15px;
  box-sizing: border-box;
}
.homeHeader .title{
  font-size: 30px;
  color: #ffffff;
}
.homeHeader .userInfo{
  cursor: pointer;
}

.el-dropdown-link img{
  border-radius: 24px;
  margin-left: 8px;

}

.el-dropdown-link{
  display: flex;
  align-items: center;
}

.homeRouterView{
  margin-top: 20px;
}




</style>

