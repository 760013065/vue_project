<template>
  <el-tabs v-model="activeName" type="card" >
    <el-tab-pane label="department" name="first">
      <dep></dep>
    </el-tab-pane>
    <el-tab-pane label="position" name="second">
      <position></position>
    </el-tab-pane>
    <el-tab-pane label="authority" name="third">authority</el-tab-pane>

  </el-tabs>

</template>

<script>
import dep from "@/components/sys/dep";
import position from "@/components/sys/position";
export default {
  name: "company",
  data() {
    return {
      activeName: 'first'
    };
  },
  components:{
    dep,position
  }
}
</script>

<style scoped>

</style>