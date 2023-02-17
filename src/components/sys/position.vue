<template>
  <div>
    <div>
      <el-input

          style="width: 350px;margin-right: 10px"
          placeholder="add position..."
          prefix-icon="el-icon-plus"
          v-model="pos.name">
      </el-input>
      <el-button type="primary" icon="el-icon-plus" @click="addPos">add</el-button>
    </div>
    <div style="padding-top: 15px">
      <el-table
          :data="positions"
          size="small"
          @selection-change="handleSelectionChange"
          border
          stripe
          style="width: 60%">

        <el-table-column
            type="selection"
            width="55">
        </el-table-column>

        <el-table-column
            prop="id"
            label="ID"
            width="55">
        </el-table-column>
        <el-table-column
            prop="name"
            label="position"
            width="160">
        </el-table-column>
        <el-table-column
            prop="createDate"
            label="create time">
        </el-table-column>

        <el-table-column
            label="operations">
            <template slot-scope="scope">
              <el-button size="mini" type="primary" @click="handleEdit(scope.$index,scope.row)">edit</el-button>
              <el-button size="mini" type="danger" @click="handleDel(scope.$index,scope.row)">delete</el-button>
            </template>
        </el-table-column>

      </el-table>
      <el-button @click="batchDel" type="danger" size="small" style="margin-top:10px" :disabled="selection.length==0">Batch deletion
      </el-button>
    </div>

    <el-dialog
        title="edit position"
        :visible.sync="dialogVisible"
        width="30%">
      <div>
        <el-tag>position name</el-tag>
        <el-input class="update" size="small" v-model="updatePos.name"></el-input>
      </div>
      <span slot="footer" class="dialog-footer">
    <el-button @click="dialogVisible = false" size="small">cancel</el-button>
    <el-button type="primary" @click="doUpdate" size="small">OK</el-button>
  </span>
    </el-dialog>

  </div>
</template>

<script>
export default {
  name: "position",
  data(){
    return{
      dialogVisible:false,
      selection:[],
      pos:{
        name:"",
      },
      updatePos:{
        name:""
      },
      positions:[]
    }
  },
  mounted(){
    this.initPositions()
  },
  methods:{
    batchDel(){
      this.$confirm('Are you sure to delete these positions?', 'Prompt', {
        confirmButtonText: 'Yes',
        cancelButtonText: 'No',
        type: 'warning'
      }).then(() => {
        let ids="?"
        this.selection.forEach(item=>{
          ids+="ids="+item.id+"&"
        })
        this.deleteRequest("/system/basic/pos/"+ids).then(resp=>{
          if(resp){
            this.initPositions()
          }
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: 'Operation cancelled'
        });
      });
    },
    handleSelectionChange(val){
      this.selection=val
    },
    doUpdate(){
      this.putRequest("/system/basic/pos/",this.updatePos).then(resp=>{
        if(resp){
          this.initPositions()
          this.updatePos.name=""
          this.dialogVisible=false
        }
      })
    },
    addPos() {
      if(this.pos.name){
        this.postRequest("/system/basic/pos/",this.pos).then(resp=>{
          if(resp){
            this.initPositions()
            this.pos.name=''
          }
        })
      }else{
        this.$message.error("position name can not be blank ")
      }
    },
    handleEdit(index,data){
      Object.assign(this.updatePos,data)
      this.dialogVisible=true
    },
    handleDel(index,data){
      this.$confirm('Are you sure to delete?', 'Prompt', {
        confirmButtonText: 'Yes',
        cancelButtonText: 'No',
        type: 'warning'
      }).then(() => {
        this.deleteRequest("/system/basic/pos/"+data.id).then(resp=>{
          if(resp){
            this.initPositions()
          }
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: 'Operation cancelled'
        });
      });
    },
    initPositions(){
      this.getRequest("/system/basic/pos/").then(resp=>{
        if(resp){
          this.positions=resp
        }
      })
    }
  }
}
</script>

<style>
.update{
  width: 230px;
  margin-left: 10px;
}
</style>