<template>
<div>
  <div style="display: flex;justify-content: space-between;margin-top: -20px">
    <h3>Your assigned tasks are as follows:</h3>
    <div style="margin-top: 13px">
      <el-select v-model="status" placeholder="please select status" size="small">
        <el-option
            v-for="item in options"

            :key="item.value"
            :label="item.label"
            :value="item.value">
        </el-option>
      </el-select>
      <el-button @click="doSear1" type="primary" style="margin-left: 10px" icon="el-icon-check"
                 size="small" >OK</el-button>
    </div>
  </div>
  <div>
    <el-table
        :data="empTask"
        border
        stripe
        style="width: 100%">


      <el-table-column
          prop="start"
          label="start time"
          align="center"
          >
      </el-table-column>

      <el-table-column
          prop="end"
          label="end time"
          align="center"
          >
      </el-table-column>

      <el-table-column
          prop="content"
          label="content"
          align="center"
          >
      </el-table-column>

      <el-table-column
          prop="status"
          label="status"
          align="center"
          >
      </el-table-column>

      <el-table-column
          prop="evaluation"
          label="evaluation"
          align="center"
          >
      </el-table-column>



    </el-table>

  </div>

</div>
</template>

<script>
export default {
  name: "taskList",
  methods:{
    doSear1(){
      if(this.status=='complete'){
        for(let i=0;i<this.empTask2.length;i++){
          if(this.empTask2[i].status=='complete'){
            this.complete.push(this.empTask2[i])
          }
        }
        this.empTask=this.complete
        this.complete=[]
      }else if(this.status=='incomplete'){
        for(let i=0;i<this.empTask2.length;i++){
          if(this.empTask2[i].status=='incomplete'){
            this.incomplete.push(this.empTask2[i])
          }
        }
        this.empTask=this.incomplete
        this.incomplete=[]
      }else{
        this.initEmpTask()
      }
    },
    test(){
      alert(this.empTask.length)
    },
    initEmpTask(){
      this.getRequest("/pro/basic/empTask?username="+this.user.username).then(resp=>{
        if(resp){
          this.empTask=resp.data
          this.empTask2=this.empTask
        }
      })
    }
  },
  mounted() {
    this.initEmpTask()
  },
  data(){
    return{
      user:JSON.parse(window.sessionStorage.getItem("empUser")),
      empTask:[],
      empTask2:[],
      complete:[],
      incomplete:[],
      status:'',
      options: [{
        value: 'complete',
        label: 'complete'
      }, {
        value: 'incomplete',
        label: 'incomplete'
      }, {
        value: 'all',
        label: 'all'
      }],
    }
  }
}
</script>

<style scoped>

</style>