<template>
<div>
  <el-container>
    <el-header class="homeHeader">
      <div class="title">
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
      <el-aside width="200px">
        <el-menu @select="menuSelect">
          <el-submenu index="1" v-for="(item,index) in this.$router.options.routes" v-if="!item.hidden" :key="index">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>{{ item.name }}</span>
            </template>

              <el-menu-item :index="child.path" v-for="(child,indexj) in item.children" :key="indexj">
                {{child.name}}
              </el-menu-item>

          </el-submenu>

        </el-menu>
      </el-aside>
      <el-main>
        <router-view/>
      </el-main>
    </el-container>
  </el-container>
</div>
</template>

<script>
export default {
  name: "Home",
  data(){
    return{
      user:JSON.parse(window.sessionStorage.getItem("user")),
    }
  },
  methods:{
    menuSelect(index){
      this.$router.push(index);
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


</style>