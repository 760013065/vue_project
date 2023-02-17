
<template>
  <div>
    <div style="display: flex;justify-content: space-between;">

      <div>
        <el-input placeholder="search applications by employee name" size="small"
                  prefix-icon="el-icon-search" style="width: 350px;margin-right: 10px"
                  v-model="keyword" @keydown.enter.native="doSearch" clearable></el-input>
        <el-button icon="el-icon-search" type="primary" size="small" @click="doSearch" clearable>search</el-button>
      </div>

      <div>
        <el-select v-model="status" placeholder="please select status" size="small">
          <el-option
              v-for="item in options"

              :key="item.value"
              :label="item.label"
              :value="item.value">
          </el-option>
        </el-select>
        <el-button @click="doSearch" type="primary" style="margin-left: 10px" icon="el-icon-check"
                   size="small" >OK</el-button>
      </div>


    </div>
    <div style="margin-top: 10px">
      <el-table
          :data="apps"
          border
          stripe
          style="width: 100%">
        <el-table-column
            prop="empName"
            fixed
            align="left"
            label="employee name"
            width="140">
        </el-table-column>
        <el-table-column
            prop="empNum"
            label="employee number"
            align="left"
            width="140">
        </el-table-column>

        <el-table-column
            prop="id"
            label="application id"
            align="center"
            width="140">
        </el-table-column>
        <el-table-column
            prop="appTime"
            label="application time"
            align="left"
            width="140">
        </el-table-column>
        <el-table-column
            prop="content"
            label="content"
            align="center"
            width="305">
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
            prop="processTime"
            label="process Time"
            align="left"
            width="140">
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
        <el-table-column
            fixed="right"
            width="140"
            label="operations">
          <template slot-scope="scope">

            <el-button type="danger" size="mini" :disabled="scope.row.status!='unprocessed'?true:false"
                       style="padding: 6px;margin-left: 6px" @click="doReject(scope.row)">
              reject
            </el-button>

            <el-button @click="doApprove(scope.row)" type="success" :disabled="scope.row.status!='unprocessed'?true:false"
                       size="mini" style="padding: 6px">
              approve
            </el-button>


          </template>
        </el-table-column>

      </el-table>
      <div style="display: flex;justify-content: flex-start">
        <el-pagination
            @current-change="currentChange"
            background
            page-size="6"
            layout="prev, pager, next"
            :total="total">
        </el-pagination>
      </div>
    </div>
  </div>

</template>

<script>
export default {
  name: "plan",
  mounted() {
    this.initApp()
  },
  data(){
    return{

      appEdit:{
        empName:'',
        empNum:'',
        appTime:'',
        content:'',
        startTime:'',
        endTime:'',
        provider:'',
        cost:'',
        status:'',
        processTime:'',
        postscript:''
      },
      page:1,
      size:6,
      total:0,
      status:'',
      keyword:'',
      apps:[],
      options: [{
        value: 'unprocessed',
        label: 'unprocessed'
      }, {
        value: 'processed',
        label: 'processed'
      }, {
        value: 'all',
        label: 'all'
      }],
      value: ''
    }
  },
  methods:{
    doSearch(){
      this.page=1
      this.initApp()
    },
    doApprove(data){
      this.$confirm('Are you sure to approve this application?', 'Prompt', {
        confirmButtonText: 'Yes',
        cancelButtonText: 'No',
        type: 'warning'
      }).then(() => {
        this.appEdit=data
        this.appEdit.status='approved'
        this.putRequest("/training/basic/app",this.appEdit).then(resp=>{
          if(resp){
            this.initApp()
          }
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: 'Operation cancelled'
        });
      });
    },
    doReject(data){
      this.$confirm('Are you sure to reject this application?', 'Prompt', {
        confirmButtonText: 'Yes',
        cancelButtonText: 'No',
        type: 'warning'
      }).then(() => {
        this.appEdit=data
        this.appEdit.status='rejected'
        this.putRequest("/training/basic/app",this.appEdit).then(resp=>{
          if(resp){
            this.initApp()
          }
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: 'Operation cancelled'
        });
      });
    },
    currentChange(current){
      this.page=current
      this.initApp()
    },
    initApp(){
      this.getRequest("/training/basic/app?page="+this.page+"&size="+this.size+"&keyword="+this.keyword+"&status="+this.status)
          .then(resp=>{
            if(resp){
              this.total=resp.total
              this.apps=resp.data
            }
          })
    },
    test(){
      alert(this.total)
      if(this.value=='unprocessed'){
        alert(111)
      }else if(this.value=='processed'){
        alert(222)
      }else{
        alert(333)
      }
    }
  }
}
</script>

<style scoped>

</style>