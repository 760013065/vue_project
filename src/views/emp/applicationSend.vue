<template>
  <div>
    <h3>Please fill in the information:</h3>
    <el-descriptions class="margin-top"  :column="3" size="medium" border>

      <el-descriptions-item>
        <template slot="label">
          <i class="el-icon-edit"></i>
          name
        </template>
        <el-input size="mini" v-model="app.empName" placeholder="input name"></el-input>
      </el-descriptions-item>
      <el-descriptions-item>
        <template slot="label">
          <i class="el-icon-edit"></i>
          job number
        </template>
        <el-input size="mini" v-model="app.empNum" placeholder="input number"></el-input>
      </el-descriptions-item>
      <el-descriptions-item>
        <template slot="label">
          <i class="el-icon-edit"></i>
          content
        </template>
        <el-input size="mini" v-model="app.content" placeholder="input content"></el-input>
      </el-descriptions-item>


      <el-descriptions-item>
        <template slot="label">
          <i class="el-icon-edit"></i>
          start time
        </template>
        <el-date-picker
            size="mini"
            v-model="app.startTime"
            type="date"
            value-format="yyyy-MM-dd"
            placeholder="start time">
        </el-date-picker>
      </el-descriptions-item>

      <el-descriptions-item>
        <template slot="label">
          <i class="el-icon-edit"></i>
          end time
        </template>
        <el-date-picker
            size="mini"
            v-model="app.endTime"
            type="date"
            value-format="yyyy-MM-dd"
            placeholder="end time">
        </el-date-picker>
      </el-descriptions-item>

      <el-descriptions-item>
        <template slot="label">
          <i class="el-icon-edit"></i>
          provider
        </template>
        <el-input size="mini" v-model="app.provider" placeholder="input provider"></el-input>
      </el-descriptions-item>

      <el-descriptions-item>
        <template slot="label">
          <i class="el-icon-edit"></i>
          cost
        </template>
        <el-input size="mini" v-model="app.cost" placeholder="input cost"></el-input>
      </el-descriptions-item>

      <el-descriptions-item>
        <template slot="label">
          <i class="el-icon-edit"></i>
          postscript
        </template>
        <el-input size="mini" v-model="app.postscript" placeholder="input postscript"></el-input>
      </el-descriptions-item>


    </el-descriptions>
    <div style="display: flex;justify-content: center;margin: 10px">
      <el-button @click="submit" type="primary" size="small">submit the application</el-button>
    </div>

  </div>
</template>

<script>
export default {
  name: "applicationSend",
  methods:{
    submit(){

      this.postRequest("/training/basic/empApp",this.app).then(resp=>{
        if(resp){
          this.app={}
        }
      })
    }
  },
  mounted() {

  },
  data(){
    return{
      app:{
        empName:'',
        empNum:'',
        content:'',
        startTime:'',
        endTime:'',
        provider:'',
        cost:'',
        postscript:''
      }
    }
  }
}
</script>

<style scoped>

</style>