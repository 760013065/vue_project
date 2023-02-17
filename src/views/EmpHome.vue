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
    <i><img :src="user.headerUrl" width="48px" height="48px">
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
          <el-menu @select="menuClick">
            <el-submenu index="1">
              <template slot="title">
                <i class="el-icon-user"></i>
                <span>Personal Profile</span>
              </template>
              <el-menu-item index="/empProfile">
                profile
              </el-menu-item>
            </el-submenu>
            <el-submenu index="2">
              <template slot="title">
                <i class="el-icon-s-order"></i>
                <span>Training</span>
              </template>
              <el-menu-item index="/trainingList">plans</el-menu-item>
              <el-menu-item index="/trainingApps">application</el-menu-item>
            </el-submenu>
            <el-submenu index="3">
              <template slot="title">
                <i class="el-icon-s-opportunity"></i>
                <span>Project</span>
              </template>
              <el-menu-item index="/taskList">tasks</el-menu-item>
            </el-submenu>
          </el-menu>
        </el-aside>
        <el-main>
          <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/empHome' }">Home</el-breadcrumb-item>
            <el-breadcrumb-item v-if="this.$router.currentRoute.name!='EmpHome'">{{this.$router.currentRoute.name}}</el-breadcrumb-item>

          </el-breadcrumb>
          <div style="text-align: center;font-size: 30px;color: #409eff;padding-top: 80px" v-if="this.$router.currentRoute.name=='EmpHome'" >
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
  name: "EmpHome",
  data(){
    return{
      user:JSON.parse(window.sessionStorage.getItem("empUser")),
    }
  },
  methods:{
    menuClick(index){
      this.$router.push(index)
    },
    toHome:function (){
      this.$router.replace('/empHome')
    },
    commandHandler(cmd){
      if(cmd=='logout'){
        this.$confirm('You will log out, whether to continue?', 'Prompt', {
          confirmButtonText: 'Yes',
          cancelButtonText: 'No',
          type: 'warning'
        }).then(() => {
          window.sessionStorage.removeItem("empUser");
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

<style scoped>

</style>