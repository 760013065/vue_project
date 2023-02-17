<template>
<div>
  <div style="display: flex;justify-content: space-between;margin-top: -20px">
    <h3>Your training plans are as follows:</h3>
    <div style="margin-top: 13px">
      <el-select v-model="status" placeholder="please select status" size="small">
        <el-option
            v-for="item in options"

            :key="item.value"
            :label="item.label"
            :value="item.value">
        </el-option>
      </el-select>
      <el-button @click="doSear" type="primary" style="margin-left: 10px" icon="el-icon-check"
                 size="small" >OK</el-button>
    </div>
  </div>

  <div>
    <el-table
        :data="empPlans"
        border
        stripe
        style="width: 100%">


      <el-table-column
          prop="id"
          label="training plan id"
          align="center"
          width="140">
      </el-table-column>

      <el-table-column
          prop="content"
          label="content"
          align="center"
          width="305">
      </el-table-column>
      <el-table-column
          prop="createTime"
          label="create time"
          align="left"
          width="140">
      </el-table-column>
      <el-table-column
          prop="startTime"
          label="start time"
          align="left"
          width="140">
      </el-table-column>
      <el-table-column
          prop="endTime"
          label="end Time"
          align="left"
          width="140">
      </el-table-column>
      <el-table-column
          prop="provider"
          label="provider"
          align="left"
          width="160">
      </el-table-column>
      <el-table-column
          prop="cost"
          label="cost"
          align="left"
          width="90">
      </el-table-column>
      <el-table-column
          prop="evaluation"
          label="evaluation"
          align="left"
          width="90">
      </el-table-column>
      <el-table-column
          prop="status"
          label="status"
          align="left"
          width="120">
      </el-table-column>
      <el-table-column
          prop="postscript"
          label="postscript"
          align="left"
          width="140">
      </el-table-column>


    </el-table>

  </div>


</div>
</template>

<script>
export default {
  name: "trainingList",
  mounted() {
    this.initEmpPlan()
  },
  data(){
    return{
      planInPro:[],
      planFin:[],
      status:'',
      options: [{
        value: 'in progress',
        label: 'in progress'
      }, {
        value: 'finished',
        label: 'finished'
      }, {
        value: 'all',
        label: 'all'
      }],
      empPlans:[],
      empPlans2:[],
      user:JSON.parse(window.sessionStorage.getItem("empUser")),
    }
  },
  methods:{
    doSear(){
      if(this.status=='in progress'){
        for(let i=0;i<this.empPlans2.length;i++){
          if(this.empPlans2[i].status=='in progress'){
            this.planInPro.push(this.empPlans2[i])
          }
        }
        this.empPlans=this.planInPro
        this.planInPro=[]
      }else if(this.status=='finished'){
        for(let i=0;i<this.empPlans2.length;i++){
          if(this.empPlans2[i].status=='finished'){
            this.planFin.push(this.empPlans2[i])
          }
        }
        this.empPlans=this.planFin
        this.planFin=[]
      }else{
        this.initEmpPlan()
      }
    },
    test(){
      alert(JSON.stringify(this.user))
    },
    initEmpPlan(){
      this.getRequest("/training/basic/empPlan?username="+this.user.username).then(resp=>{
        if(resp){
          this.empPlans=resp.data
          this.empPlans2=this.empPlans
        }
      })
    }


  }
}
</script>

<style scoped>

</style>